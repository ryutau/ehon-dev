import { defineConfig } from "astro/config";

// GitHub Pagesのプロジェクトサイトを想定したデフォルト。
// 独自ドメインを使う場合は site を独自ドメインに、base を "/" もしくは未指定に変更する。
// ユーザー/Organizationサイト (https://USER.github.io/) の場合は base を未指定にする。
export default defineConfig({
  site: "https://ryutau.github.io",
  base: "/ehon-dev",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
