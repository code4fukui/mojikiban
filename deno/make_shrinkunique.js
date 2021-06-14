import { Moji } from "../Moji.js";

export const loadShrinkMapUnique = async () => {
  const data = JSON.parse(await Deno.readTextFile("../data/MJSU.1.2.0.json"));
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
  console.log("longchar", map.filter(d => d.UCS.length > 1).length);

  const res = [];
  map.filter(d => d.UCS != "＿").forEach(d => res[parseInt(d.MJ.substring(2), 10)] = d.UCS);
  return res;
};
