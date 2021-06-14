const url = "https://code4fukui.github.io/CharacterInformation/1/sample/JISX0213.txt";
const s = await (await fetch(url)).text();
await Deno.writeTextFile("../JISX0213_CODE.js", "export const JISX0213_CODE = \"" + s.replace("\\", "\\\\").replace('"', "\\\"") + "\";");
