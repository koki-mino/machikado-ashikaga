# まちかど足利 — GitHub Pages公開・更新ガイド

栃木県足利市の小さな変化を記録する、個人運営・非公式の地域メディアのホームページです。
「ホームページ＋記事アーカイブ＋noteへの入口」として制作しました。記事本文はnoteで引き続き公開します。

**HTML・CSS・JavaScriptだけで動きます。公開にNode.js、npm、有料サーバー、外部APIの設定は必要ありません。**

## まず、この3つ

1. ZIPをパソコンで展開する。
2. GitHubの `machikado-ashikaga` リポジトリに、展開したフォルダーの**中身**をアップロードする。
3. Settings → Pagesで `Deploy from a branch` / `main` / `/(root)` を選び、Save。

**初期の公開URL設定：** `https://koki-mino.github.io/machikado-ashikaga/`

以前お使いのGitHubアカウント名を初期値にしています。アカウント名やリポジトリ名が違っても、表示・検索・画像は相対パスで動作します。ただし、検索エンジンやSNS用のURLは変更が必要です。公開URLが異なる場合は、後述の「公開URLの設定」を行ってください。

## ファイル構成

| ファイル・フォルダー | 用途 | 通常の更新 |
| --- | --- | --- |
| `index.html` | ホーム・注目記事・新着記事・テーマ一覧 | 文章やメニューを変えるとき |
| `archive.html` | 記事一覧・検索・絞り込み | 原則不要 |
| `about.html` | メディア紹介・編集方針 | 紹介文を変えるとき |
| `404.html` | 存在しないページの案内 | 原則不要 |
| `data/articles.js` | 全記事のデータ | **記事を追加するとき** |
| `data/site-config.js` | noteのプロフィールURL・カテゴリー | 必要に応じて |
| `css/style.css` | 色・文字・レイアウト | 色などを変えるとき |
| `js/main.js` | カード表示・検索・メニュー | 原則不要 |
| `assets/images/` | 写真・文字だけの仮画像 | 写真を追加・変更するとき |
| `assets/icons/favicon.svg` | ブラウザーの小さなアイコン | 必要に応じて |
| `sitemap.xml` | 検索エンジン向けの公開ページ一覧 | 公開URL変更時 |
| `robots.txt` | 検索エンジン向けの案内 | 公開URL変更時 |
| `.nojekyll` | GitHub Pagesで静的ファイルをそのまま公開 | 原則不要 |
| `tools/publish-url.html` | 公開URLをまとめて変更する補助ページ | 公開URL変更時 |
| `CONTENT_SOURCES.md` | 登録記事と確認元 | 掲載情報の確認用 |
| `TEST_REPORT.md` | 動作確認の結果・確認範囲 | 納品時の記録 |
| `FUTURE.md` | 今後の機能追加メモ | 検討用 |

ZIPには完成コード、この記事追加ガイド、追加機能メモ、動作確認記録が入っています。

## GitHub Pagesで公開する方法

### 1. ZIPを展開する

1. ダウンロードしたZIPを右クリックして「すべて展開」を選びます。
2. 展開先の `machikado-ashikaga` フォルダーを開きます。
3. `index.html`、`archive.html`、`data`、`assets` などが見えることを確認します。
4. `index.html` をダブルクリックすると、公開前でも表示を確認できます。

ZIPそのものをGitHubへアップロードしても、Webサイトにはなりません。**展開後のファイルをアップロードします。**

### 2. 新しいリポジトリを作る

1. [GitHub](https://github.com/) にログインします。
2. 右上の「＋」→「New repository」を選びます。
3. Ownerは公開に使う自分のアカウントを選びます。
4. Repository nameは **`machikado-ashikaga`** と入力します。
5. 公開範囲は **Public** を選びます。GitHub Freeで公開する場合は、公開リポジトリを使います。
6. 「Add README」はオンでも構いません。あとで完成版READMEをアップロードして上書きします。
7. 「Create repository」を押します。

別のリポジトリ名でも動作します。その場合は「公開URLの設定」も行ってください。

### 3. ファイルをアップロードする

1. 作成したリポジトリの「Code」画面を開きます。
2. 「Add file」→「Upload files」を選びます。空のリポジトリでは「uploading an existing file」というリンクからも進めます。
3. 展開した `machikado-ashikaga` フォルダーの**中にあるファイルとサブフォルダー**を、まとめてドラッグします。
4. 画面下の保存先が `main` であることを確認します。
5. メモ欄に「サイトを公開」などと入力し、「Commit changes」を押します。
6. リポジトリの最上位に `index.html` があることを確認します。

外側の `machikado-ashikaga` フォルダーごとアップロードすると、リポジトリ内に余計な階層ができます。最上位が `machikado-ashikaga/index.html` にならないようにしてください。

`.nojekyll` が見当たらない場合は、GitHubの「Add file」→「Create new file」でファイル名を `.nojekyll` にし、空のファイルとして保存できます。

### 4. Pagesを有効にする

1. リポジトリ上部の **Settings** を開きます。
2. 左メニューから **Pages** を選びます。
3. 「Build and deployment」の「Source」を **Deploy from a branch** にします。
4. 「Branch」を **main** にします。
5. フォルダーを **/(root)** にします。
6. **Save** を押します。
7. しばらく待って同じ画面を更新します。「Visit site」や公開URLが表示されたら開きます。

公開URLは通常、`https://アカウント名.github.io/リポジトリ名/` です。設定してすぐではなく、反映に数分〜10分ほどかかる場合があります。

### 5. 公開直後に確認する

- スマートフォンでホームを開く。
- メニューから「記事一覧」「まちかど足利について」に移動する。
- 「花の湯」などで検索して記事が出ることを確認する。
- 記事カードを押して、該当するnote記事が開くことを確認する。
- `公開URL/sitemap.xml` を開き、URLが自分の公開URLであることを確認する。

## 公開URLの設定（アカウント名・リポジトリ名が違う場合）

初期値は `https://koki-mino.github.io/machikado-ashikaga/` です。同じURLを使う場合は、この作業は不要です。

1. パソコンの完成コードフォルダーにある `tools/publish-url.html` をダブルクリックします。
2. 「フォルダーを選択」で、**いま使っているサイトのフォルダー全体**を選びます。
3. Settings → Pagesに表示された公開URLを入力します。末尾は `/` にし、`index.html` は付けません。
4. 「設定済みファイルをダウンロード」を押します。
5. `machikado-ashikaga-url-settings.zip` を展開します。
6. 中の7ファイルを、元のサイトフォルダーへ**上書きコピー**します。`data/site-config.js` は `data` の中へコピーしてください。
7. 上書き後のファイルをGitHubへアップロードし、「Commit changes」で保存します。

トップ・一覧・紹介ページのcanonical／OGP URL／WebSite構造化データ、404の戻り先設定、設定ファイル、sitemap、robotsがまとめて更新されます。記事データと写真は変更されません。選んだファイルの内容はブラウザー内で処理され、外部へ送信されません。

**公開URLの変更後も、補助ページには初期値が表示されます。変更のたびに現在の公開URLを入力してください。**

## 新しいnote記事を追加する方法

通常は、**`data/articles.js` だけ**を編集します。写真を使う場合は画像ファイルも追加します。
noteへの投稿だけでは、このサイトへ自動登録されません。noteの外部APIやRSSを閲覧者のブラウザーから取得する構成にはしていません。

### GitHubの画面で追加する

1. noteに新しい記事を投稿し、その記事のURLをコピーします。
2. GitHubで `data` → `articles.js` を開きます。
3. 鉛筆マーク「Edit this file」を押します。
4. 既存の `{` から `}` までの1記事分をコピーします。
5. `window.MACHIKADO_ARTICLES = [` のすぐ下へ貼り付けます。
6. タイトル・日付・カテゴリー・概要・URL・タグを書き換えます。
7. `id` は他の記事と重複しない名前にします。noteのURL末尾の `n〜` を使うと分かりやすくなります。
8. 記事の終わりの `}` の後に、次の記事を区切るカンマ `,` を入れます。
9. 「Commit changes」で保存します。
10. 公開サイトを更新して表示を確認します。

新しい順は `date` で自動並び替えされます。同じ公開日の記事は、データファイルに書いた順で表示します。

### 1記事分のテンプレート

以下は**書き方の例**です。完成サイトの表示データには入っていません。実際の内容・URLへ書き換えて追加してください。

```javascript
  {
    "id": "noteのURL末尾のnから始まる文字列",
    "title": "実際のnote記事のタイトル",
    "date": "2026-10-05",
    "category": "change",
    "description": "記事の概要を100〜150文字程度で書きます。出来事だけでなく、誰が支えているか、以前と何が変わったか、足利とのつながりなど、本文で確認できる背景を短く紹介します。",
    "image": "assets/images/placeholder-change.svg",
    "imageAlt": "",
    "imageIsPlaceholder": true,
    "noteUrl": "https://note.com/joyous_daisy1459/n/実際の記事ID",
    "tags": ["場所の名前", "テーマ"],
    "featured": false
  },
```

- `date` は **年4桁-月2桁-日2桁**です。例：`2026-10-05`。
- `featured: true` にすると「注目の記事」候補になります。新しい順で最大2件表示します。候補が0件なら最新2件を表示します。
- トップの「新着記事」は最新6件、記事一覧は全件表示します。
- `tags` はキーワード検索の対象です。独立したタグ絞り込み画面はありません。
- イベント記事では任意で `"eventDate": "2026-10-10"` を追加できます。この日を過ぎると「過去の開催予定を紹介した記事です」と表示します。複数日開催は終了日を入れます。
- 過去のイベント記事は削除せず、公開当時の記録として残せます。
- 空のタイトル、存在しない日付、重複ID、未登録カテゴリー、不正なURLの記事は表示されません。

### カテゴリー一覧

`category` には、表示名ではなく左側のIDを入れます。

| ID | サイトでの表示 | 仮画像 |
| --- | --- | --- |
| `town` | まちの出来事 | `placeholder-town.svg` |
| `people` | 人 | `placeholder-town.svg` |
| `shops` | お店 | `placeholder-shops.svg` |
| `culture` | 文化・歴史 | `placeholder-culture.svg` |
| `life` | 暮らし | `placeholder-life.svg` |
| `events` | イベント | `placeholder-events.svg` |
| `change` | まちの変化 | `placeholder-change.svg` |

カテゴリーを増やすときは `data/site-config.js` の `categories` に1件追加します。記事一覧の選択肢とトップのテーマ一覧に反映されます。

## 写真を変更する方法

仮画像はこのサイト用に作成した、単色と文字だけのSVGです。第三者の写真・noteの画像は同梱していません。実際の場所を撮影した写真だと誤解されないよう「写真準備中」と表示しています。

**推奨サイズ：1200×800px（横3：縦2）。** JPGまたはWebPを推奨します。1枚200〜400KB程度を目安に縮小すると、スマートフォンでも軽く表示できます。

例：花の湯の記事へ写真を追加する場合

1. 自分で撮影した写真を `hananoyu-2026.jpg` のような半角英数字の名前にします。
2. GitHubの `assets/images` を開き、「Add file」→「Upload files」から写真をアップロードします。
3. `data/articles.js` の該当記事を、次の3項目だけ変更します。

```javascript
    "image": "assets/images/hananoyu-2026.jpg",
    "imageAlt": "巴町にある銭湯・花の湯の外観",
    "imageIsPlaceholder": false,
```

4. 「Commit changes」で保存します。
5. 公開サイトで写真が出て、「写真準備中」の文字が消えたことを確認します。

画像名の大文字・小文字も区別されます。`Photo.JPG` と `photo.jpg` は別の名前です。画像の中央を基準に切り抜くため、重要な被写体は中央付近に置くと安定します。

`imageAlt` には写真から伝わる内容を短く書きます。写真に写っていない情報は加えません。仮画像は周囲のタイトル・カテゴリーと重複する装飾なので、`imageAlt` は空欄にしています。

自分で撮影した写真でも、人物の掲載同意や、展示物・施設の撮影／掲載条件などを確認して使用してください。

## メニューを変更する方法

メニューは `index.html`・`archive.html`・`about.html` の各ページにあります。

1. 変更したいHTMLを開きます。
2. `id="site-navigation"` の直後にあるリンクを探します。
3. 表示名はリンクの文字、移動先は `href="..."` の中を変更します。
4. 同じ変更を3ページへ反映します。フッターのリンクも必要に応じて変更します。
5. 404ページの主な戻り先を変える場合は `404.html` も変更します。

JavaScriptがなくてもナビゲーションを表示できるよう、各ページにメニューを置いています。ページを追加するときは、既存の `about.html` をコピーすると基本構造を引き継げます。

## 色を変更する方法

`css/style.css` の先頭の `:root` にある色を変更します。

| 項目 | 初期値 | 用途 |
| --- | --- | --- |
| `--paper` | `#f8f6ef` | ページの背景 |
| `--surface` | `#fffefa` | カード・入力欄の背景 |
| `--ink` | `#23332c` | 主な文字 |
| `--muted` | `#5b635d` | 概要・補足文字 |
| `--accent` | `#254d3b` | 緑のボタン・リンク・ロゴ |
| `--rust` | `#9a482b` | 見出し補助・フォーカス表示 |

文字と背景のコントラストを保ってください。404と公開URL設定ページは、深いURLやローカルファイルでも表示できるよう、独立したCSSを持っています。そちらも色を合わせる場合は各HTMLの `<style>` を変更します。仮画像の色は各SVGに設定しています。

## ロゴ・アイコンの変更

現在のロゴは文字とCSSのシンプルな角形の印です。画像ロゴに変える場合は `assets/images/logo.svg` などを置き、各ページの `<a class="brand">` 内を画像に差し替えます。画像の `alt` は「まちかど足利」にしてください。

ブラウザーの小さなアイコンは `assets/icons/favicon.svg` を差し替えます。404は同じ印をHTMLへ埋め込んでいるため、そちらも変更してください。

## note URLを変更する方法

- メディア全体の「noteで読む」ボタン：`data/site-config.js` の `noteUrl` を変更します。
- 個別の記事リンク：`data/articles.js` の各記事の `noteUrl` を変更します。
- JavaScript無効時にも新URLへ案内する場合：各HTMLの `data-note-link` の `href` と `<noscript>` 内のリンク、404のnoteリンクも変更します。

記事カードのnote URLは `https://note.com/` のURLのみ有効です。

## SEO・SNS共有について

- ページごとにtitle、description、OGP、X用の基本情報、canonicalを設定しています。
- ホームに `WebSite` の構造化データを設定しています。行政機関や公式ニュース組織としての設定はありません。
- トップのcanonicalは末尾 `/` のホームURLです。検索や絞り込みのURLは記事一覧のcanonicalへ統一します。
- sitemapにはホーム・記事一覧・紹介ページを載せています。404と運営者用の補助ページはnoindexです。
- GitHub PagesのプロジェクトURLでは、同梱のrobots.txtは `/machikado-ashikaga/robots.txt` のような下位階層に置かれます。検索エンジンが読むrobots.txtはホストの最上位にあるファイルなので、同梱ファイルのSitemap指定による自動発見は前提にしていません。必要に応じて検索サービスの管理画面へsitemap.xmlのURLを登録してください。独自ドメインのルートで公開する場合は、同梱robots.txtがルートに置かれます。
- SNS共有専用画像は同梱していません。画像表示が必要になったら、所有する写真やロゴで横1200×縦630px程度の画像を用意し、絶対URLを `og:image` と `twitter:image` に設定できます。
- 記事カードの概要はJavaScriptで表示します。JavaScriptを実行しない検索サービスには全記事の内容は伝わらないため、将来サイト内に本文を載せる際は静的HTMLの記事ページも作る構成を推奨します。

## 困ったときの確認箇所

| 症状 | 確認すること |
| --- | --- |
| GitHub Pagesが404になる | 最上位に `index.html` があるか。Pagesが `main` / `/(root)` か。反映を待ったか。 |
| サイトが公開されない | リポジトリの「Actions」でPagesの公開処理が成功しているか。Settings → Pagesにエラーがないか。 |
| 白い画面、装飾が出ない | `css`・`js`・`data`・`assets` もアップロードしたか。フォルダー名が変わっていないか。 |
| 記事がすべて消えた | `data/articles.js` の `[`、`]`、`{`、`}`、`"`、`,` が崩れていないか。最後が `];` で終わっているか。 |
| 追加した1件だけ出ない | IDの重複、カテゴリーID、日付の桁・実在する日付、note URLを確認。 |
| noteの新記事がサイトに出ない | note投稿後、`data/articles.js` に記事情報を追加したか。自動同期ではありません。 |
| 画像が出ない | ファイルの場所、名前、大文字・小文字が一致するか。登録画像は `assets/images/` 内へ。 |
| 仮画像のままになる | 指定した画像がないと仮画像へ戻ります。`image` のパスを確認。 |
| 写真準備中の文字が残る | `imageIsPlaceholder` を `false` にしたか。 |
| 検索結果が0件 | 「条件をクリア」を押す。単語を短くする。カテゴリーが意図どおりか確認。 |
| メニューが出ない | `js/main.js` があるか。画面幅900px以上では通常の横メニューです。 |
| 更新が見えない | 数分待って再読み込み。PCならCtrl＋F5、スマホならページを更新。保存したブランチが `main` か確認。 |
| 他のURLへ転送されるように検索される | canonical・sitemapなどの公開URLが初期値のままか。「公開URLの設定」を実施。 |

GitHubで編集に失敗した場合は、そのファイルの「History」から直前の内容を確認して戻せます。元の完成ZIPも控えとして保管してください。

## 将来、独自ドメインを使用する場合

1. 自分で希望するドメインを取得します。`machikado-ashikaga.jp` は候補の例で、取得済み・使用可能とは限りません。
2. GitHub公式の手順を見ながら、ドメイン事業者のDNSとSettings → Pagesの「Custom domain」を設定します。
3. ドメイン所有権を検証し、HTTPSが有効になったことを確認します。
4. `tools/publish-url.html` で新しいホームURLを設定し、設定済みファイルを反映します。
5. GitHub PagesのURLと独自ドメインの両方から、ページと写真を確認します。

現時点では **CNAMEファイルを設定していません**。取得していないドメインへ接続する設定は入れていません。

## 将来、サイト内へ記事本文を載せる場合

各記事の `id` を固定して運用してください。後から `articles/記事ID.html` のような静的記事ページを作成し、該当データに次の任意項目を追加できます。

```javascript
    "articleUrl": "articles/記事ID.html",
```

この項目があると記事カードはサイト内のページへ移動し、「記事を読む」と表示します。元の `noteUrl` は残して併用できます。本文ページを実際に作成してから指定してください。現時点ではサイト内本文ページは作成していません。

画像や内部リンクは、新しいページの階層に合わせて設定してください。共通スクリプトは自分の配置場所からサイトのルートを求めるため、カードの画像・リンクは下位ページにも対応できます。公開した本文ページはsitemapにも追加してください。

## 確認元

GitHub Pagesの公開方法は、制作時にGitHub公式ドキュメントを確認しました（2026年10月3日）。詳しい記事確認元は `CONTENT_SOURCES.md` を参照してください。

- [GitHub Pagesの公開元を設定する](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pagesサイトを作成する](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [独自ドメインを管理する](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Google：robots.txtの作成と配置](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
