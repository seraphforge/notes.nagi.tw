import type { APIRoute } from 'astro';
import { getPublicArticleGroups } from '../lib/articles';

export const GET: APIRoute = async () => {
  const groups = await getPublicArticleGroups();
  return new Response(JSON.stringify(groups.map((group) => ({
    key: group.key,
    topic: group.topic,
    category: group.category,
    languages: group.availableLanguages,
    variants: Object.fromEntries(group.availableLanguages.map((language) => {
      const article = group.variants[language]!;
      return [language, {
        title: article.data.title,
        description: article.data.description ?? '',
        tags: article.data.tags,
        language,
        url: article.href,
        date: article.data.date.toISOString(),
      }];
    })),
  }))), { headers: { 'Content-Type': 'application/json' } });
};
