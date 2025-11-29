import {
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import {
  mutation as baseMutation,
  query as baseQuery,
} from "../_generated/server";

export const WithUserCtx = customCtx(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error("[Convex] Unauthenticated call");
  }

  return { identity, userId: identity.subject };
});

export const authenticatedQuery = customQuery(baseQuery, WithUserCtx);
export const authenticatedMutation = customMutation(baseMutation, WithUserCtx);
