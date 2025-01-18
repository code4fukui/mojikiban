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
  t.assert(ZenkakuAlpha.isZen("　"));
});
Deno.test("isHan", () => {
  t.assert(!ZenkakuAlpha.isHan("ｚ"));
  t.assert(ZenkakuAlpha.isHan("z"));
  t.assert(ZenkakuAlpha.isHan(" "));
  t.assert(!ZenkakuAlpha.isHan("　"));
});
Deno.test("space", () => {
  t.assertEquals(ZenkakuAlpha.toZen(" "), "　"); // han spc -> zen spc
  t.assertEquals(ZenkakuAlpha.toHan("　"), " "); // zen spc -> han spc
});
Deno.test("lengthHan", () => {
  t.assertEquals(ZenkakuAlpha.lengthHan("あ"), 2);
  t.assertEquals(ZenkakuAlpha.lengthHan("a"), 1);
  t.assertEquals(ZenkakuAlpha.lengthHan("あa"), 3);
  t.assertEquals(ZenkakuAlpha.lengthHan(""), 0);
  t.assertEquals(ZenkakuAlpha.lengthHan("福井太郎!"), 9);
});
Deno.test("substringHan", () => {
  t.assertEquals(ZenkakuAlpha.substringHan("福井太郎!", 0, 2), "福");
  t.assertEquals(ZenkakuAlpha.substringHan("福井太郎!", 0, 3), "福井");
  t.assertEquals(ZenkakuAlpha.substringHan("福II太郎!", 0, 3), "福I");
  t.assertEquals(ZenkakuAlpha.substringHan("福井太郎!", 0, 4), "福井");
  t.assertEquals(ZenkakuAlpha.substringHan("福井太郎!", 1, 3), "井");
  t.assertEquals(ZenkakuAlpha.substringHan("福井太郎!", 1, 2), "");
  t.assertEquals(ZenkakuAlpha.substringHan("FK井太郎!", 1, 3), "K井");
});
Deno.test("isZen (mac special chars　`”“‘’`)", () => {
  t.assert(ZenkakuAlpha.isZen("”"));
  t.assert(ZenkakuAlpha.isZen("“"));
  t.assert(ZenkakuAlpha.isZen("‘"));
  t.assert(ZenkakuAlpha.isZen("’"));
  t.assertEquals(ZenkakuAlpha.toHan("”“‘’"), `""''`);
  t.assertEquals(ZenkakuAlpha.toZen(`""''`), "＂＂＇＇");
  t.assertEquals(ZenkakuAlpha.toHan("＂＂＇＇"), `""''`);
});
Deno.test("toZens", () => {
  t.assertEquals(ZenkakuAlpha.toZens('"'), ['＂', '＂', '”', '“']);
  t.assertEquals(ZenkakuAlpha.toZens("'"), ['＇', '＇', "'", "'"]);
});
Deno.test("toHalf another hyphen", () => {
  t.assertEquals(ZenkakuAlpha.toHan('-'), "-"); // normal
  t.assertEquals('-'.charCodeAt(0), 45); // normal hyphen
  t.assertEquals('‐'.charCodeAt(0), 0x2010); // U+2010 hyphen
  t.assertEquals(ZenkakuAlpha.toHan('‐'), "-"); // to normal hyphen
  t.assertEquals(ZenkakuAlpha.toHan('‐').charCodeAt(0), 45); // to normal hyphen
});
