// Turns the lesson source files into backend/app/seed/content.json, which the backend loads on start-up.
// Usage: node content-source/scripts/export.js
const fs = require("fs");
const path = require("path");
const { build } = require("./build");

const OUT_FILE = path.join(__dirname, "..", "..", "backend", "app", "seed", "content.json");
const {R,P1,P2,OUT,LESSONS,EXT} = require(build());

// Courses (phases) and the sections (categories) inside each, in display order.
const FULL=P1.concat(P2);const FULL_IDS=new Set(FULL.map(t=>t.id));
const PH=[[1,"Foundations",["How Software Works","AI Fundamentals"]],[2,"Build with AI",["AI Builder Toolkit","Model APIs & Models"]],[3,"Agents",["Agents, MCP & Automation"]],[4,"Ship safely",["AI Quality & Evaluation","LLMOps, Security & Responsible AI","DevOps, Cloud & Delivery","System Design & Architecture","Mobile Ecosystem"]],[5,"PM practice",["AI-Enabled PM Craft","Communication & Leadership"]],[6,"Prove it",["Capstone Projects","Career & Brand"]],[7,"Code to Live",["Web: Code to Live","Mobile: Code to Store","Jargon & Test Prep"]]];
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const phases=PH.map(p=>({number:p[0],name:p[1]}));
const categories=[];let co=0;PH.forEach(p=>p[2].forEach(c=>categories.push({slug:slug(c),name:c,phase:p[0],order:co++})));
const cs=Object.fromEntries(categories.map(c=>[c.name,c.slug]));
const topics=[];let o=0;
FULL.forEach(t=>topics.push({id:t.id,category:cs[t.cat],title:t.t,depth:t.d,priority:t.p,kind:t.n,hours:t.h,order:o++,status:"full",summary:t.what,why:t.why,concepts:t.concepts,resources:t.learn,do_it:t.doIt,prove:t.prove,interview:t.interview,covers:t.covers}));
OUT.filter(a=>!FULL_IDS.has(a[0])).forEach(a=>topics.push({id:a[0],category:cs[a[1]],title:a[2],depth:a[3],priority:a[4],kind:a[5],hours:a[6],order:o++,status:"outline",summary:"",why:"",concepts:[],resources:[],do_it:"",prove:"",interview:"",covers:a[7]}));
topics.sort((a,b)=>categories.findIndex(c=>c.slug===a.category)-categories.findIndex(c=>c.slug===b.category)||a.order-b.order).forEach((t,i)=>t.order=i);
const strip=h=>h.replace(/^\d+\.\s*/,'');
const lessons={};Object.entries(LESSONS).forEach(([k,L])=>{const secs=L.sections.map(s=>{const n=Object.assign({},s);n.h=strip(s.h);return n});const X=EXT[k];if(X){const gi=secs.findIndex(s=>s.gloss);secs.splice(gi<0?secs.length:gi,0,{h:"In real projects",p:X.prac},{h:"Common misconceptions",mis:X.mis});}lessons[k]={sections:secs,quiz:L.quiz,deeper:L.deeper};});
const resources=Object.entries(R).map(([k,v])=>({key:k,title:v[0],url:v[1],kind:v[2]}));
fs.writeFileSync(OUT_FILE,JSON.stringify({version:1,phases,categories,resources,topics,lessons},null,1));
console.log("Wrote", OUT_FILE, "-", phases.length, "phases,", topics.length, "topics,", Object.keys(lessons).length, "lessons");
