### **`README.md` (English)**

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

# mojikiban

**mojikiban** is a collection of JavaScript libraries for handling complex Japanese characters. It provides tools for validation, normalization ("shrinking"), and conversion based on standards like the [Moji Joho Kiban (Character Information Infrastructure)](https://moji.or.jp/mojikiban/) and JIS X 0213.

This project is related to the [BaseRegistry](https://github.com/code4fukui/BaseRegistry)'s [character environment guide](https://github.com/code4fukui/BaseRegistry/blob/main/%E6%96%87%E5%AD%97%E7%92%B0%E5%A2%83%E5%B0%8E%E5%85%A5%E5%AE%9F%E8%B7%B5%E3%82%AC%E3%82%A4%E3%83%89%E3%83%96%E3%83%83%E3%82%AF.md).

## ✨ Live Demos

- [Kanji and Variant Character Search](https://code4fukui.github.io/mojikiban/)
- [MJ Shrink (Variant Kanji Normalization)](https://code4fukui.github.io/mojikiban/shrink.html)
- [JIS X 0213 Character Validator](https://code4fukui.github.io/mojikiban/jisvalidator.html)

## 🚀 Features

- **JIS X 0213 Compliance**: Validate strings and identify characters outside the JIS X 0213:2004 standard.
- **Variant Kanji Normalization (MJ Shrink)**: Simplify complex or variant kanji (異体字) to their more common or standard forms using Moji Joho Kiban data.
- **Zenkaku/Hankaku Conversion**: Easily convert between full-width (zenkaku) and half-width (hankaku) for Kana and alphanumeric characters.
- **Kana Conversion**: Convert between Hiragana and Katakana.
- **Grapheme-Aware String Handling**: A utility class (`Str.js`) to correctly handle strings with surrogate pairs and combining characters, ensuring accurate manipulation.
- **Moji Joho Kiban Utilities**: Search the character database, get glyph images, and link to official entries.

## 📚 Modules

This project provides the following JavaScript modules:

- **[MojiKiban.js](MojiKiban.js)**: A library for interacting with the Moji Joho Kiban database, enabling kanji search and variant normalization.
- **[JISX0213.js](JISX0213.js)**: A library for validating strings against the JIS X 0213 character set.
- **[Str.js](Str.js)**: A grapheme-based string utility class for safer string manipulation, correctly handling multi-byte characters.
- **[ZenkakuAlpha.js](ZenkakuAlpha.js)**: Converts between full-width and half-width alphanumeric characters.
- **[HankakuKana.js](HankakuKana.js)**: Converts between half-width and full-width kana.
- **[Kana.js](Kana.js)**: Converts between Hiragana and Katakana.
- **[indexOfIgnoreZenHan.js](indexOfIgnoreZenHan.js)**: A utility to find a substring while ignoring zenkaku/hankaku differences.

## 🛠️ Usage

You can import the modules directly into your project from the GitHub repository.

### Variant Kanji Normalization (MJ Shrink)

```js
import { MojiKiban } from "https://code4fukui.github.io/mojikiban/MojiKiban.js";

await MojiKiban.init();

// "𤔜" is a variant of "福"
const complexString = "あいう𤔜ABC";
const normalizedString = MojiKiban.shrink(complexString);

console.log(normalizedString); // "あいう福ABC"
```

### JIS X 0213 Validation

```js
import { JISX0213 } from "https://code4fukui.github.io/mojikiban/JISX0213.js";

// "𤔜" is not in JIS X 0213
console.log(JISX0213.isValid("福野泰介")); // true
console.log(JISX0213.isValid("𤔜野泰介")); // false

// Get indices of invalid characters
const errors = JISX0213.validate("abc𤔜def");
console.log(errors); // [3]
```

### Zenkaku/Hankaku Conversion

```js
import { ZenkakuAlpha } from "https://code4fukui.github.io/mojikiban/ZenkakuAlpha.js";
import { HankakuKana } from "https://code4fukui.github.io/mojikiban/HankakuKana.js";

// Alphanumeric
const zenkakuText = "ＡＢＣ１２３";
console.log(ZenkakuAlpha.toHan(zenkakuText)); // "ABC123"

// Kana
const hankakuKana = "ﾊﾝｶｸｶﾅ";
console.log(HankakuKana.toZen(hankakuKana)); // "ハンカクカナ"
```

### Kana Conversion (Hiragana/Katakana)

```js
import * as Kana from "https://code4fukui.github.io/mojikiban/Kana.js";

console.log(Kana.hira2kata("あいうえお")); // "アイウエオ"
console.log(Kana.kata2hira("アイウエオ")); // "あいうえお"
```

## 🔠 Included Fonts

This repository includes the following fonts under the [IPA Font License v1.0](font/IPAexfont00401/IPA_Font_License_Agreement_v1.0.txt) to ensure correct rendering of complex characters in the demos:

- **[IPAmj Mincho](font/ipamjm00601/)**: A font that covers the full range of characters in the Moji Joho Kiban project, including many rare and variant kanji.
- **[IPAex Gothic & Mincho](font/IPAexfont00401/)**: High-quality, general-purpose Japanese fonts compliant with JIS X 0213:2012.

## 💾 Data Sources

The data used in this project is derived from the following official sources:

- **[Moji Joho Kiban Project (文字情報基盤整備事業)](https://moji.or.jp/)**: Provides the comprehensive character data, including variant forms and shrink maps.
- **[CharacterInformation](https://github.com/code4fukui/CharacterInformation)**: Provides the dataset for JIS X 0213 validation.

## 📝 Notes on Character Data

<details>
<summary>Details on Duplicate Characters in Moji Joho Kiban</summary>

The Character Information Infrastructure contains 19 characters that have been identified as duplicates or have had their definitions updated. Here are the details:

- **MJ003718 and MJ003719**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ006064 and MJ006065**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ014004 and MJ014005**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ029825 and MJ029826**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ029893 and MJ029894**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ033215 and MJ033216**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ035886 and MJ035887**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ037229**: Judged not to correspond to Koseki Toitsu Moji No. 146930 due to a large graphical difference. "Koseki Toitsu Moji No." and "Corresponding UCS" values were deleted. The new corresponding glyph name is **MJ068077** (from Ver.005.01).
- **MJ037903 and MJ037904**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ037909 and MJ037910**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ040281 and MJ040282**: Same glyph and meaning in Koseki Toitsu Moji.
- **MJ040579**: Designed with the same glyph as MJ04058