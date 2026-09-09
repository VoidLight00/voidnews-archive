import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import vm from 'node:vm';
import ts from 'typescript';
const base=process.env.VOIDNEWS_TEST_URL??'http://127.0.0.1:3142';
const root=path.resolve(import.meta.dirname,'..');
const label=base.includes('127.0.0.1')?'local':'production';
const output=process.env.VOIDNEWS_SUPPLEMENT_TEST_OUTPUT??path.join(root,'_workspace/reader-supplements',new Date().toISOString().replace(/[:.]/g,'-'),`supplements-${label}.json`);
const run=path.dirname(output);fs.mkdirSync(run,{recursive:true});
const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,'lib/ab/editions/2026-09a.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports});
const edition=exports.edition2026_09a;
const posts=[...edition.highlights.map(x=>x.post),...edition.editorsPicks,...edition.modelWatch];
const checks=[],errors=[],browser=await chromium.launch();
const forbidden=/발표용 제안 시연|리허설|브리핑 작성 중|원영상과 모델 조건을 확인하는 중|unexecuted three-step|preparing this briefing/i;
try {
 const page=await browser.newPage({reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 for(const p of posts){
  await page.goto(base+`/ab/2026-09a/${p.slug}/`,{waitUntil:'networkidle'});
  for(const lang of ['ko','en']){
   await page.getByRole('tab',{name:lang==='ko'?'한국어':'ENGLISH',exact:true}).click();
   assert.doesNotMatch(await page.locator('article').innerText(),forbidden,p.slug+' '+lang);
  }
  checks.push({slug:p.slug,readerFirstBothLanguages:true});
 }
 for(const width of [1440,820,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const index of [0,3]){
   const p=edition.highlights[index].post;
   await page.goto(base+`/ab/2026-09a/${p.slug}/`,{waitUntil:'networkidle'});
   for(const lang of ['ko','en']){
    await page.getByRole('tab',{name:lang==='ko'?'한국어':'ENGLISH',exact:true}).click();
    const supplement=page.locator('[data-article-supplement]');
    assert.equal(await supplement.count(),1);
    assert.equal(await supplement.getAttribute('id'),p.supplement.id);
    await supplement.scrollIntoViewIfNeeded();
    if(index===0){
     assert.equal(await supplement.locator('tbody tr').count(),4);
     assert.equal(await supplement.locator('thead th').count(),4);
     assert.ok((await supplement.innerText()).includes(lang==='ko'?'특정 벤치마크':'particular benchmark'));
     assert.equal(await page.locator('code').filter({hasText:'features.context_management.experimental_mode = true'}).count(),1);
     const region=supplement.locator('[role="region"][tabindex="0"]');
     if(width<=390){assert.ok(await region.evaluate(e=>e.scrollWidth>e.clientWidth));await region.focus();await page.keyboard.press('End');}
    }else{
     const images=supplement.locator('figure img');assert.equal(await images.count(),8);
     for(const img of await images.all()){
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(i=>i.decode());
      assert.ok(await img.evaluate(i=>i.naturalWidth>0&&getComputedStyle(i).objectFit==='contain'));
     }
     assert.equal(await supplement.locator('a[href^="/ab/"]').count(),6);
     for(const c of p.supplement.cases)assert.ok((await supplement.innerText()).includes(c.model));
     assert.ok((await supplement.innerText()).includes(lang==='ko'?'개별 실행 기록':'Individual run records'));
     assert.ok((await supplement.innerText()).includes(lang==='ko'?'직접 해볼 요청 예시':'Suggested request to try'));
     // A representative result opens its exact original image in a new tab.
     if(width===1440&&lang==='ko'){
      const link=supplement.locator('figure a').nth(3),expected=await link.getAttribute('href');
      const [popup]=await Promise.all([page.waitForEvent('popup'),link.click()]);
      await popup.waitForLoadState();assert.equal(new URL(popup.url()).pathname,expected);await popup.close();
     }
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),p.slug+' fits '+width);
    if(lang==='en')assert.doesNotMatch(await supplement.innerText(),/[가-힣]/,'supplement is fully English');
    await supplement.scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(run,`${index===0?'comparison':'cases'}-${label}-${width}-${lang}.png`)});
    if(width===1440&&lang==='ko'&&index===3)await supplement.screenshot({path:path.join(run,`cases-${label}-all.png`)});
    checks.push({width,lang,slug:p.slug,overflow:false,supplement:true});
   }
  }
 }
 assert.deepEqual(errors,[]);
 const result={status:'PASS',base,checkedAt:new Date().toISOString(),checks,errors};
 fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
 console.log(`PASS ${label}: ${checks.length} reader, layout, language and image interaction checks`);
}finally{await browser.close();}
