"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkUsers() {
  const client = await clerkClient();
  const response = await client.users.getUserList({
    limit: 100,
    orderBy: "-created_at",
  });
  
  return response.data.map(user => ({
    id: user.id,
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "Sans nom",
    email: user.emailAddresses[0]?.emailAddress || "Pas d'email",
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    lastSignInAt: user.lastSignInAt,
    publicMetadata: user.publicMetadata,
  }));
}
