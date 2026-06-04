import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI & Automation', 'IT & MSP', 'Personal']),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
