// Metadata-only: preserve encoded image pixels and add their origin and prompts.
const fs = require('node:fs');
const path = require('node:path');
let sharp;
try { sharp = require('sharp'); } catch { sharp = require('C:/Users/filip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp'); }
const provenance = fs.readFileSync('docs/ASSETS.md', 'utf8');
function chunk(name,data){const n=Buffer.alloc(8);n.write(name);n.writeUInt32LE(data.length,4);return Buffer.concat([n,data,...(data.length%2?[Buffer.alloc(1)]:[])]);}
function crc(b){let c=0xffffffff;for(const byte of b){c^=byte;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0;}
async function embed(file){
 const bytes=fs.readFileSync(file),description=`Asset: ${file}\n${provenance}`;
 if(file.endsWith('.webp')){
  const meta=await sharp(bytes).metadata();const chunks=[];let found=false;
  for(let p=12;p+8<=bytes.length;){const name=bytes.toString('ascii',p,p+4),n=bytes.readUInt32LE(p+4);let data=Buffer.from(bytes.subarray(p+8,p+8+n));if(name==='VP8X'){data[0]|=4;found=true}if(name!=='XMP ')chunks.push(chunk(name,data));p+=8+n+(n%2)}
  if(!found){const x=Buffer.alloc(10);x[0]=4|(meta.hasAlpha?16:0);x.writeUIntLE(meta.width-1,4,3);x.writeUIntLE(meta.height-1,7,3);chunks.unshift(chunk('VP8X',x))}
  const xml=`<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:description><rdf:Alt><rdf:li xml:lang="x-default"><![CDATA[${description.replaceAll(']]>','] ]>')}]]></rdf:li></rdf:Alt></dc:description></rdf:Description></rdf:RDF></x:xmpmeta>`;
  chunks.push(chunk('XMP ',Buffer.from(xml)));const payload=Buffer.concat([Buffer.from('WEBP'),...chunks]),header=Buffer.alloc(8);header.write('RIFF');header.writeUInt32LE(payload.length,4);fs.writeFileSync(file,Buffer.concat([header,payload]));
 }else if(file.endsWith('.png')){
  const chunks=[bytes.subarray(0,8)];for(let p=8;p<bytes.length;){const n=bytes.readUInt32BE(p),name=bytes.toString('ascii',p+4,p+8),full=bytes.subarray(p,p+n+12);if(name==='IEND'){const data=Buffer.from('Description\0'+description);const block=Buffer.concat([Buffer.from('tEXt'),data]);const size=Buffer.alloc(4),checksum=Buffer.alloc(4);size.writeUInt32BE(data.length);checksum.writeUInt32BE(crc(block));chunks.push(Buffer.concat([size,block,checksum]))}if(!(name==='tEXt'&&bytes.toString('utf8',p+8,p+20).startsWith('Description\0')))chunks.push(full);p+=n+12}fs.writeFileSync(file,Buffer.concat(chunks));
 }
 await sharp(file).metadata();
}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]).filter(f=>/\.(png|webp)$/.test(f));}
(async()=>{const assets=[...files('public/forme'),...files('public/apex')];for(const file of assets)await embed(file);console.log(`Embedded provenance and verified headers for ${assets.length} assets.`)})().catch(e=>{console.error(e);process.exit(1)});
