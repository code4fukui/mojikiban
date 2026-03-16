# mojikiban

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A project related to the [BaseRegistry](https://github.com/code4fukui/BaseRegistry)'s [characters](https://github.com/code4fukui/BaseRegistry/blob/main/%E6%96%87%E5%AD%97%E7%92%B0%E5%A2%83%E5%B0%8E%E5%85%A5%E5%AE%9F%E8%B7%B5%E3%82%AC%E3%82%A4%E3%83%89%E3%83%96%E3%83%83%E3%82%AF.md).

## Features
- [MojiKiban.js](MojiKiban.js), a JavaScript library for the [Character Information Infrastructure](https://moji.or.jp/mojikiban/)
- [JISX0213.js](JISX0213.js), a JavaScript library for JIS X 0213 based on the [Character Information Definition File](https://github.com/code4fukui/CharacterInformation)
- [Str.js](Str.js), a JavaScript library for grapheme-based strings
- [HankakuKana.js](HankakuKana.js), a JavaScript library for converting between half-width and full-width kana
- [ZenkakuAlpha.js](ZenkakuAlpha.js), a JavaScript library for converting between full-width and half-width alphanumeric characters

## Usage

### JISX0213

```js
import { JISX0213 } from "https://code4fukui.github.io/mojikiban/JISX0213.js";
const s = "ａＡ";
console.log(JISX0213.isValid(s));
console.log(JISX0213.validate(s));

const s2 = JISX0213.shrink(s); // "aA"
console.log(JISX0213.isValid(s2));
console.log(JISX0213.validate(s2));
```

### Kana

```js
import * as Kana from "https://code4fukui.github.io/mojikiban/Kana.js";

console.log(Kana.hira2kata("あいう"));
console.log(Kana.kata2hira("アイウ"));
```

## Applications
- [Kanji search, variant character search](https://code4fukui.github.io/mojikiban/)
- [MJ shrink demo](https://code4fukui.github.io/mojikiban/shrink.html)
- [JIS X 0213 checker](https://code4fukui.github.io/mojikiban/jisvalidator.html)

## Character Information Infrastructure Undefined Characters

19 duplicate characters

```
MJ003718 and MJ003719 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ006064 and MJ006065 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ014004 and MJ014005 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ029825 and MJ029826 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ029893 and MJ029894 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ033215 and MJ033216 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ035886 and MJ035887 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ037229 has a large graphical difference and is judged not to correspond to Koseki Toitsu Moji No. 146930. Therefore, the "Koseki Toitsu Moji No." and "Corresponding UCS" values have been deleted, and no further international standardization proposals will be made. From Ver.005.01, the new MJ character glyph name corresponding to Koseki Toitsu Moji No. 146930, which was handled in Ver.004.03, is MJ068077.
MJ037903 and MJ037904 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ037909 and MJ037910 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ040281 and MJ040282 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ040579 was designed with the same glyph as MJ040580. Therefore, the "Koseki Toitsu Moji No." and "Corresponding UCS" values have been deleted. From Ver.005.01, the new MJ character glyph name corresponding to Koseki Toitsu Moji No. 227070, which was handled in Ver.004.03, is MJ068082. Also, it is strongly recommended to use MJ040580 (U+246FC) when using this glyph.
MJ041325 and MJ041326 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ041469 and MJ041470 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ042077 has a large graphical difference and is judged not to correspond to Koseki Toitsu Moji No. 257160. Therefore, the "Koseki Toitsu Moji No." and "Corresponding UCS" values have been deleted, and no further international standardization proposals will be made. From Ver.005.01, the new MJ character glyph name corresponding to Koseki Toitsu Moji No. 257160, which was handled in Ver.004.03, is MJ068085.
MJ043218 and MJ043219 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ053025 and MJ053026 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ055352 and MJ055353 have the same glyph and meaning in the Koseki Toitsu Moji.
MJ059043 was the same glyph as MJ059042 and did not correspond to Koseki Toitsu Moji No. 499580. Therefore, a new MJ character glyph name MJ068101 corresponding to Koseki Toitsu Moji No. 499580 was added in Ver.005.02.
```

## License
MIT License — see [LICENSE](LICENSE).