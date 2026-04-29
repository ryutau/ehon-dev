# えほんの森 Webサイト

絵本の読み聞かせと地域の親子のつどいを発信する、えほんの森の公式サイトです。
Astro + microCMS + GitHub Pages で運用しています。

## 1. 技術構成

| 領域 | 技術 |
| --- | --- |
| 静的サイト生成 | [Astro](https://astro.build/) |
| CMS | [microCMS](https://microcms.io/) (Hobbyプラン想定) |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

更新フロー:

```
microCMSで活動記事を公開
  ↓ (Webhook)
GitHub Actions が起動
  ↓
Astro が microCMS API からビルド時に取得して静的HTMLを生成
  ↓
GitHub Pages へデプロイ
```

ブラウザから microCMS API は呼び出しません。APIキーはビルド時のみ使用します。

## 2. ローカル開発

### 必要なもの

- Node.js 22 以上
- npm
- microCMS のサービスドメインと API キー (読み取り権限)

### セットアップ

```bash
npm install
cp .env.example .env
# .env に microCMS の値を記入
npm run dev
```

ブラウザで `http://localhost:4321/ehon-dev/` を開きます (`base` の設定と一致)。
`base` を変更している場合は対応したパスを開いてください。

### 主なスクリプト

| コマンド | 役割 |
| --- | --- |
| `npm run dev` | 開発サーバ起動 |
| `npm run build` | 本番ビルド (`dist/` を生成) |
| `npm run preview` | ビルド結果のローカル確認 |

## 3. 環境変数

`.env` に以下を設定します。`PUBLIC_` プレフィックスは付けないでください (クライアントへ露出します)。

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

GitHub では Repository Settings → Secrets and variables → Actions に同名の Secret として登録します。

## 4. microCMS の API 設定

| 項目 | 値 |
| --- | --- |
| API表示名 | 活動記事 |
| エンドポイント | `activities` |
| API種別 | リスト形式 |

### フィールド

| フィールドID | 表示名 | 型 | 必須 |
| --- | --- | --- | --- |
| title | タイトル | テキストフィールド | ✅ |
| slug | スラッグ | テキストフィールド | – |
| date | 活動日 | 日時 | ✅ |
| summary | 概要文 | テキストエリア | ✅ |
| body | 本文 | リッチエディタ | ✅ |
| mainImage | メイン画像 | 画像 | ✅ |
| gallery | 追加画像 | 繰り返しフィールド (`image`, `caption`) | – |
| instagramUrl | Instagram URL | テキストフィールド | – |
| links | 関連リンク | 繰り返しフィールド (`label`, `url`) | – |
| isFeatured | トップ表示 | 真偽値 | – |

初期実装では URL に microCMS の `contentId` を使います。`slug` を URL に使う場合は別途対応が必要です。

## 5. GitHub Pages 設定

1. Repository Settings → Pages を開く。
2. **Source** を **GitHub Actions** にする。
3. プロジェクトサイト (`https://USER.github.io/REPO/`) で公開する場合は `astro.config.mjs` の `site` と `base` を実際の値に更新する。

```js
// astro.config.mjs
export default defineConfig({
  site: "https://USER.github.io",
  base: "/REPO",
});
```

ユーザー/Organizationサイト (`https://USER.github.io/`) や独自ドメインで公開する場合は `base` を `"/"` か未指定に変更してください。

## 6. GitHub Secrets 設定

Settings → Secrets and variables → Actions で以下を登録します。

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`

## 7. microCMS Webhook 設定

microCMS 管理画面 → サービス設定 → Webhook で以下を設定します。

- 種別: GitHub Actions
- リポジトリ: 本リポジトリ
- イベントタイプ: `microcms`
- 起動契機: コンテンツの公開・更新・削除

GitHub の Personal Access Token (PAT) は最小権限で発行し、microCMS にのみ保存します。リポジトリへ書き込まないでください。

## 8. GitHub Actions の手動実行

Webhook が動かない場合や、デザイン変更だけを反映したい場合は以下の手順で手動デプロイできます。

1. GitHub の **Actions** タブを開く。
2. **Deploy to GitHub Pages** ワークフローを選択。
3. **Run workflow** を押し、ブランチ `main` で実行。

## 9. 更新担当者向け: microCMS 操作手順

1. microCMS にログイン。
2. 左メニュー「活動記事」→「+追加」。
3. 以下を入力する。
   - タイトル
   - 活動日
   - 概要文 (一覧カードに出る短文)
   - 本文 (詳細ページに出る本文)
   - メイン画像 (一覧・OGP・詳細冒頭で使う)
   - 追加画像 (任意)
   - 関連リンク (任意)
   - Instagram URL (任意)
4. 「公開」を押す。
5. 数分後、サイトに反映される (GitHub Actions のビルド時間ぶん遅延します)。

GitHub の操作は不要です。

## 10. プロジェクト構成

```
.
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── favicon.svg
└── src/
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── Hero.astro
    │   ├── SectionTitle.astro
    │   ├── ActivityCard.astro
    │   └── InstagramCTA.astro
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/
    │   └── microcms.ts
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── contact.astro
    │   └── activities/
    │       ├── index.astro
    │       └── [id].astro
    ├── styles/
    │   └── global.css
    └── env.d.ts
```

## 11. よくあるトラブル

### ビルド時に「microCMS environment variables are missing.」と出る

`.env` または GitHub Secrets に `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` が設定されていません。
ローカルなら `.env` を、GitHub なら Repository Secrets を確認してください。

### CSS や画像のパスが壊れる

GitHub Pages のプロジェクトサイトで公開しているのに `astro.config.mjs` の `base` を設定していないと発生します。
`base: "/REPO"` を実際のリポジトリ名に合わせてください。

### microCMS で公開したのにサイトが更新されない

1. microCMS の Webhook 設定を確認 (イベントタイプ `microcms`、対象リポジトリ)。
2. GitHub Actions の **Deploy to GitHub Pages** ワークフローのログを確認。
3. Webhook が落ちている場合は **Run workflow** で手動実行。

### Instagram の埋め込みが出ない

このサイトは Instagram の自動フィード取得を行っていません (静的サイトの軽量性とAPI仕様変更の影響回避のため)。
活動記事ごとに `instagramUrl` を設定すると、各記事から Instagram 投稿への導線を出せます。

### microCMS の API キーを誤って公開してしまった

1. microCMS 管理画面で該当 API キーを再発行・旧キーを失効。
2. GitHub Secrets の `MICROCMS_API_KEY` を新しい値で上書き。
3. GitHub Actions を手動実行して再デプロイ。

## 12. 参考リンク

- [Astro GitHub Pages Deploy](https://docs.astro.build/en/guides/deploy/github/)
- [microCMS Astro Tutorial](https://document.microcms.io/tutorial/astro/astro-top)
- [microCMS Webhook Setting](https://document.microcms.io/manual/webhook-setting)
- [microCMS GitHub Actions Webhook Help](https://help.microcms.io/ja/knowledge/webhook-github-actions-settings)
