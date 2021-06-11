import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "./Moji.js";
import { loadShrinkMap } from "./make_shrink.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const smap = await loadShrinkMap();
console.log(smap);

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