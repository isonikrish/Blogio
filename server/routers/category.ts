import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { makeSlug } from "../utils/slugify";
import { categoriesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
export const categoryRouter = router({
  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = makeSlug(input.name);
      const [created] = await ctx.db
        .insert(categoriesTable)
        .values({
          name: input.name,
          description: input.description ?? null,
          slug,
        })
        .returning();
      return created;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = makeSlug(input.name);
      const [updated] = await ctx.db
        .update(categoriesTable)
        .set({ name: input.name, description: input.description ?? null, slug })
        .where(eq(categoriesTable.id, input.id))
        .returning();

      return updated ?? null;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(categoriesTable)
        .where(eq(categoriesTable.id, input.id));
      return { success: true };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(categoriesTable)
      .orderBy(categoriesTable.name);
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const row = await ctx.db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.slug, input.slug))
        .limit(1);
      return row[0] ?? null;
    }),
});
