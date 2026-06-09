import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  requests: defineTable({
    reference: v.string(),
    subject: v.string(),
    description: v.string(),
    category: v.string(),
    priority: v.string(),
    status: v.string(),
    service: v.string(),
    userId: v.string(),
    userName: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
  comments: defineTable({
    requestId: v.id("requests"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_requestId", ["requestId"]),
});
