import * as t from "https://deno.land/std/testing/asserts.ts";
import { HankakuKana } from "../HankakuKana.js";

Deno.test("toZen", () => {
  t.assertEquals(HankakuKana.toZen("ｱｲｳｴｵ"), "アイウエオ");
  t.assertEquals(HankakuKana.toZen("ｶﾞｷﾞｱｲｳｴｵ"), "ガギアイウエオ");
});
Deno.test("toHan", () => {
  t.assertEquals(HankakuKana.toHan("ガギアイウエオ"), "ｶﾞｷﾞｱｲｳｴｵ");
});
Deno.test("isHalf", () => {
  t.assert(HankakuKana.isHan("ｱ"));
  t.assert(!HankakuKana.isHan("ア"));
});
Deno.test("getHanLength", () => {
  t.assertEquals(HankakuKana.getHanLength("ｱｲｳｴｵ"), 1);
  t.assertEquals(HankakuKana.getHanLength("ｶﾞｷﾞｱｲｳｴｵ"), 2);
  t.assertEquals(HankakuKana.getHanLength(""), 0);
  t.assertEquals(HankakuKana.getHanLength("ア"), 0);
});
