import * as t from "https://deno.land/std/testing/asserts.ts";
import { indexOfIgnoreZenHan } from "../indexOfIgnoreZenHan.js";

Deno.test("test", () => {
  t.assert(indexOfIgnoreZenHan("abc", "ab") == 0);
  t.assert(indexOfIgnoreZenHan("ａｂc", "ab") == 0);
  t.assert(indexOfIgnoreZenHan("aａｂc", "ab") == 1);
  t.assert(indexOfIgnoreZenHan("abc", "ｂｃ") == 1);
});
Deno.test("test2", () => {
  t.assert(indexOfIgnoreZenHan("１２３４５", "45") == 3);
  t.assert(indexOfIgnoreZenHan("１２３４５", "４５") == 3);
  t.assert(indexOfIgnoreZenHan("33994", "99") == 2);
  t.assert(indexOfIgnoreZenHan("test", "ｔｅ") == 0);
  t.assert(indexOfIgnoreZenHan("ｔｅ", "te") == 0);
  t.assert(indexOfIgnoreZenHan("3939393", "9230230h203h4") == -1);
  t.assert(indexOfIgnoreZenHan("4xx3939393", "xx3939393") == 1);
  t.assert(indexOfIgnoreZenHan("39xxxxx3939raocheruchaeu3", "８") == -1);
});
Deno.test("test3", () => {
  t.assertEquals("".indexOf("45"), -1);
  t.assertEquals(indexOfIgnoreZenHan("", "45"), -1);
  t.assertEquals(indexOfIgnoreZenHan("", "45"), -1);
  t.assertEquals(indexOfIgnoreZenHan("", ""), 0);
});
Deno.test("null", () => {
  t.assertEquals(indexOfIgnoreZenHan(null, ""), 0);
  t.assertEquals(indexOfIgnoreZenHan(null, "45"), -1);
  t.assertEquals(indexOfIgnoreZenHan("", null), 0);
  t.assertEquals(indexOfIgnoreZenHan(null, null), 0);
});
Deno.test("num", () => {
  t.assertEquals(indexOfIgnoreZenHan(12345, "45"), 3);
  t.assertEquals(indexOfIgnoreZenHan(12345, 45), 3);
});
