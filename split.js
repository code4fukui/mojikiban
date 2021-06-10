import gsplit from 'https://taisukef.github.io/GraphemeSplitter/GraphemeSplitterJS/StringSplitter.Grapheme.mjs'

const s = "㐮㐮󠄂㐮󠄃";
const ss = gsplit.split(s);
console.log(s);
console.log("gsplit length", ss.length);
console.log("length", s.length);
