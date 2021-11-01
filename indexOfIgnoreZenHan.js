import { HankakuKana } from "./HankakuKana.js";
import { ZenkakuAlpha } from "./ZenkakuAlpha.js";

const normalizeZenHan = (s) => {
  return HankakuKana.toZen(ZenkakuAlpha.toHan(s));
};
export const indexOfIgnoreZenHan = (s1, s2) => {
  if (s1 == s2) {
    return true;
  }
  if (!s1 || !s2) {
    return false;
  }
  if (typeof s1 != "string") {
    s1 = s1.toString();
  }
  if (typeof s2 != "string") {
    s2 = s2.toString();
  }
  s1 = normalizeZenHan(s1);
  s2 = normalizeZenHan(s2);
  return s1.indexOf(s2);
};
