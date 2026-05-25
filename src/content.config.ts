import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    image: z.string(),
    available: z.boolean().default(true),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

const categories = defineCollection({
  loader: file('src/content/categories/categories.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    sections: z.array(
      z.object({
        type: z.enum(['hero', 'featured', 'text', 'gallery', 'cta']),
        content: z.record(z.any()),
      })
    ),
  }),
});

export const collections = { products, categories, pages };
