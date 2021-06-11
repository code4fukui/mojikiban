import { fix0 } from "https://js.sabae.cc/fix0.js";

const mj2mjcode = (mj) => {
  return typeof mj == "string" && mj.startsWith("MJ") ? mj : "MJ" + fix0(mj, 6);
};

const mj2imglink = (mj, base = "https://moji.or.jp/mojikibansearch/img/MJ/", ext = ".png") => {
  return base + mj2mjcode(mj) + ext;
};

const ucs2s = (ucs) => {
  const n = ucs.indexOf("_");
  if (n < 0) {
    return String.fromCodePoint(parseInt(ucs, 16));
  }
  const base = parseInt(ucs.substring(0, n), 16);
  const e = parseInt(ucs.substring(n + 1), 16);
  return String.fromCodePoint(base, e);
};

const Moji = {
  mj2mjcode,
  mj2imglink,
  ucs2s,
};

export { Moji };
