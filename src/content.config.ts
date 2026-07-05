import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.number(),
    competition: z.string(),
    concept: z.string(),
    summary: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    members: z.array(z.string()),
    github: z.string().optional(),
    order: z.number(),
  }),
});

const projectSections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/project-sections' }),
  schema: z.object({
    title: z.string(),
    project: z.string(),
    section: z.enum(['mechanical', 'electrical', 'software']),
    summary: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    bio: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    x: z.string().optional(),
    projects: z.array(z.string()),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    authorSlug: z.string(),
    project: z.string().optional(),
    category: z.enum(['活動報告', 'メカ', '回路・電装', 'ソフトウェア', '大会レポート']),
    tags: z.array(z.string()),
    summary: z.string(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, projectSections, members, blog };
