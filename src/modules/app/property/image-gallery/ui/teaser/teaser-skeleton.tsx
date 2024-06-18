import { Button } from '@/shared/ui/button'

export function TeaserSkeleton() {
  let images = Array.from({ length: 10 }, (_, i) => i)
  return (
    <>
      <div className="relative hidden mx-auto bg-white max-w-inner-container lg:container lg:block">
        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-x-1 lg:gap-1">
          <div className="overflow-hidden rounded-l-lg cursor-pointer group aspect-h-1 aspect-w-2 animate-pulse bg-pill sm:aspect-h-1 sm:aspect-w-1 sm:col-span-2 sm:row-span-2" />

          <div className="overflow-hidden cursor-pointer group aspect-h-1 aspect-w-2 animate-pulse bg-pill sm:aspect-none sm:relative sm:h-full" />

          <div className="overflow-hidden rounded-tr-lg cursor-pointer group aspect-h-1 aspect-w-2 animate-pulse bg-pill sm:aspect-none sm:relative sm:h-full" />

          <div className="overflow-hidden cursor-pointer group aspect-h-1 aspect-w-2 animate-pulse bg-pill sm:aspect-none sm:relative sm:h-full" />

          <div className="overflow-hidden rounded-br-lg cursor-pointer group aspect-h-1 aspect-w-2 animate-pulse bg-pill sm:aspect-none sm:relative sm:h-full" />
        </div>
      </div>
      {/* MOBILE SKELETON */}
      <div className="relative  aspect-[3/2] w-full animate-pulse md:hidden">
        <div className="relative w-full bg-pill">
          <div>
            <div>
              <div className="relative">
                <div className="relative w-full h-auto border-0">
                  <div className="z-1 relative aspect-[3/2] w-full bg-ivory"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 pt-4 bottom-2">
            {images.map((_, i) => (
              <Button key={i} className="mx-1 h-1.5 w-1.5 flex-grow rounded-full bg-pill p-0 hover:bg-pill" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
