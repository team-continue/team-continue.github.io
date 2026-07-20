# team-continue.github.io

ロボコンチーム「チームContinue」の公式ホームページです。
見た目は[阿部寛のホームページ](https://abehiroshi.la.coocan.jp/)風のレトロHTML（白背景・青リンク・テーブルレイアウト）で、ページ構成は `.claude/worktrees/fix-robocon-site-spec/01_site_structure_requirements.md` に従っています。

## 構成

基本はプレーンHTMLです。各URLは `ディレクトリ/index.html` で表現しています。
`/members` のみメンバー情報を `_data/members.yml` に持ち、Jekyll（GitHub Pages標準機能）でHTMLに展開しています。

| URL | ファイル |
|---|---|
| `/` | `index.html` |
| `/projects` | `projects/index.html` |
| `/projects/core2025` ほか各プロジェクト | `projects/core2025/index.html` など |
| `/projects/core2025/mechanical` などセクション | `projects/core2025/mechanical/index.html` など |
| `/projects/others` | `projects/others/index.html` |
| `/members` | `members/index.html` |
| `/links` | `links/index.html` |
| `/blog` | `blog/index.html` |
| `/blog/[slug]` | `blog/<slug>/index.html` |

## ローカル確認

```bash
python3 -m http.server 8000
# http://localhost:8000/ を開く
```

## デプロイ

`main` ブランチにpushすると、GitHub Pages（Deploy from a branch: `main` / root）がJekyllでビルドしてそのまま公開されます。
ユーザーサイト（`team-continue.github.io` 直下）なのでベースパスは `/` です。
リポジトリ名付きの `username.github.io/repository-name` で公開する場合は、各HTML内の絶対パス（`/projects/...` など）を `/repository-name/projects/...` に変更してください。

## コンテンツの追加方法

`/members` 以外はビルドシステムがなく、HTMLを直接編集します。

- **ブログ記事の追加**: `blog/<slug>/index.html` を既存記事のコピーから作成し、`blog/index.html` の一覧とトップページ（`index.html`）の最新記事欄に追記する。前後記事リンクも更新する。
- **プロジェクトの追加**: `projects/<slug>/` 配下に `index.html`（トップ）と `mechanical/` `electrical/` `software/` を作成し、`projects/index.html` と各ページ左メニューに追記する。
- **メンバーの追加**: `_data/members.yml` にメンバー1人分のエントリを追記する（`members/index.html` はテンプレートなので編集不要）。フィールドは `name` / `role` / `comment`（任意） / `team_tags`（所属班タグの配列） / `projects`（プロジェクト名の文字列配列） / `links`（`label`,`url`の配列） / `articles`（`title`,`url`の配列、空なら「まだありません」と表示）。
- **slugの命名ルール**: ディレクトリ名とページ内で参照するslugは一致させる（例: `blog/core2026-report/` のslugは `core2026-report`）。
- **draft記事の扱い**: 公開したくない記事はファイルを置かない（＝リンクも張らない）ことで対応する。
