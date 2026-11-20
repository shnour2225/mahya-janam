import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(githubRepository);
const isUserSite = githubRepository === `${githubOwner}.github.io`;
const base = isGitHubPagesBuild && !isUserSite ? `/${githubRepository}/` : '/';

export default defineConfig({
  appType: 'mpa',
  base,
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        'mahya-janam': resolve(process.cwd(), 'mahya-janam.html'),
      },
    },
  },
});
