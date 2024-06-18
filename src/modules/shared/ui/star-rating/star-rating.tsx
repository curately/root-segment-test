import Image from 'next/image'
import { cn } from '@/shared/ui/helpers'
import starIconEmpty from '@/shared/ui/star-rating/icons/star-half-solid-empty.svg'
import starIconHalf from '@/shared/ui/star-rating/icons/star-half-solid.svg'
import starIcon from '@/shared/ui/star-rating/icons/star-solid.svg'

export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
}

type StarsProps = {
  starInteger: number
  hasHalfStar: boolean
}

export function StarRating({ rating, className, ...props }: StarRatingProps) {
  let starInteger = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <div className="flex h-full">
        <Stars starInteger={starInteger} hasHalfStar={hasHalfStar} />
      </div>
      <StarsText starInteger={starInteger} hasHalfStar={hasHalfStar} />
    </div>
  )
}

function Stars({ starInteger, hasHalfStar }: StarsProps) {
  return (
    <div className="flex h-full">
      {[...Array(starInteger)].map((_, index) => (
        <FullStar key={index} />
      ))}
      {hasHalfStar ? <HalfStar /> : false}
    </div>
  )
}

function StarsText({ starInteger, hasHalfStar }: StarsProps) {
  if (starInteger <= 0) return false
  return (
    <div>
      {starInteger} {hasHalfStar ? '1/2' : ''} star hotel
    </div>
  )
}

function FullStar() {
  return <Image priority src={starIcon} alt="star" className="w-5 h-5 opacity-90" />
}

const HalfStar = () => {
  return (
    <div className="flex">
      <Image priority src={starIconHalf} alt="half star" className="inline-block w-5 h-5 text-brand" />
      <Image
        priority
        src={starIconEmpty}
        alt=""
        style={{ transform: 'scaleX(-1)' }}
        className="inline-block w-5 h-5 -ml-5 text-brand"
      />
    </div>
  )
}
