import { CSV } from "https://js.sabae.cc/CSV.js";
import { Moji } from "../Moji.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const base = "https://moji.or.jp/mojikibansearch/img/MJ/";
const ext = ".png";

const data = CSV.toJSON(await CSV.fetch("../data/moji.csv"));
for (const d of data) {
  console.log(d.mj);
  const link = Moji.mj2imglink(d.mj, base, ext);
  const dir = Moji.mj2mjcode(Math.floor(d.mj / 1000) * 1000);
  try {
    await Deno.mkdir("../mj/" + dir);
  } catch (e) {
  }
  const path = "../mj/" + dir + "/" + Moji.mj2mjcode(d.mj) + ".png";
  try {
    const n = await Deno.readFile(path);
  } catch (e) {
    const img = new Uint8Array(await (await fetch(link)).arrayBuffer());
    await Deno.writeFile(path, img);
    await sleep(100);
  }
}