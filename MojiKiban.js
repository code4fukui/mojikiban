import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "./Moji.js";
import gsplit from 'https://taisukef.github.io/GraphemeSplitter/GraphemeSplitterJS/StringSplitter.Grapheme.mjs'

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

const shrink = (s) => {
  const res = [];
  const map = {};
  const kanji = {};
  data.forEach(d => {
    if (d.shrink) {
      map[d.kanji] = gsplit.split(d.shrink);
    }
    kanji[d.kanji] = 1;
  });
  const ss = gsplit.split(s);
  for (const c of ss) {
    if (!kanji[c]) {
      if (c.length != 1) {
        throw new Error(s + ": " + c + " is simple kani");
      }
      res.push(c);
    } else {
      const sh = map[c];
      if (sh) {
        let n = null;
        for (let i = 0; i < sh.length; i++) {
          if (sh[i].length == 1) {
            n = sh[i];
            break;
          }
        }
        if (n) {
          res.push(n);
        } else {
          res.push("＿");
        }
      } else {
        if (c.length == 1) {
          throw new Error(c + " is simple kanji");
        }
        res.push("＿");
      }
    }
  }
  return res.join("");
};

const MojiKiban = {
  init,
  search,
  getImageLink,
  getLink,
  getData,
  shrink,
};
export { MojiKiban };
