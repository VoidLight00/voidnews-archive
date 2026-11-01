// AB 회차 화면 시험. 운영 검사(verify-site-release.mjs)의 한 항목입니다(사용자 결정 2026-11-01 "운영 검사에 최신 회차").
// 기본은 lib/ab/data.ts에 등록되고 게시 승인 목록(references/approved-editions.json)에도 있는 회차 가운데 slug가 가장 늦은 회차 하나를 엽니다.
// 승인 전 초안이 작업 트리에 등록되어 있어도 고르지 않습니다. 초안은 운영에서 404라, 고르면 승격 뒤 검사가 실패해 운영이 되돌려집니다(2026-11-02 검토 P1-1).
// VOIDNEWS_AB_EDITIONS=2026-10a,2026-10b로 바꿀 수 있습니다. 회차마다 새 브라우저 문맥을 씁니다. 상세 화면에서 ENGLISH를 누르면 언어 선택이
// 저장되어(voidnews-locale:v1), 같은 문맥의 다음 회차 목록이 영어 제목으로 보였습니다.
// 확인: 목록 /ab/<회차>/ 200과 카드 제목 전부(화면처럼 마크다운 기호를 뺀 제목, 시연 카드 포함), 보이는 이미지 로드, 1440·820·390·320px 가로 넘침 없음,
//       상세 주소가 있는 카드(slug 있음)마다 /ab/<회차>/<글>/ 200과 언어 탭 아래 한국어 본문, 내부 문구 없음, 날짜 주소 200과 /ab/ 목록의 날짜 링크,
//       이 사이트 스크립트의 페이지 오류 없음. 영어 본문이 없어 대체 문구가 보이는 글은 실패가 아니라 경고(warnings)로 남깁니다.
// 목록 카드는 링크가 아니라 role="button"이고 /ab/ 목록은 날짜 주소로 연결하므로, 카드 제목과 날짜 링크로 확인합니다.
// 카드 이미지는 실패하면 다음 후보나 대체 패널로 바뀌어 화면에 깨진 <img>가 남지 않으므로(media.tsx), 같은 사이트 이미지 응답의
// 4xx·5xx와 요청 실패도 기록합니다. 다른 사이트 이미지와 다른 사이트 임베드(YouTube·Threads)의 스크립트 오류는 운영 판정을 흔들지 않도록 세지 않습니다.
// test-ab-supplements-ui.mjs는 2026-09a 보조 자료만, 빌드 게이트 check-ab-editions.mjs는 파일 존재만 봅니다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import {chromium} from 'playwright';
import {registeredEditions} from './lib/ab-editions.mjs';

const base=process.env.VOIDNEWS_TEST_URL??'http://127.0.0.1:3142';
const root=path.resolve(import.meta.dirname,'..');
const label=base.includes('127.0.0.1')?'local':'production';
const output=process.env.VOIDNEWS_AB_EDITION_TEST_OUTPUT??path.join(root,'_workspace/ab-edition-ui',new Date().toISOString().replace(/[:.]/g,'-'),`ab-edition-${label}.json`);
fs.mkdirSync(path.dirname(output),{recursive:true});
// 9a·9b 전용 검사에서 가져온 목록입니다. 일반 단어 '리허설'은 뺐습니다. 주간 글에 '종료 리허설(brownout)' 같은 정상 표현이 있습니다(검토 P1-3).
const forbidden=/발표용 제안 시연|발표 전에 확인|발표 전 확인|브리핑 작성 중|작성한 시연안|원영상과 모델 조건을 확인하는 중|unexecuted three-step|preparing this briefing/i;

function transpile(rel){
 const exports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,rel),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports});
 return exports;
}
const {stripMarkdown}=transpile('lib/md.ts');
const registered=registeredEditions(fs.readFileSync(path.join(root,'lib/ab/data.ts'),'utf8'));
const approved=JSON.parse(fs.readFileSync(path.join(root,'references/approved-editions.json'),'utf8')).editions;
const wanted=(process.env.VOIDNEWS_AB_EDITIONS||'').split(',').map(s=>s.trim()).filter(Boolean);
const latest=registered.filter(s=>approved.includes(s)).sort().at(-1);
const slugs=wanted.length?wanted:latest?[latest]:[];
const fails=[],warnings=[],checks=[],errors=[],ignoredErrors=[],badImages=[];
const origin=new URL(base).origin;
const ok=(cond,msg)=>{if(!cond)fails.push(msg);};

const load=slug=>Object.values(transpile(`lib/ab/editions/${slug}.ts`)).find(v=>v&&typeof v==='object'&&Array.isArray(v.highlights));
function watch(page){
 // 스택에 다른 사이트 주소만 있는 오류(임베드 iframe)는 따로 기록만 합니다. 주소가 없거나 이 사이트 주소가 있으면 셉니다.
 page.on('pageerror',e=>{const s=String(e.stack||'');(s.includes(origin)||!/https?:\/\//.test(s)?errors:ignoredErrors).push(e.message);});
 page.on('response',r=>{if(r.request().resourceType()==='image'&&r.url().startsWith(origin)&&r.status()>=400)badImages.push(`${r.status()} ${r.url()}`);});
 // 다음 페이지로 넘어갈 때 취소된 요청(net::ERR_ABORTED)은 결함이 아닙니다. 없는 파일은 위의 404 응답으로 잡힙니다.
 page.on('requestfailed',r=>{const e=r.failure()?.errorText||'failed';if(r.resourceType()==='image'&&r.url().startsWith(origin)&&!/ERR_ABORTED/.test(e))badImages.push(`${e} ${r.url()}`);});
}
// 열기 시간 초과로 스크립트가 보고서 없이 멈추지 않게 실패로 기록하고 다음 확인으로 넘어갑니다.
async function visit(page,url,what){
 try{
  const r=await page.goto(url,{waitUntil:'networkidle'});
  ok(r?.status()===200,`${what}: HTTP ${r?.status()}`);
  return r?.status()===200;
 }catch(e){fails.push(`${what}: 페이지를 열지 못함 ${String(e.message).split('\n')[0]}`);return false;}
}
async function settle(page){
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete),null,{timeout:20_000}).catch(()=>{});
 return page.evaluate(()=>({
  images:document.images.length,
  broken:[...document.images].filter(i=>i.offsetParent!==null&&(!i.complete||i.naturalWidth===0)).map(i=>i.currentSrc||i.src),
  // html·body가 overflow-x: clip이라 넘친 폭은 body.scrollWidth에만 나타납니다(test-renewal-ui와 같은 측정).
  overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth,
 }));
}
// 언어 탭을 누르고 탭 바로 아래 본문 영역(본문·공식 발췌·대체 문구)만 읽습니다(PostDetail.tsx koBody/enBody).
// 전에는 제목·요약·관련 카드까지 든 <article> 전체 길이를 재서 본문이 없어도 통과했습니다(검토 P2-3).
async function readLang(page,name){
 const tab=page.getByRole('tab',{name,exact:true});
 if(await tab.count()){
  await tab.first().click();
  await page.waitForFunction(n=>[...document.querySelectorAll('[role=tab]')].some(t=>t.getAttribute('aria-selected')==='true'&&t.textContent.trim()===n),name,{timeout:5_000}).catch(()=>{});
 }
 return page.evaluate(()=>{
  const article=document.querySelector('article');
  let body='',fallback=false;
  for(let n=article?.querySelector('[role=tablist]')?.nextElementSibling;n&&/articleBody|officialExcerpt|langFallback/.test(n.className);n=n.nextElementSibling){
   body+=n.innerText;
   fallback||=/langFallback/.test(n.className);
  }
  return {article:article?.innerText??'',body:body.trim(),fallback};
 });
}

const browser=await chromium.launch();
try{
 if(!slugs.length)fails.push('lib/ab/data.ts에 등록되고 게시 승인 목록에도 있는 회차가 없음');
 for(const slug of slugs){
  if(!registered.includes(slug)){fails.push(`${slug}: lib/ab/data.ts에 등록되지 않은 회차`);continue;}
  let ed;
  try{ed=load(slug);}catch(e){fails.push(`${slug}: 회차 데이터를 읽지 못함 ${String(e.message).split('\n')[0]}`);continue;}
  if(!ed){fails.push(`${slug}: 회차 데이터를 읽지 못함`);continue;}
  const context=await browser.newContext({reducedMotion:'reduce'});
  const page=await context.newPage();
  watch(page);
  const posts=[...ed.highlights.map(h=>h.post),...(ed.modelWatch||[]),...(ed.editorsPicks||[]),...(ed.demoCards||[])];
  for(const width of [1440,820,390,320]){
   await page.setViewportSize({width,height:900});
   if(!await visit(page,`${base}/ab/${slug}/`,`${slug} 목록 ${width}px`))continue;
   const s=await settle(page);
   const text=await page.locator('body').innerText();
   for(const p of posts)ok(text.includes(stripMarkdown(p.title)),`${slug} 목록 ${width}px: 카드 제목 없음 "${p.title}"`);
   ok(s.broken.length===0,`${slug} 목록 ${width}px: 깨진 이미지 ${s.broken.join(', ')}`);
   ok(s.overflow<=1,`${slug} 목록 ${width}px: 가로 넘침 ${s.overflow}px`);
   checks.push({slug,page:'list',width,images:s.images,broken:s.broken.length,overflow:s.overflow});
  }
  await page.setViewportSize({width:390,height:900});
  // 상세 주소는 slug가 있는 카드에만 생깁니다(lib/ab/post-routes.ts getAllABPostParams). slug가 없는 카드는 목록에서 모달로 엽니다(검토 P1-2).
  for(const p of posts.filter(p=>p.slug)){
   const what=`${slug}/${p.slug}`;
   if(!await visit(page,`${base}/ab/${slug}/${p.slug}/`,what))continue;
   const s=await settle(page);
   const ko=await readLang(page,'한국어'),en=await readLang(page,'ENGLISH');
   ok(ko.body.length>0&&!ko.fallback,`${what}: 한국어 본문 없음${ko.fallback?'(대체 문구)':''}`);
   if(!en.body.length||en.fallback)warnings.push(`${what}: 영어 본문 없음${en.fallback?'(대체 문구)':''}`);
   ok(!forbidden.test(ko.article)&&!forbidden.test(en.article),`${what}: 내부 문구 노출`);
   ok(s.broken.length===0,`${what}: 깨진 이미지 ${s.broken.join(', ')}`);
   ok(s.overflow<=1,`${what}: 390px 가로 넘침 ${s.overflow}px`);
   checks.push({slug,page:p.slug,ko:ko.body.length,en:en.body.length,enFallback:en.fallback,images:s.images,broken:s.broken.length,overflow:s.overflow});
  }
  const date=ed.dateSlug??ed.announceDate;
  if(date){
   await visit(page,`${base}/ab/${date}/`,`${slug} 날짜 주소 /ab/${date}/`);
   if(await visit(page,`${base}/ab/`,'/ab/ 목록'))ok(await page.locator(`a[href="/ab/${date}/"]`).count()>0,`/ab/ 목록에 ${slug}의 날짜 링크 /ab/${date}/ 없음`);
   checks.push({slug,dateSlug:date});
  }
  await context.close();
 }
 ok(errors.length===0,`페이지 오류 ${errors.slice(0,3).join(' | ')}`);
 ok(badImages.length===0,`이미지 응답 실패 ${[...new Set(badImages)].slice(0,5).join(' | ')}`);
}finally{await browser.close();}

const status=fails.length?'FAIL':'PASS';
fs.writeFileSync(output,JSON.stringify({status,base,editions:slugs,checkedAt:new Date().toISOString(),checks,warnings,errors,ignoredErrors,badImages:[...new Set(badImages)],fails},null,2)+'\n');
if(warnings.length)console.warn(`WARN[ab-edition-ui] ${warnings.length}건\n  ${warnings.slice(0,10).join('\n  ')}`);
if(fails.length){
 console.error(`FAIL[ab-edition-ui] ${label} ${slugs.join(',')}: ${fails.length}건\n  ${fails.slice(0,20).join('\n  ')}`);
 process.exit(1);
}
console.log(`PASS[ab-edition-ui] ${label} ${slugs.join(',')}: 목록 4폭·상세 ${checks.filter(c=>c.ko!==undefined).length}개·날짜 주소 확인 → ${output}`);
