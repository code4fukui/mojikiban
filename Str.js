import gsplit from 'https://taisukef.github.io/GraphemeSplitter/GraphemeSplitterJS/StringSplitter.Grapheme.mjs'

class Str {
  constructor(s) {
    const ss = gsplit.split(s);
    this.length = ss.length;
    for (let i = 0; i < this.length; i++) {
      this[i] = ss[i];
    }
    Object.freeze(this);
  }
  charAt(n) {
    return this[n];
  }
  startsWith(str) {
    for (let i = 0; i < str.length; i++) {
      if (this[i] != str[i]) {
        return false;
      }
    }
    return true;
  }
  endsWith(str) {
    for (let i = 0; i < str.length; i++) {
      if (this[this.length - 1 - i] != str[str.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }
  equals(str) {
    if (str.length != this.length) {
      return false;
    }
    for (let i = 0; i < str.length; i++) {
      if (this[i] != str[i]) {
        return false;
      }
    }
    return true;
  }
  toString() {
    const s = new Array(this.length);
    for (let i = 0; i < s.length; i++) {
      s[i] = this[i];
    }
    return s.join("");
  }
  indexOf(s, begin = 0) {
    A: for (let i = begin; i <= this.length - s.length; i++) {
      for (let j = 0; j < s.length; j++) {
        if (this[i + j] != s[j]) {
          continue A;
        }
      }
      return i;
    }
    return -1;
  }
  lastIndexOf(s, begin = 0) {
    A: for (let i = this.length - s.length; i >= begin; i--) {
      for (let j = 0; j < s.length; j++) {
        if (this[i + j] != s[j]) {
          continue A;
        }
      }
      return i;
    }
    return -1;
  }
}
export { Str };
