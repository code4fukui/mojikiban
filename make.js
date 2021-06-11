import { CSV } from "https://js.sabae.cc/CSV.js";

const data = CSV.toJSON(await CSV.fetch("./data/mji.csv"));
const data2 = data.map(d => {
  return {
    mj: parseInt(d.MJ文字図形名.substring(2), 10),
    ucs: d.実装したMoji_JohoコレクションIVS || d.実装したUCS.substring(2),
    lines: d["総画数(参考)"],
    yomi: d["読み(参考)"],
  };
});
console.log(data2, data2.length);
await Deno.writeTextFile("./data/moji.csv", CSV.stringify(data2));

const data3 = data2.filter(d => d.ucs.indexOf("_") >= 0);
console.log(data3, data3.length);
await Deno.writeTextFile("./data/moji_ivs.csv", CSV.stringify(data3));
