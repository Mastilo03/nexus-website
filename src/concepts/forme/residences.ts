export type Residence={id:string;floor:number;name:string;area:number;bedrooms:number;orientation:string;price:number;plan:'one'|'two'|'penthouse'};
// Fictional inventory. All areas and prices are sample values, not an offer.
export const residences:Residence[]=[
 {id:'G01',floor:0,name:'Garden one',area:72,bedrooms:1,orientation:'East',price:485000,plan:'one'},
 {id:'G02',floor:0,name:'Garden two',area:94,bedrooms:2,orientation:'West',price:640000,plan:'two'},
 ...[1,2,3,4,5].flatMap(f=>[0,1,2].map((n):Residence=>({id:`${f}0${n+1}`,floor:f,name:`Residence ${f}0${n+1}`,area:n===0?68+f*2:88+f*3+n*5,bedrooms:n===0?1:2,orientation:['East','South','West'][n],price:480000+f*40000+n*95000,plan:n===0?'one':'two'}))),
 {id:'P01',floor:6,name:'The penthouse',area:145,bedrooms:3,orientation:'South and west',price:1480000,plan:'penthouse'}
];
export const samplePrice=(value:number)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
