'use client'

import Image from "next/image"

interface loaderProps {
  src: string
  width: number
}
const expediaImageLoader = ({ src, width }: loaderProps) => {
  return `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=730`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=500&h=500`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=455&ra=fit`

  //return `https://images.trvl-media.com/lodging/${src}?impolicy=fcrop&w=720&h=480&p=1&q=medium`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=fcrop&w=1200&h=800&p=1&q=medium`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=fcrop&w=600&h=400&p=1&q=medium`
}

const sanitizeSrc = (src: string) => {
  let sanitisedSrc = src.replace('https://images.trvl-media.com/lodging/', '')
  sanitisedSrc = sanitisedSrc.split('?')[0] ?? ''
  return sanitisedSrc
}

interface Props {
  src: string
  alt: string
  width?: number
  className?: string
  priority?: boolean
}
export function ExpediaImage({ src, width = 800, alt, className = '', priority = false }: Props) {
  if (!src) return null
  return (
    <Image
      src={sanitizeSrc(src)}
      fill
      //placeholder="blur"
      //objectFit="contain"
      //width={width}
      //height={Math.round((width * 2) / 3)}
      //priority={priority}
      //blurDataURL={`https://images.trvl-media.com/lodging/${sanitizeSrc(src)}?impolicy=fcrop&w=20&h=20&p=1&q=medium`}
      priority={priority}
      className={className}
      alt={alt}
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      loader={expediaImageLoader}
    />
  )
}
