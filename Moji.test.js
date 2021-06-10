import * as t from "https://deno.land/std/testing/asserts.ts";
import { Moji } from "./Moji.js";

Deno.test("test", () => {
  t.assertEquals(Moji.ucs2s("37DF_E0101"), "㟟󠄁");
  t.assertEquals(Moji.ucs2s("37DF"), "㟟");
  t.assertEquals(Moji.mj2imglink(3), "https://moji.or.jp/mojikibansearch/img/MJ/MJ000003.png");
  t.assertEquals(Moji.mj2imglink("3"), "https://moji.or.jp/mojikibansearch/img/MJ/MJ000003.png");
  t.assertEquals(Moji.mj2imglink("MJ000003"), "https://moji.or.jp/mojikibansearch/img/MJ/MJ000003.png");
});
