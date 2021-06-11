import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "./Moji.js";

let data;

const init = async () => {
  data = CSV.toJSON(await CSV.fetch("./data/moji.csv"));
};
const search = (s) => {
  if (!s) {
    return [];
  } else if (parseInt(s) == s) {
    return data.filter(d => d.mj == s);
  } else if (s.startsWith("MJ") && s.length == 8) {
    const mj = parseInt(s.substring(2), 10);
    return data.filter(d => d.mj == mj);
  }
  return data.filter(d => d.kanji.indexOf(s) >= 0 || d.yomi.indexOf(s) >= 0 || d.shrink.indexOf(s) >= 0);
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
