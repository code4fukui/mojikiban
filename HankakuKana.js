const hankana1 = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮｰﾞﾟ｡､｢｣";
const hankana2 = "ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞ";
const zenkana1 = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョー゛゜。、「」";
const zenkana2 = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴ";

class HankakuKana {
  static isHan(c) {
    if (c == null || c == "") {
      return false;
    }
    return hankana1.indexOf(c) >= 0 || hankana2.indexOf(c) >= 0;
  }
  static getHanLength(s) {
    if (s == null || s == "") {
      return 0;
    }
    const n = hankana2.indexOf(s.substring(0, 2));
    if (n >= 0) {
      return 2;
    }
    const m = hankana1.indexOf(s[0]);
    if (m >= 0) {
      return 1;
    }
    return 0;
  }
  static toZen(s) {
    const res = [];
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      const n = hankana2.indexOf(c + s[i + 1]);
      if (n >= 0) {
        res.push(zenkana2[n / 2]);
        i++;
        continue;
      }
      const m = hankana1.indexOf(c);
      if (m >= 0) {
        res.push(zenkana1[m]);
        continue;
      }
      res.push(c);
    }
    return res.join("");
  }
  static toHan(s) {
    const res = [];
    for (const c of s) {
      const n = zenkana1.indexOf(c);
      if (n >= 0) {
        res.push(hankana1[n]);
        continue;
      }
      const m = zenkana2.indexOf(c);
      if (m >= 0) {
        res.push(hankana2.substring(m * 2, m * 2 + 2));
        continue;
      }
      res.push(c);
    }
    return res.join("");
  }
}

export { HankakuKana };
