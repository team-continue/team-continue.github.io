import { getCollection, type CollectionEntry } from 'astro:content';

/** セクション内部値 → 表示名 */
export const SECTION_LABELS: Record<string, string> = {
  overview: 'トップ',
  mechanical: 'メカ',
  electrical: '回路・電装',
  software: 'ソフトウェア',
};

/** プロジェクトセクション → 対応するブログカテゴリ */
export const SECTION_TO_CATEGORY: Record<string, string> = {
  mechanical: 'メカ',
  electrical: '回路・電装',
  software: 'ソフトウェア',
};

export const BLOG_CATEGORIES = [
  '活動報告',
  'メカ',
  '回路・電装',
  'ソフトウェア',
  '大会レポート',
] as const;

/** order 順のプロジェクト一覧 */
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** order 順のメンバー一覧 */
export async function getMembers(): Promise<CollectionEntry<'members'>[]> {
  const members = await getCollection('members');
  return members.sort((a, b) => a.data.order - b.data.order);
}

/**
 * 公開ブログ記事 (draft: true を除外) を date の新しい順で返す。
 * draft 記事はサイト内のあらゆる表示箇所から除外するため、
 * ブログ記事の取得は必ずこの関数を経由すること。
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 日付を YYYY.MM.DD で表示 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

/** base 設定を考慮したサイト内パスを返す */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
