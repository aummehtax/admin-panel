import { Skeleton } from "@/components/ui/skeleton"

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">Please wait while we load your content</p>
        </div>

        {/* Skeleton placeholders */}
        <div className="w-full max-w-sm space-y-3 mt-6">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner