class ZenkakuAlpha {
  static isZen(c) {
    if (c == null || c == "") {
      return false;
    }
    if (`”“‘’`.indexOf(c) >= 0) {
      return true;
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
  static lengthHan = (s) => {
    let n = 0;
    for (const c of s) {
      if (ZenkakuAlpha.isHan(c)) {
        n++;
      } else {
        n += 2;
      }
    }
    return n;
  }
  static substringHan(s, start, end) {
    const res = [];
    let n = 0;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      const len = ZenkakuAlpha.isHan(c) ? 1 : 2;
      if (n >= start) {
        res.push(c);
      }
      n += len;
      if (n >= end) {
        break;
      }
    }
    return res.join("");
  };
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
      if (`”“`.indexOf(c) >= 0) {
        res.push(`"`);
      } else if (`‘’`.indexOf(c) >= 0) {
        res.push(`'`);
      } else {
        const n = c.codePointAt(0);
        if (n >= 65281 && n <= 65374) {
          res.push(String.fromCodePoint(n - 65248));
        } else if (n == 12288) {
          res.push(" ");
        } else {
          res.push(c);
        }
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
  static toZens(s) {
    if (s == null) {
      return [];
    }
    if (s == '"') return ['＂', '＂', '”', '“'];
    if (s == "'") return ['＇', '＇', "'", "'"];
    return [ZenkakuAlpha.toZen(s)];
  }
}

export { ZenkakuAlpha };
