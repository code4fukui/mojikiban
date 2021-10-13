import { Str } from "./Str.js";
import { JISX0213_CODE } from "./JISX0213_CODE.js";
import { HankakuKana } from "./HankakuKana.js";

const isValid = (s) => {
  if (typeof s != Str) {
    s = new Str(s);
  }
  for (const c of s) {
    if (c.length == 1) {
      const n = c.codePointAt(0);
      if (n >= 0 && n <= 0x20 || n >= 0x7f && n <= 0x9f) { // space, delete, c0, c1 are valid (X0213_001.pdf)
        continue;
      }
    } else if (c == "\r\n") { // \r\n as 1 character
      continue;
    }
    if (JISX0213_CODE.indexOf(c) < 0) {
      return false;
    }
  }
  return true;
};
const validate = (s) => { // ret errors
  if (typeof s != Str) {
    s = new Str(s);
  }
  const res = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c.length == 1) {
      const n = c.codePointAt(0);
      if (n >= 0 && n <= 0x20 || n >= 0x7f && n <= 0x9f) { // space, delete, c0, c1 are valid (X0213_001.pdf)
        continue;
      }
    } else if (c == "\r\n") { // \r\n as 1 character
      continue;
    }
    if (JISX0213_CODE.indexOf(c) < 0) {
      res.push(i); // "char index: " + n + ", '" + c + "' is not in JIS X 0213");
    }
  }
  return res;
};
const shrink = (s) => {
  if (typeof s != Str) {
    s = new Str(s);
  }
  const s2 = [];
  for (const c of s) {
    if (c.length == 1) {
      const n = c.codePointAt(0);
      if (n >= 65281 && n <= 65374) { // from ! to ~
        s2.push(String.fromCodePoint(n - 65345 + 97));
      } else if (HankakuKana.isHan(c)) {
        s2.push(HankakuKana.toZen(c));
      } else {
        // todo shrink other not jis x 0213
        s2.push(c);
      }
    } else if (c.length == 2) {
      if (HankakuKana.isHan(c)) {
        s2.push(HankakuKana.toZen(c));
      } else {
        // todo shrink
        s2.push(c);
      }
    } else {
      // todo shrink
      s2.push(c);
    }
  }
  return s2.join("");
};

const JISX0213 = {
  isValid,
  validate,
  shrink,
};
export { JISX0213 };
