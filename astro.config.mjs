// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file',
    assets: '_dist'
  },
  trailingSlash: 'never',
  server: {
    port: 4321
  },
  site: 'https://astro.invisyarcticfox.uk'
});
