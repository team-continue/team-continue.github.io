import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  getMembers,
  getProjects,
  getPublishedPosts,
  SECTION_LABELS,
  withBase,
} from '../lib/content';

interface SearchEntry {
  type: 'Blog' | 'Project' | 'ProjectSection' | 'Member' | 'Page';
  title: string;
  summary: string;
  url: string;
  /** 部分一致検索の対象文字列 (タイトル・概要・タグ・カテゴリ・著者名など) */
  keywords: string[];
  /** キーワード未入力時に候補として表示するか */
  featured: boolean;
}

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const sections = await getCollection('projectSections');
  const members = await getMembers();
  const posts = await getPublishedPosts(); // draft除外済み

  const entries: SearchEntry[] = [
    ...posts.map((post, index) => ({
      type: 'Blog' as const,
      title: post.data.title,
      summary: post.data.summary,
      url: withBase(`/blog/${post.data.slug}`),
      keywords: [
        post.data.title,
        post.data.summary,
        ...post.data.tags,
        post.data.category,
        post.data.author,
      ],
      featured: index < 3,
    })),
    ...projects.map((project) => ({
      type: 'Project' as const,
      title: project.data.title,
      summary: project.data.description,
      url: withBase(`/projects/${project.data.slug}`),
      keywords: [
        project.data.title,
        project.data.summary,
        project.data.description,
        ...project.data.tags,
      ],
      featured: true,
    })),
    ...sections.map((section) => ({
      type: 'ProjectSection' as const,
      title: section.data.title,
      summary: section.data.summary,
      url: withBase(`/projects/${section.data.project}/${section.data.section}`),
      keywords: [
        section.data.title,
        section.data.summary,
        ...section.data.tags,
        SECTION_LABELS[section.data.section],
      ],
      featured: false,
    })),
    ...members.map((member) => ({
      type: 'Member' as const,
      title: member.data.name,
      summary: `${member.data.role} — ${member.data.bio}`,
      url: withBase('/members'),
      keywords: [
        member.data.name,
        member.data.role,
        member.data.bio,
        ...member.data.tags,
      ],
      featured: false,
    })),
    {
      type: 'Page' as const,
      title: 'その他プロジェクト',
      summary: '小規模な試作、技術検証、勉強会などの活動一覧。',
      url: withBase('/projects/others'),
      keywords: ['その他プロジェクト', '試作', '技術検証', '勉強会', '制御実験', 'センサ検証'],
      featured: false,
    },
  ];

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
