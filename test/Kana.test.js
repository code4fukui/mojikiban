import * as t from "https://deno.land/std/testing/asserts.ts";
import { hira2kata, kata2hira } from "../Kana.js";

Deno.test("hira2kata", () => {
  t.assertEquals(hira2kata("あ"), "ア");
  t.assertEquals(hira2kata("あいう"), "アイウ");
  t.assertEquals(hira2kata("A"), "A");
});
Deno.test("kata2hira", () => {
  t.assertEquals(kata2hira("ア"), "あ");
  t.assertEquals(kata2hira("A"), "A");
});
