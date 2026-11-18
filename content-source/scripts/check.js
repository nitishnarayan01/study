// Checks the lesson source files: duplicate ids, missing fields, unknown resource keys, missing lessons.
// Usage: node content-source/scripts/check.js [id-prefix]     e.g. "wl" to check only the web topics
const { build } = require("./build");
const {R,P1,P2,LESSONS,EXT} = require(build());
const pre = process.argv[2] || "";
const bad = []; const ids = new Set();
P1.concat(P2).forEach(t => { if (ids.has(t.id)) bad.push("duplicate id " + t.id); ids.add(t.id); });
P2.filter(t => t.id.startsWith(pre)).forEach(t => {
  (t.learn || []).forEach(k => R[k] || bad.push(t.id + ": unknown resource " + k));
  ["what","why","doIt","prove","interview"].forEach(f => t[f] || bad.push(t.id + ": missing " + f));
  const L = LESSONS[t.id];
  if (!L) bad.push(t.id + ": no lesson");
  else {
    L.deeper.forEach(k => R[k] || bad.push(t.id + ": unknown resource " + k));
    L.sections.forEach(s => s.h || bad.push(t.id + ": section without heading"));
  }
  if (!EXT[t.id]) bad.push(t.id + ": no practice/misconceptions");
});
const wc = o => typeof o === "string" ? o.split(/\s+/).filter(Boolean).length : Array.isArray(o) ? o.reduce((a,x) => a + wc(x), 0) : (o && typeof o === "object") ? Object.values(o).reduce((a,x) => a + wc(x), 0) : 0;
const w = P2.filter(t => t.id.startsWith(pre)).map(t => wc(LESSONS[t.id]) + wc(EXT[t.id]));
console.log(bad.length ? "Problems:\n  " + bad.join("\n  ") : "No problems found.");
console.log(`Topics checked: ${w.length}, words per lesson: min ${Math.min(...w)}, avg ${Math.round(w.reduce((a,b) => a + b, 0) / w.length)}. Total topics: ${P1.length + P2.length}`);
process.exitCode = bad.length ? 1 : 0;
