class ZenkakuAlpha {
  static isZen(c) {
    if (c == null || c == "") {
      return false;
    }
    const n = c.codePointAt();
    return n >= 65281 && n <= 65374 || n == 12288; // include zen space
  }
  static isHan(c) {
    if (c == null || c == "") {
      return false;
    }
    const n = c.codePointAt();
    return n >= 32 && n <= 126; // include han space
  }
  static _convert(s, from, to) {
    if (s == null) {
      return s;
    }
    const res = [];
    for (const c of s) {
      const n = from.indexOf(c)
      if (n >= 0) {
        res.push(to[n]);
      } else {
        res.push(c);
      }
    }
    return res.join("");
  }
  static toHan(s) {
    if (s == null) {
      return s;
    }
    const res = [];
    for (const c of s) {
      const n = c.codePointAt(0);
      if (n >= 65281 && n <= 65374) {
        res.push(String.fromCodePoint(n - 65248));
      } else if (n == 12288) {
        res.push(" ");
      } else {
        res.push(c);
      }
    }
    return res.join("");
  }
  static toZen(s) {
    if (s == null) {
      return s;
    }
    const res = [];
    for (const c of s) {
      const n = c.codePointAt(0);
      if (n >= 33 && n <= 126) {
        res.push(String.fromCodePoint(n + 65248));
      } else if (n == 32) {
        res.push("　");
      } else {
        res.push(c);
      }
    }
    return res.join("");
  }
}

export { ZenkakuAlpha };
