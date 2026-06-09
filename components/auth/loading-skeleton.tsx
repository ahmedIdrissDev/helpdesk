export function AuthSkeleton() {
  return (
    <div className="w-full max-w-[400px] bg-white border border-hairline rounded-xl p-8 space-y-6 animate-pulse shadow-sm">
      <div className="space-y-4">
        <div className="h-8 bg-surface-bone rounded-md w-3/4 mx-auto"></div>
        <div className="h-4 bg-surface-bone rounded-md w-1/2 mx-auto"></div>
      </div>
      
      <div className="space-y-6 pt-4">
        <div className="h-11 bg-surface-bone rounded-full w-full"></div>
        
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-hairline flex-1"></div>
          <div className="h-3 bg-surface-bone rounded w-8"></div>
          <div className="h-px bg-hairline flex-1"></div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-3 bg-surface-bone rounded w-20"></div>
            <div className="h-11 bg-surface-bone rounded-xl w-full border border-hairline"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-surface-bone rounded w-20"></div>
            <div className="h-11 bg-surface-bone rounded-xl w-full border border-hairline"></div>
          </div>
        </div>
        
        <div className="h-11 bg-primary/10 rounded-xl w-full pt-4"></div>
      </div>
      
      <div className="pt-6 border-t border-hairline">
        <div className="h-4 bg-surface-bone rounded-md w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}
