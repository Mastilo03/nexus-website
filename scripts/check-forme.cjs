const { chromium } = require('C:/Users/filip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/work/forme',{waitUntil:'networkidle'});
 await page.locator('canvas').waitFor();await page.waitForTimeout(1500);
 fs.mkdirSync('.impeccable/review',{recursive:true});fs.mkdirSync('public/forme',{recursive:true});
 await page.screenshot({path:'.impeccable/review/forme-hero-desktop.png'});
 const png=await page.locator('canvas').evaluate(el=>el.toDataURL('image/png').split(',')[1]);
 fs.writeFileSync('public/forme/axonometric.png',Buffer.from(png,'base64'));
 for(const [name,p] of [['assembled',.46],['sun',.64],['plan',1],['reverse',.05]]){
 await page.evaluate(p=>{const el=document.querySelector('.forme-assembly');window.scrollTo(0,el.offsetTop+(el.offsetHeight-innerHeight)*p)},p);await page.waitForTimeout(1200);await page.screenshot({path:`.impeccable/review/forme-${name}.png`});}
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:5173/work/forme',{waitUntil:'networkidle'});await page.screenshot({path:'.impeccable/review/forme-hero-mobile.png',fullPage:true});
 console.log(JSON.stringify({errors,mobileOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));await browser.close();
})();
