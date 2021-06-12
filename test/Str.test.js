import * as t from "https://deno.land/std/testing/asserts.ts";
import { Str } from "../Str.js";

Deno.test("simple", () => {
  const sjs = "𤔜䙐福";
  t.assertEquals(sjs.length, 4);
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.length, 3);
});
Deno.test("charAt", () => {
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.charAt(0), "𤔜");
  t.assertEquals(s.charAt(1), "䙐");
  t.assertEquals(s.charAt(2), "福");
});
Deno.test("startsWith / endsWith", () => {
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.endsWith("䙐福"), true);
  t.assertEquals(s.startsWith(new Str("𤔜䙐")), true);
  t.assertEquals(s.startsWith(new Str("𤔜福")), false);
});
Deno.test("equals", () => {
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.equals(new Str("𤔜䙐福")), true);
  t.assertEquals(s.equals(new Str("𤔜䙐福x")), false);
});
Deno.test("toString", () => {
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.toString(), "𤔜䙐福");
});
Deno.test("indexOf", () => {
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.indexOf(new Str("𤔜䙐")), 0);
  t.assertEquals(s.indexOf(new Str("䙐福")), 1);
  t.assertEquals(s.indexOf(new Str("䙐福"), 2), -1);
});
Deno.test("lastIndexOf", () => {
  const s = new Str("𤔜䙐福");
  t.assertEquals(s.lastIndexOf(new Str("𤔜䙐")), 0);
  t.assertEquals(s.lastIndexOf(new Str("䙐福")), 1);
  t.assertEquals(s.lastIndexOf(new Str("䙐福"), 2), -1);
});
