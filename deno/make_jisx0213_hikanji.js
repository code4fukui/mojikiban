import { Moji } from "../Moji.js";
import { Str } from "../Str.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const url = "https://code4fukui.github.io/CharacterInformation/1/sample/JISX0213_非漢字.txt";
const hikanji0 = new Str(await (await fetch(url)).text());

const fn = "../data/jisx0213_hikanji_wikipedia.txt";
const ss = (await Deno.readTextFile(fn)).split("\n");
let nline = 0;
let nreserved = 0;
let hikanji = [];
for (const line of ss) {
  if (!line.startsWith("|style=")) {
    continue;
  }
  let n = line.indexOf("U+");
  if (n < 0) {
    throw new Error(line);
  }
  const s = line.substring(n);
  const s2 = s.split("||");
  const s3 = Moji.ucs2s(s2[0]);
  hikanji.push(s3);
  console.log(s3, s); // c[3], c.length, line);
  nline++;
}
console.log(nline, nreserved); // nline 1183
console.log(hikanji.join(""), hikanji.length);

// unique check
console.log("hikanji unique: ", ArrayUtil.isUnique(hikanji));
console.log("hikanji0 unique: ", ArrayUtil.isUnique(hikanji0));

console.log(hikanji0.length); // 1153
let nnotinc = 0;
for (const c of hikanji) {
  const n = hikanji0.indexOf(c);
  if (n < 0) {
    console.log(c);
    nnotinc++;
  }
}
console.log(nnotinc, hikanji.length - hikanji0.length);

hikanji.sort((a, b) => {
  return a.codePointAt(0) - b.codePointAt(0);
});
const s2ucs = (s) => {
  if (s.length == 1) {
    return "U+" + s.codePointAt(0).toString(16).toUpperCase();
  } else if (s.length == 2) {
    return "U+" + s.codePointAt(0).toString(16).toUpperCase() + "+" + s.codePointAt(1).toString(16).toUpperCase();
  } else {
    throw new Error("can't convert");
  }
};

const url2 = "https://code4fukui.github.io/CharacterInformation/1/CharacterInformation.txt";
const cinfo1 = (await (await fetch(url2)).text()).split("\n");
const cinfo = cinfo1.map(c => c.split(","));

console.log("hikanji but not cinfo");
const sh = [];
for (const c of hikanji) {
  const s = s2ucs(c);
  const ci = cinfo.find(c => c[0] == s);
  if (!ci) {
    console.log(c, s2ucs(c) + ",5");
    sh.push(s2ucs(c) + ",5");
  }
}

console.log("cinfo but not hikanji");
for (const c of cinfo) {
  if (c[1] != 5) {
    continue;
  }
  const ci = hikanji.find(h => Moji.ucs2s(c[0]) == h);
  if (!ci) {
    console.log(c[0], Moji.ucs2s(c[0]));
  }
}
/*
hikanji wikipedia but not cinfo
ɑ̀ U+251+300,5
ɑ́ U+251+301,5
ɛ̀ U+25B+300,5
ɛ́ U+25B+301,5
cinfo but not hikanji wikipedia <- 1f70-1f73が正しい
U+1F70 ὰ
U+1F71 ά
U+1F72 ὲ
U+1F73 έ
*/