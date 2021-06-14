import { Moji } from "./Moji.js";

const fn = "../data/jisx0213-2004-8bit-std.txt";
const ss = (await Deno.readTextFile(fn)).split("\n");
let nline = 0;
let nreserved = 0;
for (const line of ss) {
  const c = line.split("\t");
  if (line.startsWith("#")) {
    continue;
  }
  if (!line.startsWith("0")) {
    console.log(line); // なし
  }
  if (line.indexOf("[2004]") >= 0) {
    const ucs = Moji.ucs2s(c[1]);
    // console.log(ucs, line);
    /* 10code
      俱 0x2E21	U+4FF1	# <cjk>	[2004]
      剝 0x2F7E	U+525D	# <cjk>	[2004]
      𠮟 0x4F54	U+20B9F	# <cjk>	[2004]	[Unicode3.1]
      吞 0x4F7E	U+541E	# <cjk>	[2004]
      噓 0x7427	U+5653	# <cjk>	[2004]
      姸 0x7E7A	U+59F8	# <cjk>	[2004]
      屛 0x7E7B	U+5C5B	# <cjk>	[2004]
      幷 0x7E7C	U+5E77	# <cjk>	[2004]
      瘦 0x7E7D	U+7626	# <cjk>	[2004]
      繫 0x7E7E	U+7E6B	# <cjk>	[2004]
    */
  }
  if (line.indexOf("<reserved>") >= 0) {
    console.log(line);
    nreserved++;
  }
  // console.log(line);
  nline++;
}
console.log(nline, nreserved);
