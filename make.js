import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "./Moji.js";
import { loadShrinkMap } from "./make_shrink.js";
import { loadShrinkMapUnique } from "./make_shrinkunique.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import gsplit from 'https://taisukef.github.io/GraphemeSplitter/GraphemeSplitterJS/StringSplitter.Grapheme.mjs'

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
      //throw new Error("long char included")
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
Deno.exit(0);
/*
console.log("chk")
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
      console.log("long char included", m, s, s.length);
      //throw new Error("long char included")
    }
    const n = m.indexOf(smapu[i]);
    if (n > 0) {
      console.log("************", n)
    }
    smapun[i] = n;
    console.log("idx", n);
    const ns = [smapu[i]];
    for (let i = 0; i < m.length; i++) {
      if (i != n) {
        ns.push(m[i]);
      }
    }
    smap[i] = ns.join("");
  } else {
    smapun[i] = 0;
    //console.log(smap[i], smapu[i]);
  }
}
*/


const data = CSV.toJSON(await CSV.fetch("./data/mji.csv"));
let ndup = 0;
let nnoucs = 0;
const data2 = data.map(d => {
  const mj = parseInt(d.MJ文字図形名.substring(2), 10);
  const ucs = d.実装したMoji_JohoコレクションIVS || d.実装したUCS.substring(2);
  const kanji = d.漢字施策; // 人名用漢字, 常用漢字, "" - 3種類
  if (kanji != "人名用漢字" && kanji != "常用漢字" && kanji != "") {
    //console.log(mj, kanji);
  }
  /*
  const compati = d.対応する互換漢字;
  if (compati) {
    console.log(mj, compati, mj, ucs, Moji.ucs2s(ucs), Moji.ucs2s(compati.substring(2)));
  }
  */
  if (!ucs) {
    ndup++;
  }
  if (!ucs) {
    console.log(mj);
    nnoucs++;
    return null;
  }
  console.log(ucs);
  return {
    mj,
    //ucs,
    kanji: Moji.ucs2s(ucs),
    lines: parseInt(d["総画数(参考)"]),
    yomi: d["読み(参考)"],
    shrink: smap[mj],
  };
}).filter(d => d);
console.log("duplicated", ndup);
console.log("no ucs", nnoucs);

//console.log(data2, data2.length);
await Deno.writeTextFile("./data/moji.csv", CSV.stringify(data2));


console.log(ArrayUtil.max(data2, d => d.lines)); // { mj: 31023, kanji: "𠔻", lines: 64, yomi: "セイ", shrink: undefined }
console.log(ArrayUtil.max(data2, d => d.shrink?.length)); // { mj: 31023, kanji: "𠔻", lines: 64, yomi: "セイ", shrink: undefined }

/*
const data3 = data2.filter(d => d.ucs.indexOf("_") >= 0);
//console.log(data3, data3.length);
await Deno.writeTextFile("./data/moji_ivs.csv", CSV.stringify(data3));
*/