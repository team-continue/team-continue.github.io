# ビルド方法

jekyllコマンドがPATHに無い場合はgemのbinを直接指定して実行する。

```
/home/yuusk/.local/share/gem/ruby/3.0.0/bin/jekyll build
```

出力先: `_site/`

ローカルサーバー起動（バックグラウンド、ポート8001）:

```
/home/yuusk/.local/share/gem/ruby/3.0.0/bin/jekyll serve --detach --port 8001
```

停止: `pkill -f jekyll`

# 更新履歴

`main` へpushする際は、`index.html` の「■更新履歴」テーブルに `<tr><td>YYYY.MM.DD</td><td>内容</td></tr>` を1行追記する（内容は1行で簡潔に）。
テーブルに表示するのは最新5件のみ。5件を超えた古い行は削除せず、テーブル直下のHTMLコメントに退避する。
