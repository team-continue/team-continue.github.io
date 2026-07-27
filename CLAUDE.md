# ビルド方法

jekyllコマンドがPATHに無い場合はgemのbinを直接指定して実行する。

```
/home/yuusk/.local/share/gem/ruby/3.0.0/bin/jekyll build
```

出力先: `_site/`

ローカルサーバー起動（バックグラウンド、ポート8001）:

worktree内ではなく、必ずメインのローカルディレクトリ（`/home/yuusk/team-continue.github.io`）で起動する。

```
cd /home/yuusk/team-continue.github.io
/home/yuusk/.local/share/gem/ruby/3.0.0/bin/jekyll serve --detach --port 8001
```

停止: `pkill -f jekyll`
