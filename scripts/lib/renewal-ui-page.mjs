// renewal-ui-page.mjs — 리뉴얼 브라우저 시험의 페이지 안 분석 함수(scripts/test-renewal-ui.mjs가 page.evaluate로 넘깁니다)
//
// 이 함수는 브라우저 안에서 직렬화되어 돌므로 모듈 밖 변수를 쓰면 안 됩니다. 넘침·한국어와 영문 줄바꿈·피움 표시·
// 바닥글과 헤더 링크·테마 버튼·계산된 색 대비를 한 번에 모아 돌려줍니다. 판정은 실행기가 합니다.

export function analyzePage(opts) {
  const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힯]/;
  const out = {};
  const vw = window.innerWidth;
  const describe = (el) => {
    if (!el || el.nodeType !== 1) return String(el);
    const parts = [];
    let n = el;
    for (let depth = 0; n && n.nodeType === 1 && depth < 4; depth += 1, n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) s += `#${n.id}`;
      const cls = (n.getAttribute('class') || '').split(/\s+/).filter(Boolean).slice(0, 2);
      if (cls.length) s += '.' + cls.join('.');
      parts.unshift(s);
    }
    return parts.join(' > ');
  };
  const visible = (el) => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true });

  // 1) overflow
  out.overflow = {
    innerWidth: vw,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: [],
  };
  if (out.overflow.docScrollWidth > vw || out.overflow.bodyScrollWidth > vw) {
    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 0.5 && r.width > 0) out.overflow.offenders.push({ el: describe(el), right: Math.round(r.right) });
      if (out.overflow.offenders.length >= 8) break;
    }
  }

  // 2) Korean mid-word line breaks
  // midWord   = a line break between two letters (Hangul syllables, Latin letters, digits) of one
  //             space-delimited word, e.g. '구독신|청'. This is the defect the check looks for.
  // punctBreak = a break next to punctuation inside a space-delimited unit, e.g. '개발자·|기업' or
  //             '설정|(밀도'. UAX #14 allows it under keep-all; no word is split. Reported only.
  // forced    = the unit is wider than its line, so overflow-wrap:anywhere had to break it.
  const LETTER = /[\p{L}\p{N}]/u;
  const korean = { nodes: 0, multiLine: 0, midWord: [], punctBreak: [], forced: [], keepAllMissing: [] };
  const range = document.createRange();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!HANGUL.test(node.textContent)) return NodeFilter.FILTER_REJECT;
      const el = node.parentElement;
      if (!el || el.closest('pre, code, kbd, samp, script, style, noscript, textarea, template')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const blockOf = (el) => {
    let n = el;
    while (n && n !== document.body) {
      const d = getComputedStyle(n).display;
      if (d !== 'contents' && (!d.startsWith('inline') || d === 'inline-block' || d === 'inline-flex' || d === 'inline-grid')) return n;
      n = n.parentElement;
    }
    return document.body;
  };
  const clampBox = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const v = getComputedStyle(n).webkitLineClamp;
      if (v && v !== 'none') return n;
    }
    return null;
  };
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const el = node.parentElement;
    if (!visible(el)) continue;
    range.selectNodeContents(node);
    const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
    if (!rects.length) continue;
    korean.nodes += 1;
    const cs = getComputedStyle(el);
    if (cs.wordBreak !== 'keep-all') {
      korean.keepAllMissing.push({ el: describe(el), wordBreak: cs.wordBreak, text: node.textContent.trim().slice(0, 40), multiLine: rects.length > 1 });
    }
    if (rects.length < 2) continue;
    korean.multiLine += 1;
    const text = node.textContent;
    let prevTop = null;
    let prevIdx = -1;
    for (let i = 0; i < text.length; i += 1) {
      const code = text.charCodeAt(i);
      if (code >= 0xdc00 && code <= 0xdfff) continue; // low surrogate
      const end = code >= 0xd800 && code <= 0xdbff ? i + 2 : i + 1;
      range.setStart(node, i);
      range.setEnd(node, end);
      const cr = [...range.getClientRects()].filter((r) => r.width > 0 || !/\s/.test(text[i]));
      if (!cr.length) continue;
      const r = cr[cr.length - 1];
      if (r.width === 0 && /\s/.test(text[i])) continue;
      if (prevTop !== null && r.top > prevTop + r.height * 0.5) {
        const a = text[prevIdx];
        const b = text[i];
        const between = text.slice(prevIdx + 1, i);
        const clampK = clampBox(el);
        const hiddenByClamp = clampK && r.top >= clampK.getBoundingClientRect().bottom - 1;
        if (!hiddenByClamp && !/\s/.test(a) && !/\s/.test(b) && !/\s/.test(between) && (HANGUL.test(a) || HANGUL.test(b))) {
          let s = prevIdx;
          while (s > 0 && !/\s/.test(text[s - 1])) s -= 1;
          let e = i;
          while (e < text.length && !/\s/.test(text[e])) e += 1;
          const word = text.slice(s, e);
          range.setStart(node, s);
          range.setEnd(node, e);
          const wordWidth = [...range.getClientRects()].reduce((sum, q) => sum + q.width, 0);
          const block = blockOf(el);
          const bcs = getComputedStyle(block);
          const avail = block.getBoundingClientRect().width - parseFloat(bcs.paddingLeft) - parseFloat(bcs.paddingRight)
            - parseFloat(bcs.borderLeftWidth) - parseFloat(bcs.borderRightWidth);
          const entry = { el: describe(el), word, breakAfter: text.slice(s, i), wordWidth: Math.round(wordWidth), avail: Math.round(avail), wordBreak: cs.wordBreak, overflowWrap: cs.overflowWrap };
          if (wordWidth > avail - 1) korean.forced.push(entry);
          else if (LETTER.test(a) && LETTER.test(b)) korean.midWord.push(entry);
          else korean.punctBreak.push(entry);
        }
      }
      prevTop = r.top;
      prevIdx = i;
    }
  }
  out.korean = korean;

  // 2b) Latin words split across lines (for example 'Seo'+'ul').
  //   split   = a plain word (letters/digits only, at most 15 characters) broken between two
  //             letters on a visible line. No layout at 320px or wider needs that. Failure.
  //   forced  = the break sits inside a long or joined token ('PDF/Word/…', 'about.meta.com',
  //             'OpenAI·SpaceXAI·Oracle') that is wider than its line, so overflow-wrap:anywhere
  //             had to break it. Allowed by the wrapping rule; reported only.
  //   clamped = the second part lies below a -webkit-line-clamp box, so it is never shown.
  const latin = { split: [], forced: [], clamped: [] };
  const lw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!/[A-Za-z]{2}/.test(node.textContent)) return NodeFilter.FILTER_REJECT;
      const el = node.parentElement;
      if (!el || el.closest('pre, code, kbd, samp, script, style, noscript, textarea, template')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (lw.nextNode()) {
    const node = lw.currentNode;
    const el = node.parentElement;
    if (!visible(el)) continue;
    range.selectNodeContents(node);
    if ([...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0).length < 2) continue;
    const text = node.textContent;
    const tokenRe = /\S+/g;
    let t;
    while ((t = tokenRe.exec(text))) {
      const token = t[0];
      if (!/[A-Za-z]/.test(token)) continue;
      let prev = null;
      for (let i = 0; i < token.length; i += 1) {
        range.setStart(node, t.index + i);
        range.setEnd(node, t.index + i + 1);
        const r = range.getClientRects()[0];
        if (!r) continue;
        if (prev && r.top > prev.r.top + r.height * 0.5) {
          const a = token[prev.i];
          const b = token[i];
          if (/[A-Za-z0-9]/.test(a) && /[A-Za-z0-9]/.test(b)) {
            const clamp = clampBox(el);
            range.setStart(node, t.index);
            range.setEnd(node, t.index + token.length);
            const tokenWidth = [...range.getClientRects()].reduce((s, q) => s + q.width, 0);
            const block = blockOf(el);
            const bcs = getComputedStyle(block);
            const avail = block.getBoundingClientRect().width - parseFloat(bcs.paddingLeft) - parseFloat(bcs.paddingRight);
            const plain = /^[A-Za-z0-9]+[.,!?;:)'"’”]*$/.test(token.replace(/^[('"‘“]+/, '')) && token.length <= 15;
            const entry = { el: describe(el), token: token.slice(0, 60), breakAfter: token.slice(0, i), tokenWidth: Math.round(tokenWidth), avail: Math.round(avail) };
            if (clamp && r.top >= clamp.getBoundingClientRect().bottom - 1) latin.clamped.push(entry);
            else if (!plain && tokenWidth > avail - 1) latin.forced.push(entry);
            else latin.split.push(entry);
            break;
          }
        }
        prev = { r, i };
      }
    }
  }
  out.latinSplit = latin.split;
  out.latinForced = latin.forced;
  out.latinClamped = latin.clamped;

  // 2c) Line breaks inside a unit that UAX #14 or the 어절 rule forbids, in any script. Text nodes are joined in one block, so
  //     '(' followed by <span>host</span> counts as one unit.
  //   afterOpen   = right after an opening bracket or quote, e.g. '글꼴(|cdn.jsdelivr.net' (LB14 OP ×).
  //   beforeClose = right before closing punctuation or '/', e.g. '합니다|.' or 'AI|)' (LB13 × CL CP EX IS SY).
  //   beforeClose also covers '%', '‰', '…' and '‥' (LB25 NU × PO, LB22 × IN), e.g. '71.0|%를'.
  //   inDotted    = beside a dot or '@' between Latin letters or digits: a host name, version or address, e.g.
  //                 'googleapis.|com', 'v1.|3', 'help@|example.com' (LB29, LB25, LB28).
  //   dotParticle = after a dot that follows a Latin letter or digit and precedes Hangul: an abbreviation and its
  //                 particle, e.g. 'Inc.|의'. Breaking there leaves the particle without its word (어절 rule).
  //   acrossNodes = between two letters or digits that sit in different inline elements, e.g. '관리</strong>|에만'
  //                 or '…net</span>|에'. Sections 2 and 2b compare letters only inside one text node.
  //   WebKit 26 made 13 of these in keep-all text on /privacy/ and /newsletter/ and Chromium made none
  //   (Aislop audit, 2026-11-01). The runner repeats this check in WebKit (--engine webkit). Skipped: a unit
  //   wider than its line (overflow-wrap:anywhere must break it) and text below a line clamp. Failure.
  const OPEN = /[([{（［｛「『【〈《“‘]/;
  const CLOSE = /[)\]}）］｝」』】〉》”’.,:;!?。、/%‰…‥]/;
  const ALNUM = /[A-Za-z0-9]/;
  const chars = [];
  // Inline code, kbd and samp stay in the text: they wrap with the words around them, so '(' + <code>host</code> is
  // one unit. A <br> and a skipped element (pre, svg, …) end the unit, so text on either side is never adjacent.
  const cw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node.nodeType !== 1) return NodeFilter.FILTER_ACCEPT;
      // A replaced element (img, video, …) also ends the unit: CSS gives a break opportunity on both of its sides.
      if (node.tagName === 'BR' || node.matches('pre, script, style, noscript, textarea, template, svg, img, input, select, video, audio, iframe, canvas, object, embed, hr')) {
        chars.push({ ch: '\n' });
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });
  while (cw.nextNode()) {
    const node = cw.currentNode;
    const el = node.parentElement;
    if (!el || !visible(el)) continue;
    const block = blockOf(el);
    const text = node.textContent;
    for (let i = 0; i < text.length;) {
      const len = text.codePointAt(i) > 0xffff ? 2 : 1;
      chars.push({ node, i, len, ch: text.slice(i, i + len), block });
      i += len;
    }
  }
  // Only breakable spaces end a unit. A no-break space (U+00A0, U+202F, U+2007) keeps its neighbours in one unit.
  const inText = (c, block) => Boolean(c && c.node && c.block === block && !/[ \t\n\r\f\u3000\u200b]/.test(c.ch));
  const charRect = (c, last) => {
    range.setStart(c.node, c.i);
    range.setEnd(c.node, c.i + c.len);
    const rs = [...range.getClientRects()].filter((r) => r.width > 0 || r.height > 0);
    return rs.length ? rs[last ? rs.length - 1 : 0] : null;
  };
  out.forbiddenBreaks = [];
  for (let k = 1; k < chars.length; k += 1) {
    const a = chars[k - 1];
    const b = chars[k];
    if (!inText(a, a.block) || !inText(b, a.block)) continue;
    const before = inText(chars[k - 2], a.block) ? chars[k - 2].ch : '';
    const after = inText(chars[k + 1], a.block) ? chars[k + 1].ch : '';
    let kind = null;
    if (OPEN.test(a.ch)) kind = 'afterOpen';
    else if (CLOSE.test(b.ch)) kind = 'beforeClose';
    else if ((a.ch === '.' || a.ch === '@') && ALNUM.test(before) && ALNUM.test(b.ch)) kind = 'inDotted';
    else if (b.ch === '@' && ALNUM.test(a.ch) && ALNUM.test(after)) kind = 'inDotted';
    else if (a.ch === '.' && ALNUM.test(before) && HANGUL.test(b.ch)) kind = 'dotParticle';
    else if (a.node !== b.node && LETTER.test(a.ch) && LETTER.test(b.ch)) kind = 'acrossNodes';
    if (!kind) continue;
    const ra = charRect(a, true);
    const rb = charRect(b, false);
    if (!ra || !rb || rb.top <= ra.top + ra.height * 0.5) continue;
    const el = b.node.parentElement;
    const clamp = clampBox(el);
    if (clamp && rb.top >= clamp.getBoundingClientRect().bottom - 1) continue;
    let s = k - 1;
    while (inText(chars[s - 1], a.block)) s -= 1;
    let e = k;
    while (inText(chars[e + 1], a.block)) e += 1;
    // Measure the unit per text node so an inline element's own box is not counted twice.
    let unitWidth = 0;
    for (let j = s; j <= e;) {
      let m = j;
      while (m < e && chars[m + 1].node === chars[j].node) m += 1;
      range.setStart(chars[j].node, chars[j].i);
      range.setEnd(chars[m].node, chars[m].i + chars[m].len);
      unitWidth += [...range.getClientRects()].reduce((sum, q) => sum + q.width, 0);
      j = m + 1;
    }
    const bcs = getComputedStyle(a.block);
    const avail = a.block.getBoundingClientRect().width - parseFloat(bcs.paddingLeft) - parseFloat(bcs.paddingRight)
      - parseFloat(bcs.borderLeftWidth) - parseFloat(bcs.borderRightWidth);
    if (unitWidth > avail - 1) continue;
    const join = (from, to) => chars.slice(from, to).map((c) => c.ch).join('');
    out.forbiddenBreaks.push({ el: describe(el), kind, at: `${join(s, k)}|${join(k, e + 1)}`.slice(0, 80), unitWidth: Math.round(unitWidth), avail: Math.round(avail) });
  }

  // 3) Pium images and badges
  const piums = [...document.querySelectorAll('img[src="/brand/pium.svg"]')].map((img) => {
    const r = img.getBoundingClientRect();
    const badge = img.closest('[data-ai-author]');
    return {
      in: describe(img.parentElement),
      inBadge: Boolean(badge),
      visible: visible(img),
      complete: img.complete,
      natural: img.naturalWidth,
      w: Math.round(r.width * 100) / 100,
      h: Math.round(r.height * 100) / 100,
      alt: img.getAttribute('alt'),
    };
  });
  const badges = [...document.querySelectorAll('[data-ai-author="pium"]')].map((b) => {
    const img = b.querySelector('img');
    const r = b.getBoundingClientRect();
    return {
      size: b.dataset.size,
      text: b.textContent.trim(),
      auto: Boolean(b.querySelector('[data-auto-published]')),
      visible: visible(b),
      imgVisible: img ? visible(img) : false,
      imgW: img ? Math.round(img.getBoundingClientRect().width * 100) / 100 : 0,
      right: Math.round(r.right),
      inCard: Boolean(b.closest('[data-weekly-card]')),
      clipped: b.scrollWidth > b.clientWidth + 1,
    };
  });
  const cards = [...document.querySelectorAll('[data-weekly-card]')].map((c) => ({
    badges: c.querySelectorAll('[data-ai-author="pium"]').length,
    visibleBadges: [...c.querySelectorAll('[data-ai-author="pium"]')].filter(visible).length,
  }));
  out.pium = { piums, badges, cards };

  // 4) Header links and controls
  const ext = [...document.querySelectorAll('header .site-nav-ext')].map((a) => ({
    href: a.getAttribute('href'), text: a.textContent.trim(), display: getComputedStyle(a).display, visible: visible(a),
    target: a.getAttribute('target'), rel: a.getAttribute('rel'),
  }));
  const headerExternal = [...document.querySelectorAll('header a[href]')]
    .filter((a) => /^(https?:|mailto:)/.test(a.getAttribute('href')))
    .map((a) => ({ href: a.getAttribute('href'), visible: visible(a) }));
  const sub = document.querySelector('header .site-nav-subscribe');
  const themeButtons = [...document.querySelectorAll('header .vn-theme-btn')].map((b) => {
    const r = b.getBoundingClientRect();
    return { text: b.textContent.trim(), visible: visible(b), right: Math.round(r.right), left: Math.round(r.left), clipped: b.scrollWidth > b.clientWidth + 1, whiteSpace: getComputedStyle(b).whiteSpace };
  });
  const brokenNavLabels = (() => {
    const row = document.querySelector('.site-nav-row');
    if (!row) return ['NO .site-nav-row'];
    const w = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
    const broken = [];
    const rr = document.createRange();
    while (w.nextNode()) {
      const t = w.currentNode;
      if (!t.textContent.trim()) continue;
      if (!visible(t.parentElement)) continue;
      rr.selectNodeContents(t);
      if (rr.getClientRects().length > 1) broken.push(t.textContent.trim());
    }
    return broken;
  })();
  out.header = {
    ext,
    headerExternal,
    subscribe: sub ? { visible: visible(sub), href: sub.getAttribute('href'), text: sub.textContent.trim(), right: Math.round(sub.getBoundingClientRect().right) } : null,
    themeButtons,
    brokenNavLabels,
  };

  // 5) Footer links
  const chan = [...document.querySelectorAll('footer nav[aria-labelledby="site-footer-channels"] a')].map((a) => {
    const r = a.getBoundingClientRect();
    return { href: a.getAttribute('href'), text: a.textContent.trim(), target: a.getAttribute('target'), rel: a.getAttribute('rel'), aria: a.getAttribute('aria-label'), visible: visible(a), right: Math.round(r.right), lines: a.getClientRects().length };
  });
  const footerExternal = [...document.querySelectorAll('footer a[href]')]
    .filter((a) => /^(https?:|mailto:)/.test(a.getAttribute('href')))
    .map((a) => a.getAttribute('href'));
  out.footer = { channels: chan, footerExternal };

  // 6) Contrast from computed colours
  const parse = (str) => {
    if (!str) return null;
    let m = str.match(/^rgba?\(([^)]+)\)$/);
    if (m) {
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    m = str.match(/^color\(srgb\s+([^)]+)\)$/);
    if (m) {
      const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
      return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p.length > 3 ? p[3] : 1 };
    }
    return null;
  };
  const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => { const x = lum(a); const y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const effectiveBg = (el) => {
    const layers = [];
    let unknown = null;
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !unknown) unknown = { el: describe(n), image: cs.backgroundImage.slice(0, 80) };
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        layers.push(c);
        if (c.a >= 0.999) break;
      }
      n = n.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i -= 1) base = blend(layers[i], base);
    return { color: base, unknown };
  };
  const probe = document.createElement('span');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  // The site's reduced-motion rule gives every element a 0.01ms transition on all properties,
  // so a colour change would read back the old value. Inline !important beats it.
  probe.style.setProperty('transition', 'none', 'important');
  document.body.appendChild(probe);
  const TOKENS = ['--text', '--text-strong', '--text-soft', '--muted', '--dim', '--accent', '--gold', '--kicker', '--on-accent', '--red', '--accent-fill', '--bg', '--surface', '--card', '--border2', '--focus-ring'];
  const tokenColor = {};
  for (const t of TOKENS) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(t).trim();
    if (!raw) { tokenColor[t] = null; continue; }
    probe.style.color = `var(${t})`;
    tokenColor[t] = getComputedStyle(probe).color;
  }
  probe.remove();
  const tokenPairs = {};
  const T = (t) => parse(tokenColor[t]);
  const pairs = [
    ['--text', '--bg'], ['--text', '--surface'], ['--text', '--card'],
    ['--muted', '--bg'], ['--muted', '--surface'], ['--muted', '--card'],
    ['--dim', '--bg'], ['--dim', '--surface'], ['--dim', '--card'],
    ['--accent', '--bg'], ['--accent', '--surface'], ['--accent', '--card'],
    ['--on-accent', '--accent-fill'], ['--border2', '--bg'], ['--focus-ring', '--bg'],
  ];
  for (const [f, b] of pairs) if (T(f) && T(b)) tokenPairs[`${f} on ${b}`] = Math.round(ratio(T(f), T(b)) * 100) / 100;

  const classify = (color) => {
    const hits = TOKENS.filter((t) => tokenColor[t] && tokenColor[t] === color && !['--accent-fill', '--bg', '--surface', '--card', '--border2', '--focus-ring'].includes(t));
    return hits.length ? hits.join('|') : 'other';
  };
  const samples = [];
  let idCounter = Number(document.body.dataset.vnProbeMax || 0);
  for (const el of document.body.querySelectorAll('*')) {
    if (el.closest('script, style, noscript, template, svg')) continue;
    const own = [...el.childNodes].filter((c) => c.nodeType === 3 && c.textContent.trim()).map((c) => c.textContent.trim()).join(' ');
    if (!own) continue;
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const cs = getComputedStyle(el);
    if (cs.clip === 'rect(0px, 0px, 0px, 0px)' || (r.width <= 1 && r.height <= 1)) continue;
    // Skip the skip-link when it is off screen and other visually hidden helpers.
    if (r.bottom < -100 || r.right < -100) continue;
    if (!el.dataset.vnProbe) { idCounter += 1; el.dataset.vnProbe = String(idCounter); }
    const fg0 = parse(cs.color);
    if (!fg0) continue;
    const { color: bg, unknown } = effectiveBg(el);
    let opacity = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity || 1);
    let fg = fg0.a < 1 ? blend(fg0, bg) : fg0;
    if (opacity < 1) fg = blend({ ...fg, a: opacity }, bg);
    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const decorative = Boolean(el.closest('[aria-hidden="true"]')) || /^[·•|/\-–—:]+$/.test(own);
    samples.push({
      id: el.dataset.vnProbe,
      el: describe(el),
      text: own.slice(0, 40),
      cat: classify(cs.color),
      fg: hex(fg),
      bg: hex(bg),
      ratio: Math.round(ratio(fg, bg) * 100) / 100,
      need: large ? 3 : 4.5,
      size,
      weight,
      unknownBg: unknown,
      decorative,
      opacity,
    });
  }
  document.body.dataset.vnProbeMax = String(idCounter);
  out.contrast = { tokenColor, tokenPairs, samples };

  // 7) Focus-ring and control boundary of the theme buttons (non-text contrast 3:1)
  const btns = [...document.querySelectorAll('header .vn-theme-btn')].map((b) => {
    const cs = getComputedStyle(b);
    const { color: bg } = effectiveBg(b.parentElement);
    const border = parse(cs.borderTopColor);
    const fill = parse(cs.backgroundColor);
    return {
      text: b.textContent.trim(),
      pressed: b.getAttribute('aria-pressed'),
      borderOnBg: border ? Math.round(ratio(border.a < 1 ? blend(border, bg) : border, bg) * 100) / 100 : null,
      fillOnBg: fill && fill.a > 0 ? Math.round(ratio(blend(fill, bg), bg) * 100) / 100 : null,
      fontWeight: cs.fontWeight,
    };
  });
  out.themeButtonsContrast = btns;
  return out;
}
