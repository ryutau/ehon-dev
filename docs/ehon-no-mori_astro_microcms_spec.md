# えほんの森 Webサイト移行・実装仕様書

作成日: 2026-04-29  
移行先構成: **GitHub Pages + Astro + microCMS Hobby + GitHub Actions**

---

## 1. この仕様書の目的

現在 STUDIO で管理している「えほんの森」のWebサイトを、より軽量で保守しやすく、かつ非プログラマでも活動報告を更新できる構成に移行する。

Claudeには、この仕様に沿って **Astroプロジェクトの初期実装、microCMS連携、GitHub Pagesデプロイ設定、GitHub Actions設定、基本デザインの実装** を依頼する。

---

## 2. 背景

現在のサイトは STUDIO で管理しているが、日常的な更新や管理がやや重い。  
今後は、主に以下のような更新を2週間に1回程度行いたい。

- 最近の活動状況の短い文章を追加する。
- 活動写真を1枚以上追加する。
- 関連リンクを追加する。
- Instagram投稿またはInstagramプロフィールへの導線を追加する。

更新担当者はプログラマではない。  
そのため、更新作業は **microCMSの管理画面だけで完結** させる。

---

## 3. 採用する技術構成

### 3.1 全体構成

```text
更新担当者
  ↓
microCMS管理画面で活動記事を作成・編集
  ↓
microCMS Webhook
  ↓
GitHub Actionsを起動
  ↓
AstroがmicroCMS APIからコンテンツを取得して静的HTMLを生成
  ↓
GitHub Pagesにデプロイ
  ↓
閲覧者はGitHub Pages上の静的HTMLを見る
```

### 3.2 採用技術

| 領域 | 技術 | 用途 |
|---|---|---|
| 静的サイト生成 | Astro | サイト全体の実装、ページ生成、デザイン |
| CMS | microCMS Hobby | 活動記事・写真・リンクの管理 |
| ホスティング | GitHub Pages | 静的HTMLの公開 |
| CI/CD | GitHub Actions | buildとdeployの自動化 |
| ソース管理 | GitHub | Astroコード、設定、ワークフロー管理 |

---

## 4. 重要な実装方針

### 4.1 閲覧時にmicroCMS APIを叩かない

必須条件:

- ブラウザ上のJavaScriptからmicroCMS APIを呼ばない。
- APIキーをクライアント側へ絶対に露出させない。
- microCMS APIの呼び出しは、Astroのビルド時だけにする。
- GitHub Pagesには生成済みの静的HTML/CSS/JSだけを配置する。

正しい流れ:

```text
GitHub Actionsのbuild時
  -> microCMS APIを呼ぶ
  -> HTMLを生成
  -> GitHub Pagesへdeploy
```

避けるべき流れ:

```text
閲覧者のブラウザ
  -> microCMS APIを呼ぶ
  -> 記事を動的表示
```

### 4.2 更新担当者にGitHubを触らせない

更新担当者の操作は以下だけにする。

1. microCMSにログインする。
2. 「活動記事」を開く。
3. 新規記事を作成する。
4. タイトル、日付、短文、本文、写真、リンク、Instagram URLを入力する。
5. 公開する。

GitHub、Markdown、Pull Request、Actions、デプロイなどは意識させない。

### 4.3 デザインはAstro側で管理する

microCMSには「内容」だけを持たせる。  
見た目に関する情報はAstro側で管理する。

microCMSに持たせるもの:

- タイトル
- 日付
- 概要文
- 本文
- メイン画像
- 追加画像
- 関連リンク
- Instagram URL
- 公開状態

Astro側で管理するもの:

- 色
- 余白
- フォント
- 角丸
- カードレイアウト
- 写真の比率
- トップページ構成
- スマホ表示
- Instagram導線のデザイン

---

## 5. サイト構成

### 5.1 必須ページ

#### トップページ `/`

目的:

- 活動の雰囲気を一目で伝える。
- 最新の活動記事を3件程度表示する。
- Instagramへの導線を強く出す。

構成案:

1. ヒーローセクション
   - 大きな写真
   - 短いキャッチコピー
   - 活動の説明
2. 最新の活動
   - microCMSから取得した活動記事を3件表示
3. えほんの森について
   - 短い紹介文
4. Instagram導線
   - Instagramプロフィールへの大きなボタン
5. お問い合わせ・参加導線

#### 活動一覧 `/activities/`

目的:

- 過去の活動を一覧できるようにする。

仕様:

- 新しい活動から順に表示する。
- カード形式で表示する。
- 各カードには以下を表示する。
  - メイン画像
  - 活動日
  - タイトル
  - 概要文
  - 詳細ページへのリンク

#### 活動詳細 `/activities/[id]/`

目的:

- 各活動記事の詳細を表示する。

仕様:

- タイトル
- 活動日
- メイン画像
- 本文
- 追加画像
- 関連リンク
- Instagram投稿URL
- 活動一覧へ戻るリンク
- 可能なら前後の記事リンク

#### えほんの森について `/about/`

目的:

- 活動の趣旨・対象・場所・運営情報を説明する。

内容は最初は静的ページでよい。  
後からmicroCMS管理にしてもよいが、初期実装では不要。

#### お問い合わせ `/contact/`

目的:

- Instagram、メール、フォームなどへの導線を置く。

初期実装では、問い合わせフォームを独自実装しなくてよい。  
Instagram、メール、または外部フォームへのリンクで十分とする。

---

## 6. microCMS設計

### 6.1 API名

API表示名:

```text
活動記事
```

APIエンドポイント:

```text
activities
```

API種別:

```text
リスト形式
```

### 6.2 フィールド定義

| フィールドID | 表示名 | 型 | 必須 | 説明 |
|---|---|---|---|---|
| title | タイトル | テキストフィールド | 必須 | 活動記事のタイトル |
| slug | スラッグ | テキストフィールド | 任意 | URL用。未入力の場合はcontentIdを使う |
| date | 活動日 | 日時または日付 | 必須 | 活動の日付 |
| summary | 概要文 | テキストエリア | 必須 | 一覧カードに表示する短文。80〜160字程度 |
| body | 本文 | リッチエディタ | 必須 | 詳細ページ本文 |
| mainImage | メイン画像 | 画像 | 必須 | 一覧・詳細・OGPに使う |
| gallery | 追加画像 | 繰り返しフィールド | 任意 | 複数画像を表示したい場合に使う |
| instagramUrl | Instagram URL | テキストフィールド | 任意 | 関連するInstagram投稿またはプロフィール |
| links | 関連リンク | 繰り返しフィールド | 任意 | 外部リンクを複数設定する |
| isFeatured | トップ表示 | 真偽値 | 任意 | トップに強調表示したい場合 |
| published | 公開状態 | 真偽値 | 任意 | 非公開制御が必要な場合に使う |

補足:

- microCMSには標準で公開・下書きの状態管理があるため、`published` は必須ではない。
- Astro側では、基本的に公開済みコンテンツのみ取得する。
- URLは `slug` があれば `slug` を使い、なければ `contentId` を使う。

### 6.3 繰り返しフィールドの設計

#### `links`

カスタムフィールド例:

| フィールドID | 表示名 | 型 |
|---|---|---|
| label | 表示名 | テキストフィールド |
| url | URL | テキストフィールド |

返却イメージ:

```json
[
  {
    "fieldId": "link",
    "label": "Instagram投稿",
    "url": "https://www.instagram.com/..."
  },
  {
    "fieldId": "link",
    "label": "関連ページ",
    "url": "https://example.com"
  }
]
```

#### `gallery`

カスタムフィールド例:

| フィールドID | 表示名 | 型 |
|---|---|---|
| image | 画像 | 画像 |
| caption | キャプション | テキストフィールド |

返却イメージ:

```json
[
  {
    "fieldId": "galleryImage",
    "image": {
      "url": "https://images.microcms-assets.io/...",
      "width": 1200,
      "height": 800
    },
    "caption": "読み聞かせの様子"
  }
]
```

---

## 7. Astroプロジェクト構成

推奨構成:

```text
.
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.svg
│   └── ogp-default.jpg
└── src/
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── ActivityCard.astro
    │   ├── InstagramCTA.astro
    │   ├── Hero.astro
    │   └── SectionTitle.astro
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
    └── styles/
        └── global.css
```

---

## 8. 環境変数

`.env.example` を作成する。

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

GitHub Actionsでは、以下をRepository Secretsに登録する。

```text
MICROCMS_SERVICE_DOMAIN
MICROCMS_API_KEY
```

注意:

- `MICROCMS_API_KEY` はクライアント側に出してはいけない。
- `PUBLIC_` から始まる環境変数名にしない。
- Astroのビルド時だけ使用する。

---

## 9. microCMS取得処理

`src/lib/microcms.ts` にmicroCMS取得処理をまとめる。

要件:

- `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` がなければビルド時に明示的にエラーにする。
- 記事一覧を取得できる。
- 記事詳細を取得できる。
- `orders=-date` で新しい順に取得する。
- `limit` は初期値100程度でよい。
- 取得結果の型をTypeScriptで定義する。

実装イメージ:

```ts
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type Activity = {
  id: string;
  title: string;
  slug?: string;
  date: string;
  summary: string;
  body: string;
  mainImage: MicroCMSImage;
  gallery?: Array<{
    fieldId: string;
    image: MicroCMSImage;
    caption?: string;
  }>;
  instagramUrl?: string;
  links?: Array<{
    fieldId: string;
    label: string;
    url: string;
  }>;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error("microCMS environment variables are missing.");
}

const baseUrl = `https://${serviceDomain}.microcms.io/api/v1`;

async function fetchMicroCMS<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`microCMS request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getActivities(): Promise<Activity[]> {
  const data = await fetchMicroCMS<{ contents: Activity[] }>(
    `/activities?orders=-date&limit=100`
  );

  return data.contents;
}

export async function getActivityById(id: string): Promise<Activity> {
  return fetchMicroCMS<Activity>(`/activities/${id}`);
}
```

実装時には、`slug` をURLに使うか `id` を使うかを明確にする。  
初期実装では、混乱を避けるため `contentId` をURLに使ってよい。

---

## 10. URL設計

初期実装では以下でよい。

```text
/activities/{microCMSのcontentId}/
```

将来的にslugを使いたい場合:

```text
/activities/{slug}/
```

ただし、slugを使う場合は以下を実装する。

- slugの一意性を運用で担保する。
- slug未入力時のfallbackを用意する。
- `getStaticPaths()` でslugとidの対応を扱う。

初期実装では、堅牢性を優先して `contentId` を使う。

---

## 11. Astroページ実装要件

### 11.1 `src/pages/index.astro`

- `getActivities()` で全記事を取得する。
- 最新3件を表示する。
- Hero、紹介文、ActivityCard、InstagramCTAを配置する。

### 11.2 `src/pages/activities/index.astro`

- `getActivities()` で全記事を取得する。
- 新しい順に一覧表示する。
- ActivityCardを使う。

### 11.3 `src/pages/activities/[id].astro`

- `getStaticPaths()` で全記事の詳細ページを生成する。
- 本文はmicroCMSのリッチエディタHTMLを表示する。
- HTML出力時には、Astroの `set:html` を使う場合、microCMS管理者だけが編集できる前提にする。
- 必要に応じてサニタイズ処理の追加を検討する。

---

## 12. GitHub Pages設定

### 12.1 `astro.config.mjs`

GitHub PagesのURLに合わせて `site` と `base` を設定する。

ユーザーサイトの場合:

```text
https://{username}.github.io/
```

なら、`base` は通常不要。

プロジェクトサイトの場合:

```text
https://{username}.github.io/{repository-name}/
```

なら、`base: "/{repository-name}"` が必要。

例:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example-user.github.io",
  base: "/ehon-no-mori",
});
```

独自ドメインを使う場合は、`site` を独自ドメインにし、`base` は通常 `"/"` または未指定にする。

---

## 13. GitHub Actions設定

`.github/workflows/deploy.yml` を作成する。

要件:

- `main` へのpushでデプロイする。
- microCMS Webhookからの `repository_dispatch` でデプロイする。
- 手動実行 `workflow_dispatch` も可能にする。
- GitHub Pages公式のActionsを使う。
- buildとdeployを分ける。

実装例:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  repository_dispatch:
    types: [microcms]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    env:
      MICROCMS_SERVICE_DOMAIN: ${{ secrets.MICROCMS_SERVICE_DOMAIN }}
      MICROCMS_API_KEY: ${{ secrets.MICROCMS_API_KEY }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

GitHub側の設定:

1. Repository Settingsを開く。
2. Pagesを開く。
3. Sourceを **GitHub Actions** にする。
4. Secretsに `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を登録する。

---

## 14. microCMS Webhook設定

microCMS側で、活動記事APIのWebhookを設定する。

要件:

- Webhook種別はGitHub Actionsを使う。
- コンテンツ公開・更新・削除時にGitHub Actionsが起動するようにする。
- `repository_dispatch` のイベントタイプは `microcms` とする。
- GitHub側のworkflowの `repository_dispatch.types` と一致させる。

注意:

- GitHubのPersonal Access Tokenを使う場合は、権限を最小限にする。
- 対象リポジトリだけに権限を絞る。
- トークンを公開リポジトリに書かない。
- microCMS管理画面内のWebhook設定にのみ保存する。

---

## 15. デザイン方針

### 15.1 全体トーン

「えほん」「森」「地域活動」「子ども」「読み聞かせ」「温かさ」が伝わるデザインにする。

方向性:

- 白すぎない、やや温かい背景色。
- 写真を大きめに見せる。
- テキスト量は抑える。
- 角丸をやや大きくする。
- 余白を広めに取る。
- スマホで見やすくする。
- Instagramへの導線を明確にする。

### 15.2 避けるデザイン

- ビジネスサイト風の硬いデザイン。
- 情報量が多すぎるトップページ。
- 文字が小さすぎるデザイン。
- 写真がトリミングされすぎて活動の雰囲気が消えるデザイン。
- アニメーションを多用して重くすること。

### 15.3 初期カラー案

厳密な指定ではなく、実装時に調整してよい。

```css
:root {
  --color-bg: #fffaf0;
  --color-surface: #ffffff;
  --color-text: #2f2a24;
  --color-muted: #766f67;
  --color-accent: #6f8f5f;
  --color-accent-soft: #e8f0df;
  --color-border: #eadfce;
}
```

### 15.4 フォント

初期実装ではWebフォントを必須にしない。  
システムフォントでよい。

例:

```css
font-family:
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  "Yu Gothic",
  sans-serif;
```

後からGoogle Fontsなどを使ってもよいが、初期実装では速度と保守性を優先する。

---

## 16. コンポーネント設計

### 16.1 `Header.astro`

要件:

- ロゴまたはサイト名を表示する。
- ナビゲーションを表示する。
- スマホでも破綻しない。
- メニュー項目:
  - トップ
  - 最近の活動
  - えほんの森について
  - お問い合わせ
  - Instagram

### 16.2 `ActivityCard.astro`

props:

```ts
type Props = {
  activity: Activity;
};
```

表示内容:

- 画像
- 日付
- タイトル
- 概要文
- 詳細リンク

要件:

- カード全体をクリック可能にしてよい。
- 画像の `alt` はタイトルまたはキャプションから生成する。
- 画像は `loading="lazy"` を付ける。ただしトップページのファーストビュー画像は除く。

### 16.3 `InstagramCTA.astro`

要件:

- Instagramプロフィールへの導線を表示する。
- ボタン文言例:
  - `Instagramで活動を見る`
  - `最新情報はInstagramへ`
- 外部リンクは `target="_blank"` と `rel="noopener noreferrer"` を付ける。

### 16.4 `BaseLayout.astro`

要件:

- `html lang="ja"` を設定する。
- title、descriptionをpropsで受け取る。
- OGPメタタグを設定する。
- HeaderとFooterを共通化する。
- global.cssを読み込む。

---

## 17. SEO・OGP要件

### 17.1 共通

- `lang="ja"` を設定する。
- 各ページに適切なtitleとdescriptionを設定する。
- OGPを設定する。
- canonical URLを設定する。

### 17.2 活動詳細ページ

- titleは `{活動タイトル} | えほんの森` とする。
- descriptionは `summary` を使う。
- og:imageは `mainImage.url` を使う。
- og:typeは `article` とする。
- article published timeとして `date` または `publishedAt` を使う。

---

## 18. アクセシビリティ要件

最低限、以下を満たす。

- 画像にalt属性を付ける。
- リンクテキストは「こちら」だけにしない。
- 色だけで情報を伝えない。
- フォーカス状態を消さない。
- 見出し階層を破綻させない。
- スマホでタップしやすいボタンサイズにする。
- 本文の行間を十分に取る。

---

## 19. パフォーマンス要件

- 初期実装では重いJavaScriptを使わない。
- React/Vue/Svelteを導入しない。必要になるまではAstroコンポーネントで完結させる。
- 画像はmicroCMSの画像URLにクエリパラメータを付けて適切な幅で表示する。
- 一覧カード画像は幅800px程度で十分。
- 詳細ページのメイン画像は幅1200px程度で十分。
- `loading="lazy"` を適切に使う。
- CSSはシンプルにする。

microCMS画像URLの扱い例:

```astro
<img
  src={`${activity.mainImage.url}?w=800&fm=webp`}
  width="800"
  height="600"
  alt={activity.title}
  loading="lazy"
/>
```

画像の実寸比率が異なる場合は、width/heightをAPIの返却値から使うか、CSSの `aspect-ratio` と `object-fit` で調整する。

---

## 20. 運用フロー

### 20.1 通常更新

1. 更新担当者がmicroCMSで活動記事を作成する。
2. 公開状態にする。
3. microCMS WebhookがGitHub Actionsを起動する。
4. GitHub ActionsがAstroをビルドする。
5. GitHub Pagesに反映される。
6. 管理者が公開ページを確認する。

### 20.2 修正

1. 更新担当者がmicroCMSで記事を修正する。
2. 保存・公開する。
3. GitHub Actionsが再実行される。
4. GitHub Pagesに反映される。

### 20.3 緊急時

- Webhookが動かない場合は、GitHub Actionsの `workflow_dispatch` で手動実行できるようにする。
- microCMS APIキーを漏洩した場合は、即座にキーを再発行し、GitHub Secretsを更新する。
- ビルドが失敗した場合は、GitHub Actionsのログを確認する。

---

## 21. STUDIOからの移行方針

### 21.1 初期移行

- 現行サイトの主要テキストを整理する。
- トップページ、about、contactに必要な文章だけを移す。
- 過去活動記事は、重要なものだけmicroCMSに手作業で登録する。
- すべての記事を完全移行しようとしない。
- Instagramが主な日常発信であるため、サイトは活動の入口・アーカイブとして整理する。

### 21.2 旧サイトからの導線

可能なら、STUDIO側に新サイトへのリンクまたはリダイレクトを設置する。  
リダイレクトが難しければ、旧サイトのトップに「新しいサイトはこちら」と表示する。

---

## 22. 実装時の注意点

### 22.1 GitHub Pagesのbase設定

GitHub Pagesがプロジェクトページの場合、Astroの `base` 設定を忘れるとCSSやリンクが壊れる。

例:

```text
https://username.github.io/repository-name/
```

この場合:

```js
base: "/repository-name"
```

が必要。

独自ドメイン運用にする場合は、この設定を変える必要がある。

### 22.2 APIキーの扱い

禁止:

```ts
const apiKey = import.meta.env.PUBLIC_MICROCMS_API_KEY;
```

許可:

```ts
const apiKey = import.meta.env.MICROCMS_API_KEY;
```

`PUBLIC_` 付きの環境変数はクライアントに露出し得るため使わない。

### 22.3 HTML本文の扱い

microCMSのリッチエディタ本文を表示する場合、Astroでは `set:html` を使うことになる可能性がある。

管理者だけが編集できるCMSであれば初期実装では許容してよい。  
ただし、不特定多数が投稿できるフォームを導入する場合は、HTMLサニタイズを必須にする。

### 22.4 Instagram埋め込み

初期実装ではInstagramの自動フィード取得は行わない。  
理由:

- API仕様変更の影響を受けやすい。
- 静的サイトの軽量性を損なう。
- 実装と保守が増える。

代わりに以下を実装する。

- Instagramプロフィールへの明確なリンク。
- 各活動記事に関連Instagram投稿URLを手動で設定できるようにする。

---


## 23. READMEに含めるべき内容

Claudeには、READMEも生成させる。

READMEに含める内容:

1. プロジェクト概要
2. 技術構成
3. ローカル開発手順
4. 環境変数
5. microCMSのAPI設定
6. GitHub Secrets設定
7. GitHub Pages設定
8. GitHub Actions手動実行方法
9. 更新担当者向けのmicroCMS操作手順
10. よくあるトラブル

---

## 25. Definition of Done

初期実装完了条件:

- `npm install` が通る。
- `npm run dev` でローカル表示できる。
- `npm run build` が成功する。
- microCMSから活動記事一覧を取得できる。
- トップページに最新3件が表示される。
- `/activities/` に活動一覧が表示される。
- `/activities/[id]/` に活動詳細が表示される。
- aboutページがある。
- contactページがある。
- GitHub ActionsでGitHub Pagesへデプロイできる。
- microCMS WebhookでGitHub Actionsを起動できる。
- APIキーがクライアントに露出していない。
- スマホ表示が大きく崩れていない。
- READMEに運用手順が書かれている。

---

## 26. 参考リンク

- Astro GitHub Pages Deploy: https://docs.astro.build/en/guides/deploy/github/
- Astro Styling Guide: https://docs.astro.build/en/guides/styling/
- microCMS Astro Tutorial: https://document.microcms.io/tutorial/astro/astro-top
- microCMS Webhook Setting: https://document.microcms.io/manual/webhook-setting
- microCMS GitHub Actions Webhook Help: https://help.microcms.io/ja/knowledge/webhook-github-actions-settings
- microCMS Repeat Field: https://document.microcms.io/manual/repeat-field
