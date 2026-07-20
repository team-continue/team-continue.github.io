// @ts-check
import { defineConfig } from 'astro/config';

// team-continue.github.io (ユーザー/組織サイト) 直下に公開するため base は '/'。
// リポジトリサイト (username.github.io/repo-name) に公開する場合は
// base: '/repo-name/' に変更してください。
export default defineConfig({
  site: 'https://team-continue.github.io',
  base: '/',
  trailingSlash: 'ignore',
});
