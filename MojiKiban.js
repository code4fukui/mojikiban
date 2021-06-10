import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "./Moji.js";

let data;

const init = async () => {
  data = CSV.toJSON(await CSV.fetch("moji.csv"));
  data.forEach(d => {
    if (d.ucs) {
      d.c = Moji.ucs2s(d.ucs)
    } else {
      console.log(d);
      d.c = "";
    }
  });
};
const search = (s) => {
  return data.filter(d => d.c.indexOf(s) >= 0 || d.yomi.indexOf(s) >= 0);
};
const getImageLink = (d) => {
  return Moji.mj2imglink(d.mj);
}

const MojiKiban = {
  init,
  search,
  getImageLink,
};
export { MojiKiban };
