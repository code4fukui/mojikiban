# mojikiban

**mojikiban** は、複雑な日本語文字を扱うためのJavaScriptライブラリのコレクションです。[文字情報基盤 (Moji Joho Kiban)](https://moji.or.jp/mojikiban/) や JIS X 0213 などの標準に基づいた検証、正規化（縮退）、変換ツールを提供します。

このプロジェクトは、[BaseRegistry](https://github.com/code4fukui/BaseRegistry) の [文字環境導入実践ガイドブック](https://github.com/code4fukui/BaseRegistry/blob/main/%E6%96%87%E5%AD%97%E7%92%B0%E5%A2%83%E5%B0%8E%E5%85%A5%E5%AE%9F%E8%B7%B5%E3%82%AC%E3%82%A4%E3%83%89%E3%83%96%E3%83%83%E3%82%AF.md) に関連しています。

## ✨ ライブデモ

- [漢字・異体字検索](https://code4fukui.github.io/mojikiban/)
- [MJ Shrink (異体字の正規化)](https://code4fukui.github.io/mojikiban/shrink.html)
- [JIS X 0213 文字検証ツール](https://code4fukui.github.io/mojikiban/jisvalidator.html)

## 🚀 機能

- **JIS X 0213 準拠**: 文字列を検証し、JIS X 0213:2004 規格外の文字を特定します。
- **異体字の正規化 (MJ Shrink)**: 文字情報基盤のデータを使用して、複雑な漢字や異体字をより一般的な標準字体に簡略化（縮退）します。
- **全角・半角変換**: カナや英数字の全角と半角を簡単に相互変換します。
- **カナ変換**: ひらがなとカタカナを相互変換します。
- **書記素を考慮した文字列処理**: サロゲートペアや結合文字を含む文字列を正しく処理し、正確な操作を保証するユーティリティクラス（`Str.js`）を提供します。
- **文字情報基盤ユーティリティ**: 文字データベースの検索、字形画像の取得、公式エントリへのリンク生成を行います。

## 📚 モジュール

本プロジェクトでは、以下のJavaScriptモジュールを提供しています。

- **[MojiKiban.js](MojiKiban.js)**: 文字情報基盤データベースと連携し、漢字検索や異体字の正規化（縮退）を可能にするライブラリ。
- **[JISX0213.js](JISX0213.js)**: JIS X 0213 文字セットに対して文字列を検証するライブラリ。
- **[Str.js](Str.js)**: マルチバイト文字を正しく処理し、より安全な文字列操作を行うための書記素ベースの文字列ユーティリティクラス。
- **[ZenkakuAlpha.js](ZenkakuAlpha.js)**: 全角・半角英数字を相互変換します。
- **[HankakuKana.js](HankakuKana.js)**: 半角・全角カナを相互変換します。
- **[Kana.js](Kana.js)**: ひらがなとカタカナを相互変換します。
- **[indexOfIgnoreZenHan.js](indexOfIgnoreZenHan.js)**: 全角・半角の違いを無視して部分文字列を検索するユーティリティ。

## 🛠️ 使い方

GitHubリポジトリから直接モジュールをプロジェクトにインポートして使用できます。

### 異体字の正規化 (MJ Shrink)

```js
import { MojiKiban } from "https://code4fukui.github.io/mojikiban/MojiKiban.js";

await MojiKiban.init();

// "𤔜" is a variant of "福"
const complexString = "あいう𤔜ABC";
const normalizedString = MojiKiban.shrink(complexString);

console.log(normalizedString); // "あいう福ABC"
```

### JIS X 0213 検証

```js
import { JISX0213 } from "https://code4fukui.github.io/mojikiban/JISX0213.js";

// "𤔜" is not in JIS X 0213
console.log(JISX0213.isValid("福野泰介")); // true
console.log(JISX0213.isValid("𤔜野泰介")); // false

// Get indices of invalid characters
const errors = JISX0213.validate("abc𤔜def");
console.log(errors); // [3]
```

### 全角・半角変換

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

### カナ変換 (ひらがな・カタカナ)

```js
import * as Kana from "https://code4fukui.github.io/mojikiban/Kana.js";

console.log(Kana.hira2kata("あいうえお")); // "アイウエオ"
console.log(Kana.kata2hira("アイウエオ")); // "あいうえお"
```

## 🔠 同梱フォント

デモ画面で複雑な文字を正しく描画するため、本リポジトリには [IPA Font License v1.0](font/IPAexfont00401/IPA_Font_License_Agreement_v1.0.txt) の下で以下のフォントが同梱されています。

- **[IPAmj Mincho](font/ipamjm00601/)**: 多くの希少な漢字や異体字を含む、文字情報基盤プロジェクトの全文字を網羅したフォント。
- **[IPAex Gothic & Mincho](font/IPAexfont00401/)**: JIS X 0213:2012 に準拠した高品質な汎用日本語フォント。

## 💾 データソース

本プロジェクトで使用しているデータは、以下の公式ソースから派生したものです。

- **[文字情報基盤整備事業 (Moji Joho Kiban Project)](https://moji.or.jp/)**: 異体字や縮退マップを含む包括的な文字データを提供しています。
- **[CharacterInformation](https://github.com/code4fukui/CharacterInformation)**: JIS X 0213 検証用のデータセットを提供しています。

## 📝 文字データに関する注意事項

<details>
<summary>文字情報基盤における重複文字の詳細</summary>

文字情報基盤には、重複している、または定義が更新されたと特定された19文字が含まれています。詳細は以下の通りです。

- **MJ003718 と MJ003719**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ006064 と MJ006065**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ014004 と MJ014005**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ029825 と MJ029826**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ029893 と MJ029894**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ033215 と MJ033216**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ035886 と MJ035887**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ037229**: 字形の差異が大きいため、戸籍統一文字番号 146930 には対応しないと判断されました。「戸籍統一文字番号」および「対応するUCS」の値が削除されています。新たに対応する文字図形名は **MJ068077** となります（Ver.005.01より）。
- **MJ037903 と MJ037904**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ037909 と MJ037910**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ040281 と MJ040282**: 戸籍統一文字において同じ字形と意味を持ちます。
- **MJ040579**: MJ04058 と同じ字形でデザインされています。
</details>
