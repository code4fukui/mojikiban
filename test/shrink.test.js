import { loadShrinkMap } from "../deno/make_shrink.js";
import { loadShrinkMapUnique } from "../deno/make_shrinkunique.js";
import gsplit from 'https://taisukef.github.io/GraphemeSplitter/GraphemeSplitterJS/StringSplitter.Grapheme.mjs'

Deno.test("shrink", async () => {
  const smap = await loadShrinkMap();
  console.log(Object.values(smap)); // 31278
  const smapu = await loadShrinkMapUnique();
  console.log(Object.values(smapu).length); // 27584

  //Deno.exit(0);
  for (let i = 0; i < smap.length; i++) {
    //console.log(smap[i], smapu[i]);
    if (!smap[i] && !smapu[i]) {
      continue;
    } else if (!smap[i] && smapu[i]) {
      console.log("x", smap[i], smapu[i]);
      throw new Error("x")
    } else if (smap[i] && !smapu[i]) {
      //console.log("?", smap[i], smapu[i]);
    } else if (smap[i][0] != smapu[i]) {
      const s = smap[i];
      const m = gsplit.split(s);
      if (m.length != s.length) {
        //console.log("long char included", m, s, s.length);
        //throw new Error("long char included"); // 長い文字は入っていてok
      }
      const n = m.indexOf(smapu[i]);
      if (n > 0) {
        //console.log("************", n)
      }
      //console.log("idx", n);
      const ns = [smapu[i]];
      for (let i = 0; i < m.length; i++) {
        if (i != n) {
          ns.push(m[i]);
        }
      }
      smap[i] = ns.join("");
      if (smap[i].indexOf("福") >= 0) {
        console.log(smap[i], smapu[i]);
      }
    } else {
      //console.log(smap[i], smapu[i]);
    }
  }
});
