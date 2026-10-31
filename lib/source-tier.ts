// 출처 계층 판정(리뉴얼 계획 R5).
// 매일 자동 게시가 쓰는 뉴스레터 판정기(~/.claude/skills/voidnews-newsletter/bin/newsletter.py Classifier)와
// 같은 순서로 판정합니다: 공식 등록 항목 → 큐레이터 채널(공식·발견 전용) → 그 밖의 등록 계층 → 미등록.
// 판정 자료는 scripts/sync-source-registry.mjs가 만든 스냅샷 lib/source-registry.json이며, 빌드는 이 파일만 읽습니다.
// 두 판정이 같은지는 `node scripts/sync-source-registry.mjs --check`로 확인합니다(판정기가 있는 기기에서만 실행).
import registrySnapshot from "./source-registry.json";
import { SOURCE_LABELS, type Locale, type SourceLabelField, type SourceLabelGroup } from "./i18n";

export interface RegistryEntry {
  id: string;
  owner: string;
  tier: string;
  domains: string[];
  x_handles: string[];
  /** 있으면 첫 경로 조각이 이 목록에 있을 때만 맞습니다(github.com/openai 등). */
  path_orgs?: string[];
}

/** 큐레이터 채널. 판정기가 핸들이나 http(s) 주소로 색인하는 채널만 스냅샷에 들어갑니다. */
export interface CuratorChannel {
  platform: string;
  handle: string;
  url: string;
  /** official · discovery-only · registry(논문·벤치마크 목록, 판정 결과로는 쓰지 않음) */
  role: string;
  channel: string;
}

export interface SourceRegistrySnapshot {
  entries: RegistryEntry[];
  channels: CuratorChannel[];
}

export interface SourceVerdict {
  tier: string;
  sourceId: string | null;
  owner: string | null;
}

const X_HOSTS = new Set(["x.com", "twitter.com", "mobile.twitter.com"]);
const YT_HOSTS = new Set(["youtube.com", "m.youtube.com", "youtu.be"]);
const COMMUNITY_PREFIXES = ["community.", "forum.", "forums.", "discuss.", "discussions."];
const SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/;

// Python urllib.parse.urlsplit과 같은 규칙으로 netloc과 path만 나눕니다.
// WHATWG URL은 호스트를 정규화해 판정기와 결과가 달라질 수 있어 쓰지 않습니다.
function splitUrl(raw: string): { netloc: string; path: string } {
  let rest = raw.replace(/^[\u0000- ]+/, "").replace(/[\t\r\n]/g, "");
  const colon = rest.indexOf(":");
  if (colon > 0 && SCHEME.test(rest.slice(0, colon))) rest = rest.slice(colon + 1);
  let netloc = "";
  if (rest.startsWith("//")) {
    const end = rest.slice(2).search(/[/?#]/);
    netloc = end === -1 ? rest.slice(2) : rest.slice(2, end + 2);
    rest = end === -1 ? "" : rest.slice(end + 2);
  }
  const hash = rest.indexOf("#");
  if (hash !== -1) rest = rest.slice(0, hash);
  const query = rest.indexOf("?");
  if (query !== -1) rest = rest.slice(0, query);
  return { netloc, path: rest };
}

function hostOf(netloc: string): string {
  const host = netloc.toLowerCase().split(":")[0];
  return host.startsWith("www.") ? host.slice(4) : host;
}

function firstSegment(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").split("/")[0].toLowerCase();
}

type ChannelHit = { role: string; channel: string };

export function createSourceClassifier(snapshot: SourceRegistrySnapshot): (url: string) => SourceVerdict {
  const official = snapshot.entries.filter((entry) => entry.tier === "official");
  const others = snapshot.entries.filter((entry) => entry.tier !== "official");
  const pathOrgs = new Map(snapshot.entries.map((entry) => [entry, entry.path_orgs?.map((org) => org.toLowerCase())]));
  // 판정기 Classifier.__init__과 같은 색인: X·YouTube는 핸들로, 그 밖은 호스트와 경로 앞부분으로 찾습니다.
  // 같은 핸들이 다시 나오면 뒤의 채널이 이깁니다(Python dict와 같음).
  const handles = new Map<string, ChannelHit>();
  const web: (ChannelHit & { host: string; prefix: string })[] = [];
  for (const channel of snapshot.channels) {
    const handle = channel.handle.replace(/^@+/, "").toLowerCase();
    const hit = { role: channel.role, channel: channel.channel };
    if ((channel.platform === "x" || channel.platform === "youtube") && handle) {
      handles.set(`${channel.platform}\u0000${handle}`, hit);
    } else if (channel.url.startsWith("http://") || channel.url.startsWith("https://")) {
      const { netloc, path } = splitUrl(channel.url);
      web.push({ ...hit, host: hostOf(netloc), prefix: path.replace(/\/+$/, "").toLowerCase() });
    }
  }

  const matches = (entry: RegistryEntry, host: string, seg: string): boolean => {
    if (X_HOSTS.has(host)) return entry.x_handles.includes(seg);
    if (COMMUNITY_PREFIXES.some((prefix) => host.startsWith(prefix))) return false;
    if (!entry.domains.some((domain) => host === domain || host.endsWith(`.${domain}`))) return false;
    const orgs = pathOrgs.get(entry);
    return orgs === undefined || orgs.includes(seg);
  };

  const channelOf = (host: string, seg: string, path: string): ChannelHit | undefined => {
    if (X_HOSTS.has(host)) return handles.get(`x\u0000${seg}`);
    if (YT_HOSTS.has(host)) return handles.get(`youtube\u0000${seg.replace(/^@+/, "")}`);
    const lowered = path.replace(/\/+$/, "").toLowerCase();
    return web.find((item) => host === item.host && (lowered === item.prefix || lowered.startsWith(`${item.prefix}/`)));
  };

  return (url: string): SourceVerdict => {
    const { netloc, path } = splitUrl(url);
    const host = hostOf(netloc);
    const seg = firstSegment(path);
    const first = official.find((entry) => matches(entry, host, seg));
    if (first) return { tier: first.tier, sourceId: first.id, owner: first.owner };
    // 큐레이터 채널은 발견 경로라서 보도·매체 계층보다 먼저 봅니다(판정기와 같은 순서).
    const channel = channelOf(host, seg, path);
    if (channel && (channel.role === "official" || channel.role === "discovery-only")) {
      return { tier: channel.role, sourceId: `channel:${channel.channel}`, owner: channel.channel };
    }
    const other = others.find((entry) => matches(entry, host, seg));
    if (other) return { tier: other.tier, sourceId: other.id, owner: other.owner };
    return { tier: "unknown", sourceId: null, owner: host };
  };
}

export const classifySource = createSourceClassifier(registrySnapshot as unknown as SourceRegistrySnapshot);

const NEUTRAL_GROUPS: ReadonlySet<string> = new Set<SourceLabelGroup>(["discovery-only", "press", "media"]);

/** 재생할 수 있는 영상·오디오 주소인지. 매체 계층 등록 항목은 youtube.com 하위 도메인 전체를 잡으므로 경로로 가립니다. */
function isPlayableMedia(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    const host = hostname.replace(/^(www|m|music)\./, "");
    if (host === "youtu.be" || host === "podcasts.apple.com") return true;
    return host === "youtube.com" && /^\/(watch|shorts\/|live\/|embed\/)/.test(pathname);
  } catch {
    return false;
  }
}

/**
 * 문구 묶음. 발견 전용·보도·매체 계층만 중립 문구를 쓰고, 주소가 없거나 다른 계층이면 기존 'official' 묶음입니다.
 * 매체 계층이라도 재생 주소가 아니면(help.youtube.com 도움말, 채널 페이지) '영상' 대신 원문 링크 문구를 씁니다.
 */
export function sourceLabelGroup(url?: string | null): SourceLabelGroup {
  if (!url) return "official";
  const { tier } = classifySource(url);
  if (tier === "media" && !isPlayableMedia(url)) return "discovery-only";
  return NEUTRAL_GROUPS.has(tier) ? (tier as SourceLabelGroup) : "official";
}

/** 출처 링크 문구. 화면의 '공식' 링크 문구는 모두 이 함수를 거칩니다. */
export function sourceLabel(url: string | null | undefined, field: SourceLabelField, locale: Locale = "ko"): string {
  return SOURCE_LABELS[locale][sourceLabelGroup(url)][field];
}
