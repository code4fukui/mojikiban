import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "./Moji.js";

let data;

const init = async () => {
  data = CSV.toJSON(await CSV.fetch("./data/moji.csv"));
  data.forEach(d => {
    if (d.ucs) {
      d.c = Moji.ucs2s(d.ucs)
    } else {
      //console.log(d);
      d.c = "";
    }
  });
};
const search = (s) => {
  return data.filter(d => d.c.indexOf(s) >= 0 || d.yomi.indexOf(s) >= 0);
};
const getImageLink = (d) => {
  const path = Moji.mj2mjcode(Math.floor(d.mj / 1000) * 1000);
  return Moji.mj2imglink(d.mj, "./mj/" + path + "/");
};
const getLink = (d) => {
  return "https://moji.or.jp/mojikibansearch/info?MJ%E6%96%87%E5%AD%97%E5%9B%B3%E5%BD%A2%E5%90%8D=" + Moji.mj2mjcode(d.mj);
};
const getData = () => data;

const MojiKiban = {
  init,
  search,
  getImageLink,
  getLink,
  getData,
};
export { MojiKiban };
