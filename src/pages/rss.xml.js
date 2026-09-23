import { withBase } from '../lib/urls';
import rss from '@astrojs/rss';
import { getPublicArticles } from '../lib/articles';
export async function GET(context) {
  const items = (await getPublicArticles()).map((article) => ({
    title: article.data.title,
    description: article.data.description ?? '',
    pubDate: article.data.date,
    link: article.href,
    categories: [article.category, ...article.data.tags],
  }));
  return rss({ title: 'Nagi Notes', description: 'Life, Security, Projects, Research — and things worth keeping.', site: new URL(withBase('/'), context.site), items });
}
