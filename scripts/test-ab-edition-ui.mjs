// AB 회차 화면 시험. 운영 검사(verify-site-release.mjs)의 한 항목입니다(사용자 결정 2026-11-01 "운영 검사에 최신 회차").
// 기본은 lib/ab/data.ts에 등록된 회차 가운데 slug가 가장 늦은 회차 하나를 엽니다. VOIDNEWS_AB_EDITIONS=2026-10a,2026-10b로 바꿀 수 있습니다.
// 확인: 목록 /ab/<회차>/ 200과 카드 제목 전부, 보이는 이미지 로드, 1440·820·390·320px 가로 넘침 없음,
//       상세 /ab/<회차>/<글>/ 200과 한국어·ENGLISH 본문, 내부 문구 없음, 날짜 주소 200과 /ab/ 목록의 날짜 링크, 페이지 오류 없음.
// 목록 카드는 링크가 아니라 role="button"이고 /ab/ 목록은 날짜 주소로 연결하므로, 카드 제목과 날짜 링크로 확인합니다.
// 카드 이미지는 실패하면 다음 후보나 대체 패널로 바뀌어 화면에 깨진 <img>가 남지 않으므로(media.tsx), 같은 사이트 이미지 응답의
// 4xx·5xx와 요청 실패도 기록합니다. 다른 사이트 이미지는 운영 판정을 흔들지 않도록 세지 않습니다.
// test-ab-supplements-ui.mjs는 2026-09a 보조 자료만, 빌드 게이트 check-ab-editions.mjs는 파일 존재만 봅니다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import {chromium} from 'playwright';

const base=process.env.VOIDNEWS_TEST_URL??'http://127.0.0.1:3142';
const root=path.resolve(import.meta.dirname,'..');
const label=base.includes('127.0.0.1')?'local':'production';
const output=process.env.VOIDNEWS_AB_EDITION_TEST_OUTPUT??path.join(root,'_workspace/ab-edition-ui',new Date().toISOString().replace(/[:.]/g,'-'),`ab-edition-${label}.json`);
fs.mkdirSync(path.dirname(output),{recursive:true});
const forbidden=/발표용 제안 시연|리허설|브리핑 작성 중|원영상과 모델 조건을 확인하는 중|unexecuted three-step|preparing this briefing/i;

const registered=[...fs.readFileSync(path.join(root,'lib/ab/data.ts'),'utf8').matchAll(/from\s+["']\.\/editions\/([^"']+)["']/g)].map(m=>m[1]);
const wanted=(process.env.VOIDNEWS_AB_EDITIONS||'').split(',').map(s=>s.trim()).filter(Boolean);
const slugs=wanted.length?wanted:[[...registered].sort().at(-1)];
const fails=[],checks=[],errors=[],badImages=[];
const origin=new URL(base).origin;
const ok=(cond,msg)=>{if(!cond)fails.push(msg);};

function load(slug){
 const exports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,`lib/ab/editions/${slug}.ts`),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports});
 return Object.values(exports).find(v=>v&&typeof v==='object'&&Array.isArray(v.highlights));
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
async function articleText(page,name){
 const tab=page.getByRole('tab',{name,exact:true});
 if(await tab.count())await tab.first().click();
 return page.locator('article').first().innerText().catch(()=>'');
}

const browser=await chromium.launch();
try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.request().resourceType()==='image'&&r.url().startsWith(origin)&&r.status()>=400)badImages.push(`${r.status()} ${r.url()}`);});
 // 다음 페이지로 넘어갈 때 취소된 요청(net::ERR_ABORTED)은 결함이 아닙니다. 없는 파일은 위의 404 응답으로 잡힙니다.
 page.on('requestfailed',r=>{const e=r.failure()?.errorText||'failed';if(r.resourceType()==='image'&&r.url().startsWith(origin)&&!/ERR_ABORTED/.test(e))badImages.push(`${e} ${r.url()}`);});
 for(const slug of slugs){
  if(!registered.includes(slug)){fails.push(`${slug}: lib/ab/data.ts에 등록되지 않은 회차`);continue;}
  const ed=load(slug);
  if(!ed){fails.push(`${slug}: 회차 데이터를 읽지 못함`);continue;}
  const posts=[...ed.highlights.map(h=>h.post),...(ed.modelWatch||[]),...(ed.editorsPicks||[])];
  for(const width of [1440,820,390,320]){
   await page.setViewportSize({width,height:900});
   const r=await page.goto(`${base}/ab/${slug}/`,{waitUntil:'networkidle'});
   ok(r?.status()===200,`${slug} 목록 ${width}px: HTTP ${r?.status()}`);
   const s=await settle(page);
   const text=await page.locator('body').innerText();
   for(const p of posts)ok(text.includes(p.title),`${slug} 목록 ${width}px: 카드 제목 없음 "${p.title}"`);
   ok(s.broken.length===0,`${slug} 목록 ${width}px: 깨진 이미지 ${s.broken.join(', ')}`);
   ok(s.overflow<=1,`${slug} 목록 ${width}px: 가로 넘침 ${s.overflow}px`);
   checks.push({slug,page:'list',width,images:s.images,broken:s.broken.length,overflow:s.overflow});
  }
  await page.setViewportSize({width:390,height:900});
  for(const p of posts){
   const r=await page.goto(`${base}/ab/${slug}/${p.slug}/`,{waitUntil:'networkidle'});
   ok(r?.status()===200,`${slug}/${p.slug}: HTTP ${r?.status()}`);
   const s=await settle(page);
   const ko=await articleText(page,'한국어'),en=await articleText(page,'ENGLISH');
   ok(ko.length>200&&en.length>200,`${slug}/${p.slug}: 본문 길이 한국어 ${ko.length}, 영어 ${en.length}`);
   ok(!forbidden.test(ko)&&!forbidden.test(en),`${slug}/${p.slug}: 내부 문구 노출`);
   ok(s.broken.length===0,`${slug}/${p.slug}: 깨진 이미지 ${s.broken.join(', ')}`);
   ok(s.overflow<=1,`${slug}/${p.slug}: 390px 가로 넘침 ${s.overflow}px`);
   checks.push({slug,page:p.slug,ko:ko.length,en:en.length,images:s.images,broken:s.broken.length,overflow:s.overflow});
  }
  const date=ed.dateSlug??ed.announceDate;
  if(date){
   const r=await page.goto(`${base}/ab/${date}/`,{waitUntil:'networkidle'});
   ok(r?.status()===200,`${slug} 날짜 주소 /ab/${date}/: HTTP ${r?.status()}`);
   await page.goto(`${base}/ab/`,{waitUntil:'networkidle'});
   ok(await page.locator(`a[href="/ab/${date}/"]`).count()>0,`/ab/ 목록에 ${slug}의 날짜 링크 /ab/${date}/ 없음`);
   checks.push({slug,dateSlug:date});
  }
 }
 ok(errors.length===0,`페이지 오류 ${errors.slice(0,3).join(' | ')}`);
 ok(badImages.length===0,`이미지 응답 실패 ${[...new Set(badImages)].slice(0,5).join(' | ')}`);
}finally{await browser.close();}

const status=fails.length?'FAIL':'PASS';
fs.writeFileSync(output,JSON.stringify({status,base,editions:slugs,checkedAt:new Date().toISOString(),checks,errors,badImages:[...new Set(badImages)],fails},null,2)+'\n');
if(fails.length){
 console.error(`FAIL[ab-edition-ui] ${label} ${slugs.join(',')}: ${fails.length}건\n  ${fails.slice(0,20).join('\n  ')}`);
 process.exit(1);
}
console.log(`PASS[ab-edition-ui] ${label} ${slugs.join(',')}: 목록 4폭·상세 ${checks.filter(c=>c.ko!==undefined).length}개·날짜 주소 확인 → ${output}`);
