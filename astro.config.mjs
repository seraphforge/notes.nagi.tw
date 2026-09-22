import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://notes.nagi.tw',
  output: 'static',
  integrations: [sitemap()],
});
