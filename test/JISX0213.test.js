import * as t from "https://deno.land/std/testing/asserts.ts";
import { JISX0213 } from "../JISX0213.js";

Deno.test("isValid", () => {
  t.assertEquals(JISX0213.isValid("福野泰介"), true);
  t.assertEquals(JISX0213.isValid("𤔜㙒𡙌𡗟"), false);
  t.assertEquals(JISX0213.isValid("𤔜㙒𡙌𡗟"), false);
  t.assertEquals(JISX0213.isValid("⓴"), true);
  t.assertEquals(JISX0213.isValid("\""), true);
});
Deno.test("isValid space", () => {
  t.assertEquals(JISX0213.isValid(" "), true); // 半角スペースはvalid
  t.assertEquals(JISX0213.isValid("　"), true); // 全角スペースはvalid
});
Deno.test("isValid CL", () => {
  t.assertEquals(JISX0213.isValid("\r"), true); // 制御コードもvalid
  t.assertEquals(JISX0213.isValid("\n"), true); // 制御コードもvalid
  t.assertEquals(JISX0213.isValid("\r\n"), true); // 制御コードもvalid
  t.assertEquals(JISX0213.isValid("\n\r"), true); // 制御コードもvalid
  t.assertEquals(JISX0213.isValid("\n\r\n"), true); // 制御コードもvalid
  t.assertEquals(JISX0213.isValid("\t"), true); // タブもvalid
});
Deno.test("validate", () => {
  t.assertEquals(JISX0213.validate("𤔜㙒𡙌𡗟"), [0, 1, 2, 3]);
  t.assertEquals(JISX0213.validate("abc"), []);
});
Deno.test("validate with control code", () => {
  t.assertEquals(JISX0213.validate("abc\ndef"), []);
  t.assertEquals(JISX0213.validate("\t\r\n\b"), []);
});
Deno.test("validate all jis chars", async () => {
  const url = "https://code4fukui.github.io/CharacterInformation/1/sample/JISX0213.json";
  const all = await (await fetch(url)).json();
  for (const s of all) {
    t.assertEquals(JISX0213.isValid(s), true);
  }
});
Deno.test("validate all controls", async () => {
  for (let i = 0; i <= 0x20; i++) {
    t.assertEquals(JISX0213.isValid(String.fromCharCode(i)), true);
  }
  for (let i = 0x7f; i <= 0x9f; i++) {
    t.assertEquals(JISX0213.isValid(String.fromCharCode(i)), true);
  }
  for (let i = 0x0; i <= 0xff; i++) {
    if (i == 0xb5) { // 1byte char 唯一 0xb5 のみ invalid
      continue;
    }
    //console.log(i.toString(16), String.fromCharCode(i)); // b5
    t.assertEquals(JISX0213.isValid(String.fromCharCode(i)), true);
  }
});
