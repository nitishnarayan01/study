// Combines the lesson source files into one data bundle.
// Outputs (both ignored by Git): dist/dashboard.html (single-page dashboard) and dist/all_data.js (used by check and export).
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

// Order matters: later files build on earlier ones.
const FILES = ['data_p1.js','data_p2.js','data_p2b.js','data_rest.js','lessons.js','lessons_hsw_a.js','lessons_hsw_b.js','lessons_aif.js','lessons_abt_a.js','lessons_abt_b.js','lessons_mam_a.js','lessons_mam_b.js','ext_hsw.js','ext_aif.js','ext_abt.js','ext_mam.js','phase3a.js','phase3b.js','phase4_evl.js','phase4_ops.js','phase4_dev.js','phase4_sys_mob.js','phase5.js','phase6.js','deepen_core.js','deep_pmc_a.js','deep_pmc_b.js','deep_com.js','deep_cap_car.js','phase7_web_a.js','phase7_web_b.js','phase7_mob.js','phase7_test.js'];

function build() {
  const data = FILES.map((f) => fs.readFileSync(path.join(SRC, f), "utf8")).join("\n");
  fs.mkdirSync(DIST, { recursive: true });
  const html = fs.readFileSync(path.join(ROOT, "app.html"), "utf8").replace("/*__DATA__*/", () => data);
  fs.writeFileSync(path.join(DIST, "dashboard.html"), html);
  const bundle = path.join(DIST, "all_data.js");
  fs.writeFileSync(bundle, data + ";module.exports={R,P1,P2,OUT,LESSONS,EXT}");
  return bundle;
}

module.exports = { build, FILES };
if (require.main === module) console.log("Built", build());
