# team-continue.github.io

ロボコンチーム team-continue の公式サイトです。[Astro](https://astro.build/) で構築し、GitHub Pages で公開しています。

## 開発環境

- Node.js 22 以上
- npm

## セットアップ

```bash
npm install
```

## ローカル起動

```bash
npm run dev
```

`http://localhost:4321` で開発サーバーが起動します。

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが生成されます。`npm run preview` でビルド結果を確認できます。

## デプロイ (GitHub Pages)

`main` ブランチに push すると、GitHub Actions (`.github/workflows/deploy.yml`) が自動でビルドして GitHub Pages にデプロイします。

初回のみ、リポジトリの **Settings → Pages → Source** を **GitHub Actions** に設定してください。

### ベースパス設定

GitHub Pages で `username.github.io/repository-name` に公開する場合は、`astro.config.mjs` のベースパスを `/repository-name/` に設定してください。

`username.github.io` 直下に公開する場合は、ベースパスを `/` にしてください (このリポジトリは組織サイト直下公開のため `/` のままで OK)。

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repository-name/', // リポジトリサイトの場合のみ
});
```

## コンテンツの追加方法

コンテンツはすべて `src/content/` 配下の frontmatter 付き Markdown で管理します。

### slug の命名ルール

**ファイル名と frontmatter の `slug` は一致させてください。**
例: `core2026-report.md` の `slug` は `core2026-report` にしてください。

### ブログ記事の追加

`src/content/blog/` に Markdown ファイルを追加します。

```yaml
---
title: 記事タイトル
slug: article-slug        # ファイル名と一致させる
date: 2026-07-01
author: 山田 太郎
authorSlug: yamada        # members の slug と一致させる
project: core2026         # 任意。関連プロジェクトの slug
category: ソフトウェア     # 活動報告 | メカ | 回路・電装 | ソフトウェア | 大会レポート
tags: [ROS 2, 自律移動]
summary: 一覧カードに表示される概要文。
heroImage: /images/xxx.png # 任意
draft: false
---

本文を Markdown で書きます。
```

#### draft 記事の扱い

`draft: true` の記事は、記事ページ自体が生成されず、ブログ一覧・HOME の最新記事・検索結果・関連記事・前後記事リンクなど**すべての表示箇所から除外**されます。公開するときは `draft: false` にしてください。

### プロジェクトの追加

`src/content/projects/` に Markdown ファイルを追加します (`others` は固定ページのため追加しないでください)。

```yaml
---
title: CoRE 2027
slug: core2027
year: 2027
competition: CoRE (The Championship of Robotics Engineers)
concept: プロジェクトのコンセプト
summary: 詳細ページ用の概要
description: 一覧カード用の短い説明
tags: [CoRE, ROS 2]
members: [yamada, suzuki]  # members の slug
github: https://github.com/team-continue  # 任意
order: 1                   # 一覧での表示順 (小さいほど先頭)
---

本文には「プロジェクト概要」「競技課題の概要」「ロボットの特徴」を Markdown で書きます。
```

プロジェクトを追加すると、ドロワーメニューとプロジェクト一覧に自動で反映されます。

### プロジェクトセクション (メカ / 回路・電装 / ソフトウェア) の追加

`src/content/project-sections/` に `プロジェクトslug-セクション名.md` の形式で追加します。

```yaml
---
title: CoRE 2027 メカ
project: core2027          # 対象プロジェクトの slug
section: mechanical        # mechanical | electrical | software
summary: 一覧カード用の概要
tags: [メカナムホイール]
order: 1
---

足回り・発射機構・電源系統・ROS 2 構成などの詳細を、章立ての Markdown で書きます。
画像は本文中に Markdown 画像として埋め込めます。
```

### メンバーの追加

`src/content/members/` に Markdown ファイルを追加します (本文は不要、frontmatter のみ)。

```yaml
---
name: 山田 太郎
slug: yamada               # ブログ記事の authorSlug と対応
role: メカ担当
photo: /images/yamada.png  # 任意。省略時はプレースホルダー表示
bio: 自己紹介文。
tags: [機械設計, CAD]
github: https://github.com/xxx  # 任意
x: https://x.com/xxx            # 任意
projects: [core2025, core2026]  # 担当プロジェクトの slug
order: 1
---
```

## ディレクトリ構成

```txt
src/
├─ pages/       # ルーティング (URL に対応)
├─ content/     # コンテンツデータ (Markdown)
├─ components/  # 共通コンポーネント (Header, DrawerMenu, SearchModal など)
├─ layouts/     # 共通レイアウト
├─ lib/         # コンテンツ取得・共通ロジック
└─ styles/      # グローバル CSS
```
