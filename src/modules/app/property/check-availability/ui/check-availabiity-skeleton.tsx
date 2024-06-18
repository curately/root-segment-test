import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'

export function AvailabilityCardSkeleton() {
  return (
    <CheckAvailabilityCardContainer>
      <div className="w-full h-8 bg-gray-100 animate-pulse"></div>
      <div className="w-full h-8 mt-2 bg-gray-100 animate-pulse"></div>
      <div className="flex gap-4">
        <div className="w-1/2 h-8 mt-2 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="w-1/2 h-8 mt-2 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
      <div className="w-full h-24 mt-2 bg-gray-100 animate-pulse"></div>
      <div className="w-full h-12 mt-2 bg-gray-100 animate-pulse"></div>
    </CheckAvailabilityCardContainer>
  )
}
const CheckAvailabilityCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="width-12 fixed bottom-0  z-20 me-0 ms-0 w-full max-w-[100%] rounded-xl border border-ivory bg-white p-4 md:relative md:shadow-lg">
      {children}
    </div>
  )
}
