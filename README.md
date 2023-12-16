# mojikiban

- [ベースレジストリ](https://github.com/code4fukui/BaseRegistry)の[文字](https://github.com/code4fukui/BaseRegistry/blob/main/%E6%96%87%E5%AD%97%E7%92%B0%E5%A2%83%E5%B0%8E%E5%85%A5%E5%AE%9F%E8%B7%B5%E3%82%AC%E3%82%A4%E3%83%89%E3%83%96%E3%83%83%E3%82%AF.md)に関するプロジェクト
- [文字情報基盤](https://moji.or.jp/mojikiban/)のJavaScriptライブラリ [MojiKiban.js](MojiKiban.js)
- [文字情報定義ファイル](https://github.com/code4fukui/CharacterInformation)を元にした[JIS X 0213](https://github.com/code4fukui/BaseRegistry/blob/main/%E7%94%A8%E8%AA%9E.md#jis-x-0213)のJavaScriptライブラリ [JISX0213.js](JISX0213.js)
- 書記素に対応した文字列JavaScriptライブラリ [Str.js](Str.js)
- 半角カナと全角カナの相互変換JavaScriptライブラリ [HankakuKana.js](HankakuKana.js)
- 全角記号英数（全角アルファベット）と半角記号英数（半角アルファベット）の相互変換JavaScriptライブラリ [ZenkakuAlpha.js](ZenkakuAlpha.js)

## usage

### JISX0213

```js
import { JISX0213 } from "https://code4fukui.github.io/mojikiban/JISX0213.js";
cosnt s = "ａＡ";
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

## application

- [漢字検索、異体字検索](https://code4fukui.github.io/mojikiban/)
- [MJ縮退デモ](https://code4fukui.github.io/mojikiban/shrink.html)
- [JIS X 0213チェッカー](https://code4fukui.github.io/mojikiban/jisvalidator.html)

## 文字情報基盤 UCS未定義文字

19漢字重複あり

```
MJ003718・MJ003719は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ006064・MJ006065は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ014004・MJ014005は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ029825・MJ029826は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ029893・MJ029894は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ033215・MJ033216は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ035886・MJ035887は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ037229は、図形的な差異が大きく戸籍統一文字番号: 146930に対応しないものと判断した。このため、「戸籍統一文字番号」、「対応するUCS」の値を削除するとともに、今後は国際標準化提案を行わない。Ver.005.01よりVer.004.03で対応していた戸籍統一文字番号: 146930に対応する新しいMJ文字図形名はMJ068077となる。
MJ037903・MJ037904は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ037909・MJ037910は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ040281・MJ040282は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ040579は、MJ040580と同一の字形としてデザインされていた。このため、「戸籍統一文字番号」、「対応するUCS」の値を削除する。Ver.005.01よりVer.004.03で対応していた戸籍統一文字番号: 227070に対応する新しいMJ文字図形名はMJ068082となる。また、この字形を使用する場合にはMJ040580(U+246FC)に変更することが強く推奨される。
MJ041325・MJ041326は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ041469・MJ041470は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ042077は、図形的な差異が大きく戸籍統一文字番号: 257160に対応しないものと判断した。このため、「戸籍統一文字番号」、「対応するUCS」の値を削除するとともに、今後は国際標準化提案を行わない。Ver.005.01よりVer.004.03で対応していた戸籍統一文字番号: 257160に対応する新しいMJ文字図形名はMJ068085となる。
MJ043218・MJ043219は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ053025・MJ053026は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ055352・MJ055353は、戸籍統一文字において、同一字形であり、字義も同一の内容である。
MJ059043は、MJ059042と同一の字形となっており、戸籍統一文字番号:499580に対応していなかった。このため、戸籍統一文字番号:499580に対応する新たなMJ文字図形名:MJ068101をVer.005.02において追加した。
```
