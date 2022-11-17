import { router, publicProcedure } from "../trpc";

export const questionRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),
});
