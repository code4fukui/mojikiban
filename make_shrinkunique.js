import { Moji } from "./Moji.js";

const data = JSON.parse(await Deno.readTextFile("data/MJSU.1.2.0.json"));
console.log(data.content.length);
console.log(data.content[0]);
const map = data.content.map(d => {
  return {
    MJ: d.MJ文字図形名,
    JIS: d.変換先["JIS X 0213"],
    UCS: Moji.ucs2s(d.変換先.UCS.substring(2)),
  }
});
console.log(map);
console.log(map.filter(d => !d.MJ || !d.JIS || !d.UCS).length);
console.log(map.filter(d => d.UCS == "＿").length);
/*
//console.log(data2, data2.length);
await Deno.writeTextFile("./data/moji.csv", CSV.stringify(data2));

const data3 = data2.filter(d => d.ucs.indexOf("_") >= 0);
//console.log(data3, data3.length);
await Deno.writeTextFile("./data/moji_ivs.csv", CSV.stringify(data3));
*/
