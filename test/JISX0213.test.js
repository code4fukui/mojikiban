import * as t from "https://deno.land/std/testing/asserts.ts";
import { JISX0213 } from "../JISX0213.js";

Deno.test("isValid", () => {
  t.assertEquals(JISX0213.isValid("福野泰介"), true);
  t.assertEquals(JISX0213.isValid("𤔜㙒𡙌𡗟"), false);
  t.assertEquals(JISX0213.isValid("𤔜㙒𡙌𡗟"), false);
  t.assertEquals(JISX0213.isValid("⓴"), true);
  t.assertEquals(JISX0213.isValid(" "), false); // 半角スペースはJISX0213に入っていない!?
  t.assertEquals(JISX0213.isValid("　"), true); // 全角スペースはvalid
  t.assertEquals(JISX0213.isValid("\t"), false); // タブはvalid
});
Deno.test("validate", () => {
  t.assertEquals(JISX0213.validate("𤔜㙒𡙌𡗟"), [0, 1, 2, 3]);
  t.assertEquals(JISX0213.validate("abc"), []);
});
