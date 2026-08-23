import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  lionxAssistant: router({
    ask: publicProcedure
      .input(z.object({ message: z.string().trim().min(2).max(2000) }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: "أنت مساعد LIONX. أجب بالعربية الواضحة وباختصار. ساعد المستخدم في فهم الخدمات والطلبات والدفع التجريبي. لا تدّعي تنفيذ دفع أو تأكيد طلب، ولا تطلب كلمات مرور أو مفاتيح API." },
            { role: "user", content: input.message },
          ],
        });
        const content = response.choices?.[0]?.message?.content;
        const text = typeof content === "string" ? content : Array.isArray(content) ? content.filter((part) => part.type === "text").map((part) => part.text).join(" ") : "تعذر الحصول على إجابة الآن.";
        return { text };
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
