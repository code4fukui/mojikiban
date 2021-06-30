import * as t from "https://deno.land/std/testing/asserts.ts";
import { JISX0213 } from "../JISX0213.js";

Deno.test("shrink", () => {
  t.assertEquals(JISX0213.shrink("ａ"), "a");
  t.assertEquals(JISX0213.shrink("ｚ"), "z");
  t.assertEquals(JISX0213.shrink("Ａ"), "A");
  t.assertEquals(JISX0213.shrink("Ｚ"), "Z");
  t.assertEquals(JISX0213.shrink("０"), "0");
  t.assertEquals(JISX0213.shrink("９"), "9");
  t.assertEquals(JISX0213.shrink("！"), "!");
});
Deno.test("not shrink", () => {
  t.assertEquals(JISX0213.shrink("A"), "A");
  t.assertEquals(JISX0213.shrink("あ"), "あ");
  t.assertEquals(JISX0213.shrink("　"), "　");
  t.assertEquals(JISX0213.isValid("　"), true); // 全角空白はvalid
});

/*
// check hankaku
for (let i = 65296 - 100; i < 65296 + 200; i++) {
  const c = String.fromCodePoint(i);
  const c2 = i - 65345 + 97 >= 0 ? String.fromCodePoint(i - 65345 + 97) : "";
  console.log(i, c, c2, isValid(c));
}
*/
/*
// check hankaku kana
console.log("。".codePointAt(0));
console.log("ヲ".codePointAt(0));
for (let i = 12290; i < 12290 + 200; i++) {
  const c = String.fromCodePoint(i);
  console.log(i, c, isValid(c));
}
*/
/*
for (let i = 65377; i < 65377 + 200; i++) {
  const c = String.fromCodePoint(i);
  const c2 = i - 65345 + 97 >= 0 ? String.fromCodePoint(i - 65345 + 97) : "";
  console.log(i, c, c2, isValid(c));
}
*/
