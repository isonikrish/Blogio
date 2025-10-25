import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { makeSlug } from "../utils/slugify";
import {
  postsTable,
  postCategoriesTable,
  categoriesTable,
} from "../../db/schema";
import { eq } from "drizzle-orm";
const PostCreate = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url().optional(),
  published: z.boolean().optional(),
  categoryIds: z.array(z.number()).optional(),
});

const PostUpdate = PostCreate.extend({ id: z.number() });

export const postRouter = router({
  create: publicProcedure.input(PostCreate).mutation(async ({ ctx, input }) => {
    const slug = makeSlug(input.title);

    const [created] = await ctx.db
      .insert(postsTable)
      .values({
        title: input.title,
        content: input.content,
        slug,
        imageUrl: input.imageUrl ?? null,
        published: !!input.published,
      })
      .returning();

    if (input.categoryIds && input.categoryIds.length) {
      const insertRows = input.categoryIds.map((categoryId) => ({
        postId: created.id,
        categoryId,
      }));
      await ctx.db.insert(postCategoriesTable).values(insertRows);
    }

    return created;
  }),
  update: publicProcedure.input(PostUpdate).mutation(async ({ ctx, input }) => {
    const slug = makeSlug(input.title);
    const [updated] = await ctx.db
      .update(postsTable)
      .set({
        title: input.title,
        content: input.content,
        slug,
        imageUrl: input.imageUrl ?? null,
        published: !!input.published,
        updatedAt: new Date(),
      })
      .where(eq(postsTable.id, input.id))
      .returning();

    if (input.categoryIds) {
      await ctx.db
        .delete(postCategoriesTable)
        .where(eq(postCategoriesTable.postId, input.id));
      const insertRows = input.categoryIds.map((categoryId) => ({
        postId: input.id,
        categoryId,
      }));
      if (insertRows.length)
        await ctx.db.insert(postCategoriesTable).values(insertRows);
    }

    return updated ?? null;
  }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(postsTable).where(eq(postsTable.id, input.id));
    await ctx.db.delete(postCategoriesTable).where(eq(postCategoriesTable.postId, input.id));
    return { success: true };
  }),

  
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const rows = await ctx.db.select().from(postsTable).where(eq(postsTable.slug, input.slug)).limit(1);
    if (!rows[0]) return null;
    const post = rows[0];

    // fetch categories for post
    const categories = await ctx.db
      .select()
      .from(categoriesTable)
      .innerJoin(postCategoriesTable, eq(postCategoriesTable.categoryId, categoriesTable.id))
      .where(eq(postCategoriesTable.postId, post.id));

    return { ...post, categories };
  }),
  
});
