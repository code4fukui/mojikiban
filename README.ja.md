# mojikiban

文字情報に関するプロジェクトです。[文字情報基盤](https://moji.or.jp/mojikiban/)の[MojiKiban.js](MojiKiban.js)、[JISX0213.js](JISX0213.js)、[Str.js](Str.js)、[HankakuKana.js](HankakuKana.js)、[ZenkakuAlpha.js](ZenkakuAlpha.js)などのJavaScriptライブラリを提供しています。

## デモ

- [漢字検索、異体字検索](https://code4fukui.github.io/mojikiban/)
- [MJ縮退デモ](https://code4fukui.github.io/mojikiban/shrink.html)
- [JIS X 0213チェッカー](https://code4fukui.github.io/mojikiban/jisvalidator.html)

## 機能

- JIS X 0213文字のバリデーション
- 文字の縮退
- 半角カナと全角カナの変換
- 全角記号英数字と半角記号英数字の変換

## 使い方

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

## 文字情報基盤 UCS未定義文字

文字情報基盤には、19文字の重複が確認されています。