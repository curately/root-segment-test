import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { cn } from '@/shared/ui/helpers'

type PropertyListProps = {
  className?: string
}
export function PropertyListSkeleton({ className = '' }: PropertyListProps) {
  return (
    <div className={cn('grid grid-cols-1 md:gap-6 lg:grid-cols-2 2xl:grid-cols-3', className)}>
      {[...Array(6)].map(index => (
        <Card className={cn('border-0 shadow-none md:border md:shadow-sm', className)}>
          <CardTitle>
            <div className="relative bg-white sm:block" id="lazy">
              <div className="relative">
                <div className="relative w-full h-auto border-0">
                  <div className="z-1 relative aspect-[3/2] w-full animate-pulse bg-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="gap-2 md:flex md:w-full md:justify-between md:px-4"></div>
          </CardTitle>
          <CardContent>
            <div className="min-h0 flex w-full flex-col justify-start gap-4 pt-4 xl:min-h-[250px]">
              <div className="w-full h-10 bg-gray-200 animate-pulse"></div>
              <div className="w-full h-20 bg-gray-200 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
