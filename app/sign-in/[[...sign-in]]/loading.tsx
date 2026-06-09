import { AuthSkeleton } from "@/components/auth/loading-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <AuthSkeleton />
    </div>
  );
}
