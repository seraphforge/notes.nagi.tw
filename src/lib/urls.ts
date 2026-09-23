/** Resolve site paths against Astro's deployment base; preserve external URLs and fragments. */
export function withBase(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (base && (path === base || path.startsWith(`${base}/`))) return path;
  return `${base}/${path.replace(/^\/+/, '')}`;
}
