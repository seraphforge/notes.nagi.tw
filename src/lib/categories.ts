export const categoryOrder = ['life', 'security', 'projects', 'research'] as const;
export type Category = typeof categoryOrder[number];
export const categoryInfo: Record<Category, { title: string; zh: string; ja: string; description: string }> = {
  life: { title: 'Life', zh: '人生經驗', ja: '人生経験', description: '走過的路、遇見的人，以及成長中的想法。' },
  security: { title: 'Security', zh: '資安', ja: 'セキュリティ', description: '資安分析、CTF 技術筆記與安全探索。' },
  projects: { title: 'Projects', zh: '專案', ja: 'プロジェクト', description: '實際做出的系統、原型與開發紀錄。' },
  research: { title: 'Research', zh: '研究', ja: '研究', description: '目前正在追問的問題、實驗與研究方向。' },
};
export const categoryLabel = (category: Category, language: 'zh' | 'en' | 'ja' = 'zh') =>
  language === 'en' ? categoryInfo[category].title : categoryInfo[category][language];
