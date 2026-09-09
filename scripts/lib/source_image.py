from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit
import ipaddress
import json
import re
import sys

POLICY = json.loads((Path(__file__).resolve().parents[2] / 'references/source-image-policy.json').read_text())
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
EXCLUDED = re.compile(r'(?:^|[\s_\-/])(logo|avatar|author-photo|profile|icon|related|recommended|recommendations|advert|advertisement|social|tracking|pixel|placeholder|skeleton)(?:$|[\s_\-/.])', re.I)

class Element:
    def __init__(self, tag, attrs, parent, order):
        self.tag, self.attrs, self.parent, self.order = tag, {key: value or '' for key, value in dict(attrs).items()}, parent, order
        self.children = []
        if parent:
            parent.children.append(self)

    def ancestors(self):
        node = self
        while node:
            yield node
            node = node.parent

class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element('document', {}, None, -1)
        self.stack = [self.root]
        self.nodes = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs, self.stack[-1], len(self.nodes))
        self.nodes.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

def safe_url(value, base):
    if not value:
        return None
    try:
        url = urljoin(base, value.strip())
        p = urlsplit(url)
        host = (p.hostname or '').lower()
        if p.scheme != 'https' or not host or p.username or p.password or host == 'localhost' or host.endswith(('.local', '.internal', '.localhost')):
            return None
        try:
            if not ipaddress.ip_address(host).is_global:
                return None
        except ValueError:
            pass
        return url
    except ValueError:
        return None

def excluded(node):
    for item in node.ancestors():
        a = item.attrs
        if item.tag in {'nav','aside','footer','template','noscript'} or a.get('role') in {'navigation','banner','contentinfo'}:
            return True
        if item is not node and item.tag in {'h1','h2','h3','h4','h5','h6'}:
            return True
        if item.tag == 'header' and not any(p.tag == 'article' for p in list(item.ancestors())[1:]):
            return True
        if 'hidden' in a or a.get('aria-hidden') == 'true' or re.search(r'(display\s*:\s*none|visibility\s*:\s*hidden)',a.get('style',''),re.I):
            return True
        if EXCLUDED.search(' '.join(a.get(k,'') or '' for k in ['class','id','alt','src'])):
            return True
    return False

def image_url(node, base):
    a = node.attrs
    for key, minimum in [('width', POLICY['minimumKnownWidth']), ('height', POLICY['minimumKnownHeight'])]:
        val = a.get(key, '') or ''
        if re.fullmatch(r'\d+(?:px)?', val) and int(val.removesuffix('px')) < minimum:
            return None
    candidates = []
    for key in ['data-srcset','srcset']:
        parts = []
        for chunk in (a.get(key,'') or '').split(','):
            bits = chunk.strip().split()
            if bits:
                score = float(re.sub(r'[^0-9.]','',bits[-1]) or 1) if len(bits)>1 else 1
                parts.append((score,bits[0]))
        candidates.extend(value for _,value in sorted(parts,reverse=True))
    keys = ['poster', 'data-poster'] if node.tag == 'video' else ['data-src','data-lazy-src','data-original','src']
    candidates.extend(a.get(k) for k in keys)
    if node.tag not in {'img','source','video'}:
        candidates.extend(re.findall(r'background(?:-image)?\s*:[^;]*url\([\s\"\']*([^\)\"\']+)', a.get('style','') or '',re.I))
    for value in candidates:
        url = safe_url(value,base)
        if url and not EXCLUDED.search(urlsplit(url).path) and not re.search(r'\.(mp4|webm|mov|m3u8|mp3|wav)$', urlsplit(url).path, re.I):
            return url
    return None

def select(html, base):
    d = Document(html)
    h1 = next((n for n in d.nodes if n.tag == 'h1' and not excluded(n)),None)
    scopes = []
    if h1:
        ancestors = list(h1.ancestors())[1:]
        scopes = [n for n in ancestors if n.tag == 'article'] or [n for n in ancestors if n.tag == 'main' or n.attrs.get('role') == 'main']
    scope = scopes[0] if scopes else None
    if not scope:
        scope = next((n for n in d.nodes if n.tag == 'main'),None)
    images = []
    for n in d.nodes:
        if excluded(n) or n.tag not in {'img','source','video','div','figure'}:
            continue
        if n.tag == 'source' and not any(x.tag == 'picture' for x in n.ancestors()):
            continue
        if scope and scope not in n.ancestors():
            continue
        if not scope and (not h1 or n.order < h1.order):
            continue
        url = image_url(n,base)
        if url:
            images.append({'image':url,'kind':'source-first-image','element':n.tag,'alt':n.attrs.get('alt',''),'selectionPolicy':POLICY['version']})
            break
    meta = {}
    for n in d.nodes:
        if n.tag == 'meta':
            meta[(n.attrs.get('property') or n.attrs.get('name') or '').lower()] = n.attrs.get('content','')
    for key in ['og:image','og:image:url','twitter:image','twitter:image:src']:
        url = safe_url(meta.get(key),base)
        if url and not any(x['image'] == url for x in images):
            images.append({'image':url,'kind':'source-share-preview','element':key,'alt':'','selectionPolicy':POLICY['version']})
            break
    return {'candidates':images,'title':meta.get('og:title') or meta.get('twitter:title'),'description':meta.get('og:description')}

if __name__ == '__main__':
    request = json.load(sys.stdin)
    json.dump(select(request['html'] or '',request['url']),sys.stdout,ensure_ascii=False)
