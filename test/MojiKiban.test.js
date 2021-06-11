import * as t from "https://deno.land/std/testing/asserts.ts";
import { MojiKiban } from "../MojiKiban.js";

Deno.test("test", async () => {
  await MojiKiban.init();
  t.assertEquals(MojiKiban.getData().length, 58862);
});
Deno.test("search", async () => {
  const hits = MojiKiban.search("福");
  t.assertEquals(hits.length, 3);
});
