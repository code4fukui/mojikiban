import { Moji } from "./Moji.js";

export const loadShrinkMap = async () => {
  const data = JSON.parse(await Deno.readTextFile("data/MJShrinkMap.1.2.0.json"));
  //console.log(data.content.length);
  //console.log(data.content[0]);
  const map = data.content.map(d => {
    const set = new Set();
    let mj = null;
    for (const n in d) {
      if (n == "MJ文字図形名") {
        mj = d[n];
      } else if (n == "参考情報") {
      } else {
        for (const d2 of d[n]) {
          const ucs = d2.UCS;
          if (!ucs) {
            console.log(n, d);
            throw new Error(d);
          }
          set.add(Moji.ucs2s(ucs.substring(2)));
        }
      }
    }
    return {
      MJ: parseInt(mj.substring(2), 10),
      UCS: Array.from(set.values()).join(""),
    }
  });
  //console.log(map);
  //console.log(map.filter(d => !d.MJ || !d.UCS).length);
  //console.log(map.filter(d => d.UCS == "＿").length);
  const map2 = map.filter(d => d.UCS);
  //console.log(map2.length);
  const res = [];
  map2.forEach(d => res[d.MJ] = d.UCS);
  return res;
};

