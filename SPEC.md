# team-continue.github.io ホームページ仕様書

## 概要

`team-continue.github.io` は GitHub organization/user Pages サイト（`main` ブランチ直下から自動公開）。team-continue というチーム/プロジェクトの紹介ホームページを Jekyll で新規構築する。

参考サイト https://abehiroshi.la.coocan.jp/ （日本で有名な90年代GeoCities風の“ド派手レトロ”個人サイト）の雰囲気を軽く取り入れつつ、実際のレイアウトはモダン・レスポンシブ・アクセシブルにする。

- サイトの目的: チーム/プロジェクトの紹介
- テイスト: レトロ感は「軽く」取り入れる（本物のカオスさは再現しない）
- 技術構成: Jekyll（GitHub Pages 標準ビルド、カスタムActions不要）

## ファイル構成

```
/
├── _config.yml
├── Gemfile                      # github-pages gem を指定、ローカルプレビュー用
├── index.md                     # フロントマター付きコンテンツ本体
├── _layouts/
│   └── default.html             # header/nav/footer を包む唯一のレイアウト
└── assets/
    └── css/
        └── style.scss           # フロントマター付きSCSS、Jekyllが自動コンパイル
```

README.md は変更しない。

- `_config.yml`: title, description 程度のみ。GH Pages のセーフモードで許可されたプラグインのみ使用（不要なら未指定でよい）。remote_theme は使わず `_layouts/default.html` で完全自作。
- `Gemfile`: `gem "github-pages", group: :jekyll_plugins` を指定し、`bundle exec jekyll serve` でGH Pagesと同等のビルドをローカル確認できるようにする。

## コンテンツ構成（index.md、日本語）

1. **ヒーロー** — 「team-continue」の大見出し＋一言タグライン（例:「続けることが、ちからになる。」）。1単語だけCSSブリンクを軽く効かせる。
2. **チームについて** — 2〜3文のミッション/紹介文（プレースホルダーだが自然な内容）。
3. **メンバー** — プレースホルダーのカードグリッド（2〜4枚、"Coming soon" 表記可）。
4. **活動・プロジェクト** — プロジェクト/リンクのカードまたは箇条書き（GitHub org リンクなど）。
5. **リンク集バナー帯** — レトロな「バナー交換」風だが、実際はシンプルな丸角バッジリンクの並び（GitHub等）。
6. **フッター** — Copyright、「Under Construction 🚧」の遊び心バッジ、装飾的な（非機能）来訪者カウンター風要素、最終更新日。

## CSSアプローチ（軽いレトロテイスト、モダン/レスポンシブ）

- レイアウト: CSS Grid（カード群）+ Flexbox（header/footer）。モバイルファースト、`@media` で2ブレークポイント程度。テーブルレイアウトは使わない。
- 配色: ホットピンク/シアン/イエロー系のアクセント3色 + 明るい背景。ヒーロー帯のみ控えめな repeating-gradient/ドットパターン背景を許可。
- フォント: Google Fonts の見出し用ポップ/レトロ系フォント（例: "Yusei Magic" や "DotGothic16"）+ 本文は "Noto Sans JP" や system-ui。
- レトロ演出は全てCSSのみで実装（`<marquee>`/`<blink>` タグは使わない）:
  - マーキー: `@keyframes` translateX、`prefers-reduced-motion: reduce` で無効化。
  - ブリンク: `@keyframes` opacity、1箇所のみ、同様に reduced-motion 対応。
  - 装飾区切り: 絵文字/記号の反復（例: `★・★・★`）や `border-image` のジグザグ。
  - カードは角丸+太めカラーボーダーで遊び心を出す。
- JavaScriptは使用しない（全アニメーションはCSS `@keyframes` で完結、アクセシビリティ的にも優れる）。

## 検証方法

1. `bundle exec jekyll serve` でローカル起動し `http://localhost:4000` で確認（GH Pagesのビルドと近い挙動）。
2. レスポンシブ確認（モバイル幅でのレイアウト崩れがないか）。
3. `prefers-reduced-motion` 有効時にマーキー/ブリンクが停止することを確認。
4. SCSSが問題なくコンパイルされること、横スクロールやレイアウトシフトが発生しないことを確認。
5. push後、GitHub の Pages ビルドステータス（Settings → Pages）でビルド成功を確認。

## トレードオフ

- 1ページのみの規模に対しフルJekyll構成（layout/config/Gemfile）はややオーバースペックだが、ユーザー希望どおりJekyllを採用。将来のページ追加が容易という利点もある。
- 参考サイトの「本物のカオスさ」（実GIF、`<marquee>`タグ、実動作の来訪者カウンター）は再現せず、CSSのみで“テイスト”を出す方針とする。

## 今後の実装ステップ（未着手）

本仕様書は設計段階の成果物であり、以下は今後の実装タスク（別途着手）:

- [ ] `_config.yml` / `Gemfile` の作成
- [ ] `_layouts/default.html` の作成
- [ ] `assets/css/style.scss` の作成
- [ ] `index.md` の作成
- [ ] ローカルでの `bundle exec jekyll serve` 動作確認
- [ ] GitHub Pages へのデプロイ確認
