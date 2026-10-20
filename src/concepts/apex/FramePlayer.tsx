import { useEffect, useRef } from 'react';
export const frameUrl=(i:number,small=false)=>`/apex/frames/${small?'mobile':'desktop'}/frame_${String(i+1).padStart(3,'0')}.webp`;
export default function FramePlayer({progress}:{progress:{current:number}}){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const el=canvas.current!;const ctx=el.getContext('2d')!;const small=matchMedia('(max-width:720px)').matches;
  const images=new Map<number,HTMLImageElement>(),pending=new Set<number>(),failed=new Set<number>();let alive=true,visible=true,raf=0,target=0,current=0,last=0,painted=-1;
  const resize=()=>{const r=el.getBoundingClientRect();const dpr=Math.min(devicePixelRatio,2);el.width=Math.round(r.width*dpr);el.height=Math.round(r.height*dpr);painted=-1;start()};
  function load(i:number){if(!alive||images.has(i)||pending.has(i)||failed.has(i))return;pending.add(i);const img=new Image();img.decoding='async';img.onload=async()=>{try{await img.decode()}catch{}if(!alive)return;images.set(i,img);pending.delete(i);painted=-1;start();pump()};img.onerror=()=>{pending.delete(i);failed.add(i);pump()};img.src=frameUrl(i,small);}
  function pump(){if(!alive)return;const order=[target,0,159];for(let d=1;d<160;d++)order.push(target+d,target-d);for(const i of order){if(pending.size>=(small?4:6))break;if(i>=0&&i<160)load(i)}}
  function draw(index:number){let nearest=-1,distance=Infinity;for(const i of images.keys()){const d=Math.abs(i-index);if(d<distance){nearest=i;distance=d}}if(nearest<0||nearest===painted)return;const img=images.get(nearest)!;const scale=small?Math.min(el.width/img.width,el.height/img.height):Math.max(el.width/img.width,el.height/img.height);ctx.fillStyle='#0e0c11';ctx.fillRect(0,0,el.width,el.height);ctx.drawImage(img,(el.width-img.width*scale)/2,(el.height-img.height*scale)/2,img.width*scale,img.height*scale);painted=nearest;}
  function loop(time:number){raf=0;if(!alive||!visible)return;const dt=Math.min(64,time-(last||time));last=time;target=Math.round(progress.current*159);current+=(target-current)*(1-Math.pow(.82,dt/16.67));draw(Math.round(current));pump();raf=requestAnimationFrame(loop)}
  function start(){if(alive&&visible&&!raf)raf=requestAnimationFrame(loop)}
  const ro=new ResizeObserver(resize);ro.observe(el);const io=new IntersectionObserver(entries=>{for(const e of entries){visible=e.isIntersecting;if(visible){last=0;start()}else{cancelAnimationFrame(raf);raf=0}}});io.observe(el);load(0);resize();
  return()=>{alive=false;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();images.clear()};
 },[progress]);
 return <canvas ref={canvas} aria-hidden="true" className="apex-canvas"/>;
}
