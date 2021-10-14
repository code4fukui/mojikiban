import * as t from "https://deno.land/std/testing/asserts.ts";
import { ZenkakuAlpha } from "../ZenkakuAlpha.js";

const zenall = "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～";
const hanall = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

/*
// make zenall
const res = ["　"];
for (let i = 65281; i <= 65374; i++) {
  res.push(String.fromCodePoint(i));
}
console.log(res.join(""), res.length);
*/

/*
// make hanall
const res2 = [" ""];
for (let i = 33; i <= 126; i++) {
  res2.push(String.fromCodePoint(i));
}
console.log(res2.join(""), res2.length);

console.log(hanall.length, zenall.length); // 95
*/

Deno.test("toZen", () => {
  t.assertEquals(ZenkakuAlpha.toZen("abc!"), "ａｂｃ！");
  t.assertEquals(ZenkakuAlpha.toZen("z$"), "ｚ＄");
  t.assertEquals(ZenkakuAlpha.toZen(hanall), zenall);
});
Deno.test("toHan", () => {
  t.assertEquals(ZenkakuAlpha.toHan("ｚ＄"), "z$");
  t.assertEquals(ZenkakuAlpha.toHan("z$"), "z$");
  t.assertEquals(ZenkakuAlpha.toHan(zenall), hanall);
});
Deno.test("isZen", () => {
  t.assert(ZenkakuAlpha.isZen("ｚ"));
  t.assert(!ZenkakuAlpha.isZen("z"));
});
Deno.test("space", () => {
  t.assertEquals(ZenkakuAlpha.toZen(" "), "　"); // han spc -> zen spc
  t.assertEquals(ZenkakuAlpha.toHan("　"), " "); // zen spc -> han spc
});
