import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("requests").order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("requests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getComments = query({
  args: { requestId: v.id("requests") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_requestId", (q) => q.eq("requestId", args.requestId))
      .collect();
  },
});

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("requests")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addComment = mutation({
  args: {
    requestId: v.id("requests"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("comments", {
      requestId: args.requestId,
      userId: args.userId,
      userName: args.userName,
      content: args.content,
      createdAt: Date.now(),
    });
    
    // Update the request's updatedAt field
    await ctx.db.patch(args.requestId, {
      updatedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("requests"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const create = mutation({
  args: {
    reference: v.string(),
    subject: v.string(),
    description: v.string(),
    category: v.string(),
    priority: v.string(),
    status: v.string(),
    service: v.string(),
    userId: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const requestId = await ctx.db.insert("requests", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return requestId;
  },
});
