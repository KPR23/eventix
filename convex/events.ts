import { authenticatedQuery } from "./lib/withUserCtx";

export const get = authenticatedQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});
