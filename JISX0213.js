import { Str } from "./Str.js";
import { JISX0213_CODE } from "./JISX0213_CODE.js";

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
  let n = 0;
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
      res.push(n); // "char index: " + n + ", '" + c + "' is not in JIS X 0213");
    }
    n++;
  }
  return res;
};

const JISX0213 = {
  isValid,
  validate,
};
export { JISX0213 };
