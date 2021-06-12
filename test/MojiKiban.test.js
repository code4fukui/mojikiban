import * as t from "https://deno.land/std/testing/asserts.ts";
import { MojiKiban } from "../MojiKiban.js";

Deno.test("test", async () => {
  await MojiKiban.init();
  t.assertEquals(MojiKiban.getData().length, 58862 - 19); // 重複削除 = 58843
});
Deno.test("search", async () => {
  const hits = MojiKiban.search("福");
  t.assertEquals(hits.length, 7);
});
Deno.test("shrink1", async () => {
  const s = "鯖󠄂";
  const chk = "鯖";
  t.assertEquals(s.length, 3);
  const sh = MojiKiban.shrink(s);
  const sh2 = MojiKiban.shrink(chk);
  //console.log(sh, sh2, sh.length, sh2.length)
  t.assert(sh, sh2);
});
Deno.test("shrink1_2", async () => {
  const s = "𤔜";
  const chk = "福";
  t.assertEquals(s.length, 2);
  const sh = MojiKiban.shrink(s);
  const sh2 = MojiKiban.shrink(chk);
  //console.log(sh, sh2, sh.length, sh2.length)
  t.assertEquals(sh, sh2);
});
Deno.test("shrink1_3", async () => {
  const s = "𮂊";
  const chk = "𮂊";
  t.assertEquals(s.length, 2);
  const sh = MojiKiban.shrink(s);
  const sh2 = MojiKiban.shrink(chk);
  //console.log(sh, sh2, sh.length, sh2.length)
  t.assertEquals(sh, sh2);
});
Deno.test("shrink2", async () => {
  const s = "鯖󠄂𮂊𤔜";
  const chk = "鯖福福";
  t.assertEquals(s.length, 7);
  const sh = MojiKiban.shrink(s);
  //const sh2 = MojiKiban.shrink(chk);
  //console.log(sh, sh2, sh.length, sh2.length)
  t.assertEquals(sh, chk);
});
Deno.test("shrink3", async () => {
  const s = "あいう鯖󠄂𮂊𤔜ABC";
  const chk = "あいう鯖福福ABC";
  t.assertEquals(MojiKiban.shrink(s), chk);
  t.assertEquals(chk.length, 9);
});
