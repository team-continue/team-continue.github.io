# ロボコンチーム公式サイト 構成要件書

## 1. 目的

ロボコンチームの公式サイトとして、以下の情報を整理して掲載できるWebサイトを作成する。

- チームの概要
- CoRE 2025 / CoRE 2026 などの主要プロジェクト
- メカ、回路・電装、ソフトウェアの技術情報
- メンバー紹介
- SNS・関連リンク
- 技術ブログ
- GitHub Pagesで公開可能な静的サイト

---

## 2. サイト全体構成

サイト全体は以下の構成とする。

```txt
HOME
├─ PROJECT
│   ├─ CoRE 2025
│   │   ├─ トップ
│   │   ├─ メカ
│   │   ├─ 回路・電装
│   │   └─ ソフトウェア
│   ├─ CoRE 2026
│   │   ├─ トップ
│   │   ├─ メカ
│   │   ├─ 回路・電装
│   │   └─ ソフトウェア
│   └─ その他プロジェクト
├─ MEMBERS
├─ SNS・LINK
└─ BLOG
    └─ （個別記事は `blog` コンテンツデータから動的生成、固定メニュー項目ではない）
```

BLOG配下の「〇〇をしました」「CoRE 2026 参加レポート」は、固定のナビゲーション項目ではなく `blog` コンテンツデータ（11.4のサンプル記事）から動的に生成される記事ページの例である。ドロワーメニュー（別紙 02章 6.）にはBLOG個別記事へのリンクを含めない。

---

## 3. URL構成

以下のURL構成にする。

| URL | ページ |
|---|---|
| `/` | HOME |
| `/projects` | プロジェクト一覧 |
| `/projects/core2025` | CoRE 2025 トップ |
| `/projects/core2025/mechanical` | CoRE 2025 メカ |
| `/projects/core2025/electrical` | CoRE 2025 回路・電装 |
| `/projects/core2025/software` | CoRE 2025 ソフトウェア |
| `/projects/core2026` | CoRE 2026 トップ |
| `/projects/core2026/mechanical` | CoRE 2026 メカ |
| `/projects/core2026/electrical` | CoRE 2026 回路・電装 |
| `/projects/core2026/software` | CoRE 2026 ソフトウェア |
| `/projects/others` | その他プロジェクト |
| `/members` | メンバー紹介 |
| `/links` | SNS・LINK |
| `/blog` | ブログ記事一覧 |
| `/blog/[slug]` | 各ブログ記事 |

---

## 4. ルーティング方針

### 4.1 通常プロジェクト

通常プロジェクトとして扱う対象は以下とする。

- CoRE 2025
- CoRE 2026

通常プロジェクトは、以下の4ページ構成とする。

- トップ
- メカ
- 回路・電装
- ソフトウェア

---

### 4.2 その他プロジェクト

`/projects/others` は通常プロジェクト詳細ページではなく、固定ページとして扱う。

通常プロジェクトデータには `others` を含めない。

これにより、以下のURLが通常プロジェクト詳細ページと固定ページの両方から重複生成されないようにする。

```txt
/projects/others
```

---

## 5. slug管理ルール

各コンテンツにはURL生成に使用する `slug` を持たせる。

データファイル名と `slug` は一致させる。

例：

```txt
projects/core2025.md
```

```yaml
slug: core2025
```

例：

```txt
blog/core2026-report.md
```

```yaml
slug: core2026-report
```

README.mdにも以下のルールを明記する。

```md
ファイル名とfrontmatterのslugは一致させてください。
例：core2026-report.md の slug は core2026-report にしてください。
```

---

## 6. 表示名と内部値の対応

URLやデータ管理では英語の内部値を使い、画面表示では日本語の表示名を使う。

### 6.1 プロジェクトセクション

| 内部値 | URL | 表示名 |
|---|---|---|
| `overview` | `/projects/[slug]` | トップ |
| `mechanical` | `/projects/[slug]/mechanical` | メカ |
| `electrical` | `/projects/[slug]/electrical` | 回路・電装 |
| `software` | `/projects/[slug]/software` | ソフトウェア |

### 6.2 ブログカテゴリ

ブログカテゴリは以下とする。

- 活動報告
- メカ
- 回路・電装
- ソフトウェア
- 大会レポート

### 6.3 プロジェクトセクションとブログカテゴリの対応

| プロジェクトセクション | 対応するブログカテゴリ |
|---|---|
| `mechanical` | メカ |
| `electrical` | 回路・電装 |
| `software` | ソフトウェア |

---

## 7. 各ページの構成要件

### 7.1 HOME

HOMEには以下を配置する。

- チーム名
- キャッチコピー
- 簡単なチーム紹介
- 印象的なメインビジュアル
- 主要プロジェクトへのリンク
- 最新ブログ記事3件
- MEMBERSページへのリンク
- SNS・LINKページへのリンク
- GitHubへのリンク

HOMEのファーストビューには以下を配置する。

- 大きな見出し
- 短い説明文
- CTAボタン

CTAボタン例：

- PROJECTを見る
- BLOGを見る
- GitHubを見る

HOMEに表示する最新ブログ記事では、`draft: true` の記事を除外する。

---

### 7.2 PROJECT一覧ページ

`/projects` では、各プロジェクトをカード形式で表示する。

表示対象は以下とする。

- CoRE 2025
- CoRE 2026
- その他プロジェクト

ただし、通常プロジェクトデータとして管理するのは以下のみとする。

- CoRE 2025
- CoRE 2026

`その他プロジェクト` は固定ページとして扱う。

各プロジェクトカードには以下を表示する。

- プロジェクト名
- 年度
- 大会名
- 概要
- サムネイル画像
- 使用技術タグ
- 詳細ページへのリンク

画像がない場合はプレースホルダー画像を表示する。

---

### 7.3 プロジェクトトップページ

対象ページ：

- `/projects/core2025`
- `/projects/core2026`

プロジェクトトップページには以下を配置する。

- プロジェクト名
- 大会名
- 年度
- コンセプト
- ロボット全体写真
- プロジェクト概要
- 競技課題の概要
- ロボットの特徴
- 担当メンバー
- GitHubリポジトリへのリンク
- メカ / 回路・電装 / ソフトウェアページへの導線
- 関連ブログ記事一覧

プロジェクトトップページは、そのプロジェクトの全体像がわかるページにする。

関連ブログ記事は、以下の条件を満たすものを表示する。

- `blog.project === project.slug`
- `blog.draft !== true`

---

### 7.4 メカページ

対象ページ：

- `/projects/core2025/mechanical`
- `/projects/core2026/mechanical`

メカページには以下を配置する。

- ロボット全体の機械構成
- 足回り
- 発射機構
- 使用した主要部品
- CAD画像または写真
- 設計コンセプト
- 関連ブログ記事一覧

関連ブログ記事は、以下の条件を満たすものを表示する。

- `blog.project === project.slug`
- `blog.category === "メカ"`
- `blog.draft !== true`

---

### 7.5 回路・電装ページ

対象ページ：

- `/projects/core2025/electrical`
- `/projects/core2026/electrical`

回路・電装ページには以下を配置する。

- 電源系統
- 制御基板
- モータドライバ
- センサ構成
- 配線構成
- 通信方式
- 使用した主要部品
- 回路図または配線図
- 関連ブログ記事一覧

関連ブログ記事は、以下の条件を満たすものを表示する。

- `blog.project === project.slug`
- `blog.category === "回路・電装"`
- `blog.draft !== true`

---

### 7.6 ソフトウェアページ

対象ページ：

- `/projects/core2025/software`
- `/projects/core2026/software`

ソフトウェアページには以下を配置する。

- ソフトウェア全体構成
- 使用OS
- 使用フレームワーク
- ROS 2構成
- ノード構成
- トピック構成
- TF構成
- 自己位置推定
- 経路計画
- 制御
- UI / GUI
- シミュレータ
- 開発環境
- GitHubリポジトリへのリンク
- 関連ブログ記事一覧

関連ブログ記事は、以下の条件を満たすものを表示する。

- `blog.project === project.slug`
- `blog.category === "ソフトウェア"`
- `blog.draft !== true`

CoRE 2026のソフトウェアページでは、以下の要素をサンプルとして含める。

- ROS 2
- LiDAR
- local_costmap_builder
- path_planner
- path_follower
- body_controller
- shooter
- UI / GUI

---

### 7.7 その他プロジェクトページ

対象ページ：

- `/projects/others`

その他プロジェクトページでは、その他プロジェクトをカード形式またはセクション形式で表示する。

以下のような内容を仮データとして表示する。

- 小規模な試作
- 技術検証
- 勉強会
- 制御実験
- センサ検証
- 過去の活動

`/projects/others` は通常プロジェクトデータから自動生成しない。

---

### 7.8 MEMBERSページ

対象ページ：

- `/members`

メンバーをカード形式で表示する。

各メンバーには以下を表示する。

- 名前
- 写真
- 役割
- Bio
- 得意分野タグ
- 担当プロジェクト（`projects` フィールドに指定した `slug` から、対応する `projects` データのプロジェクト名を解決し、`/projects/[slug]` へのリンク付きで表示する）
- GitHub / Xなどのリンク
- そのメンバーが書いたブログ記事へのリンク

初期データとして、仮のメンバーを3〜5人分作成する。

メンバーとブログ記事の紐づけには `authorSlug` を使う。

メンバー側：

```yaml
name: 山田 太郎
slug: yamada
```

ブログ側：

```yaml
author: 山田 太郎
authorSlug: yamada
```

メンバーの `slug` とブログ記事の `authorSlug` が一致するブログ記事を、そのメンバーが書いた記事として表示する。

`draft: true` の記事は表示しない。

---

### 7.9 SNS・LINKページ

対象ページ：

- `/links`

SNSや関連リンクをカード形式で表示する。

以下のリンク項目を用意する。

- GitHub
- X
- 連絡先
- 関連大会ページ

リンク先は仮URLでよい。

---

### 7.10 BLOG一覧ページ

対象ページ：

- `/blog`

ブログ記事を新しい順にカード形式で表示する。

各ブログカードには以下を表示する。

- タイトル
- 投稿日
- 著者
- 概要
- カテゴリ
- 関連プロジェクト
- タグ
- サムネイル画像
- 記事ページへのリンク

カテゴリで絞り込めるUIも実装する。

カテゴリは以下とする。

- 活動報告
- メカ
- 回路・電装
- ソフトウェア
- 大会レポート

`draft: true` の記事は表示しない。

ブログ記事は `date` の新しい順に並べる。

---

### 7.11 ブログ記事ページ

対象ページ：

- `/blog/[slug]`

各ブログ記事ページには以下を表示する。

- タイトル
- 投稿日
- 著者
- カテゴリ
- 関連プロジェクト
- タグ
- 本文
- 関連記事
- 前後の記事へのリンク

ブログ記事本文はMarkdownで管理できるようにする。

関連記事は、以下の条件で表示する。

- 同じ `project` を持つ記事
- または同じ `category` を持つ記事
- `draft: true` ではない記事
- 現在表示中の記事自身は除外する

前後の記事リンクは、`draft: true` の記事を除外した公開記事のみを対象にする。

---

## 8. コンテンツデータ定義

以下の4種類のコンテンツデータを定義する。

- `projects`
- `projectSections`
- `members`
- `blog`

データ形式は、frontmatter付きMarkdownを基本とする（JSON、YAMLなど、実装しやすい形式で代替してもよい）。

`projects` / `projectSections` / `blog` は、frontmatterに定義したfields（一覧表示や構造化データに使う短い値）に加えて、Markdown本文（body）を持つ。本文には、fieldsに収まらない長文の説明を記述する。

- `projects` の本文には、7.3プロジェクトトップページの「プロジェクト概要」「競技課題の概要」「ロボットの特徴」に相当する内容を記述する。
- `projectSections` の本文には、7.4〜7.6（メカ／回路・電装／ソフトウェアページ）で要求される各項目（足回り、発射機構、電源系統、制御基板、ROS 2構成、ノード構成など）を、章立てのMarkdownとして記述する。ページ内に複数の画像・CAD画像・回路図を掲載する場合も、本文中にMarkdown画像として埋め込む（`heroImage` はカード表示・OGP等に使う代表1枚のみを担う）。
- `blog` の本文はこれまで通りMarkdownで管理する。

`members` はfieldsのみで完結し、本文は持たない。

---

### 8.1 projects

`projects` は、CoRE 2025 / CoRE 2026 のような主要プロジェクトを管理する。

`others` は含めない。

fields:

- `title`: string
- `slug`: string
- `year`: number
- `competition`: string
- `concept`: string
- `summary`: string
- `description`: string（一覧・カード表示用の短い概要。詳細な本文はMarkdown bodyに記述する）
- `heroImage`: string, optional
- `tags`: string[]
- `members`: string[]
- `github`: string, optional
- `order`: number

---

### 8.2 projectSections

`projectSections` は、各プロジェクトのメカ、回路・電装、ソフトウェアページを管理する。

fields:

- `title`: string
- `project`: string
- `section`: `mechanical` | `electrical` | `software`
- `summary`: string（一覧・カード表示用の短い概要。足回りや制御基板などの詳細説明はMarkdown bodyに記述する）
- `heroImage`: string, optional
- `tags`: string[]
- `order`: number

`project` には、対象プロジェクトの `slug` を指定する。

例：

```yaml
project: core2026
section: software
```

---

### 8.3 members

fields:

- `name`: string
- `slug`: string
- `role`: string
- `photo`: string, optional
- `bio`: string
- `tags`: string[]
- `github`: string, optional
- `x`: string, optional
- `projects`: string[]
- `order`: number

---

### 8.4 blog

fields:

- `title`: string
- `slug`: string
- `date`: date
- `author`: string
- `authorSlug`: string
- `project`: string, optional
- `category`: `活動報告` | `メカ` | `回路・電装` | `ソフトウェア` | `大会レポート`
- `tags`: string[]
- `summary`: string
- `heroImage`: string, optional
- `draft`: boolean

`project` は任意とする。

プロジェクトに紐づかない活動報告や告知記事では、`project` を省略してよい。

---

## 9. 任意項目の扱い

以下の項目は任意項目として扱う。

- `heroImage`
- `photo`
- `github`
- `x`
- `project`

画像がない場合は、プレースホルダー画像またはCSSで作成したプレースホルダー表示を使う。

GitHubやXのリンクがない場合は、該当リンクを非表示にする。

---

## 10. データの紐づけ

### 10.1 プロジェクトページ

条件：

- `blog.project === project.slug`
- `blog.draft !== true`

### 10.2 メカページ

条件：

- `blog.project === project.slug`
- `blog.category === "メカ"`
- `blog.draft !== true`

### 10.3 回路・電装ページ

条件：

- `blog.project === project.slug`
- `blog.category === "回路・電装"`
- `blog.draft !== true`

### 10.4 ソフトウェアページ

条件：

- `blog.project === project.slug`
- `blog.category === "ソフトウェア"`
- `blog.draft !== true`

### 10.5 メンバー紹介ページ

条件：

- `member.slug === blog.authorSlug`
- `blog.draft !== true`

### 10.6 ブログ一覧

条件：

- `draft: true` の記事を表示しない
- `date` の新しい順に並べる
- カテゴリ絞り込みを実装する

### 10.7 draft記事の除外範囲

`draft: true` のブログ記事は、以下すべてに表示しない。

- ブログ一覧
- HOMEの最新記事
- 検索結果
- プロジェクト関連ブログ
- プロジェクトセクション関連ブログ
- メンバー別ブログ記事
- 関連記事
- 前後の記事リンク

---

## 11. サンプルデータ要件

### 11.1 サンプルプロジェクト

以下のプロジェクトデータを作成する。

- CoRE 2025
- CoRE 2026

### 11.2 サンプルプロジェクトセクション

以下のプロジェクトセクションデータを作成する。

- CoRE 2025 メカ
- CoRE 2025 回路・電装
- CoRE 2025 ソフトウェア
- CoRE 2026 メカ
- CoRE 2026 回路・電装
- CoRE 2026 ソフトウェア

### 11.3 サンプルメンバー

仮のメンバーを3〜5人分作成する。

### 11.4 サンプルブログ記事

以下のサンプルブログ記事をMarkdownで作成する。

1. `〇〇をしました`
2. `CoRE 2026 参加レポート`

本文は仮でよいが、ロボコンチームの技術ブログとして自然な内容にする。

ファイル名とslug、および主要frontmatter値は以下にする。

```txt
blog/did-something.md
```

```yaml
slug: did-something
category: 活動報告
project: （省略。特定プロジェクトに紐づかない活動報告として扱う）
author: 11.3で作成したメンバーのいずれか1名
authorSlug: 対応するメンバーのslug
draft: false
```

```txt
blog/core2026-report.md
```

```yaml
slug: core2026-report
category: 大会レポート
project: core2026
author: 11.3で作成したメンバーのいずれか1名
authorSlug: 対応するメンバーのslug
draft: false
```

---

## 12. 推奨ディレクトリ構成

実装技術に合わせて拡張子や細部は変更してよい。

ただし、ページ、コンポーネント、レイアウト、コンテンツデータは分離する。

```txt
src/
├─ pages/
│   ├─ home
│   ├─ projects/
│   │   ├─ index
│   │   ├─ others
│   │   └─ [slug]/
│   │       ├─ index
│   │       ├─ mechanical
│   │       ├─ electrical
│   │       └─ software
│   ├─ members
│   ├─ links
│   └─ blog/
│       ├─ index
│       └─ [slug]
│
├─ content/
│   ├─ projects/
│   │   ├─ core2025.md
│   │   └─ core2026.md
│   ├─ project-sections/
│   │   ├─ core2025-mechanical.md
│   │   ├─ core2025-electrical.md
│   │   ├─ core2025-software.md
│   │   ├─ core2026-mechanical.md
│   │   ├─ core2026-electrical.md
│   │   └─ core2026-software.md
│   ├─ members/
│   │   ├─ member1.md
│   │   ├─ member2.md
│   │   └─ member3.md
│   └─ blog/
│       ├─ did-something.md
│       └─ core2026-report.md
│
├─ components/
│   ├─ Header
│   ├─ DrawerMenu
│   ├─ SearchModal
│   ├─ Footer
│   ├─ ProjectCard
│   ├─ ProjectNav
│   ├─ MemberCard
│   ├─ BlogCard
│   ├─ Tag
│   ├─ SectionTitle
│   └─ HeroSection
│
├─ layouts/
│   ├─ BaseLayout
│   ├─ ProjectLayout
│   ├─ ProjectSectionLayout
│   └─ BlogLayout
│
└─ styles/
    └─ global
```
