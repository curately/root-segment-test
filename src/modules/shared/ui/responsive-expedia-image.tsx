'use client'

import Image from "next/image"

interface loaderProps {
  src: string
}
//https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
function getSrcSet(src: string) {
  return `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=300&ra=fit 300w, https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=600&ra=fit 600w, https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=900&ra=fit 900w`
}
const expediaImageLoader = ({ src }: loaderProps) => {
  return {
    sm: `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=300&ra=fit`,
    md: `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=600&ra=fit`,
    lg: `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=900&ra=fit`,
  }

  //return `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=455&ra=fit`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=resizecrop&rw=900&ra=fit`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=fcrop&w=720&h=480&p=1&q=medium`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=fcrop&w=1200&h=800&p=1&q=medium`
  //return `https://images.trvl-media.com/lodging/${src}?impolicy=fcrop&w=600&h=400&p=1&q=medium`
}

const sanitizeSrc = (src: string) => {
  let sanitisedSrc = src.replace('https://images.trvl-media.com/lodging/', '')
  sanitisedSrc = sanitisedSrc?.split('?')[0] ?? ''
  return sanitisedSrc
}
interface Props {
  src: string
  alt: string
  className?: string
  priority?: boolean
}
export function ExpediaImage({ src, alt, className = '', priority = false }: Props) {
  if (!src) return null
  return (
    <img
      src={sanitizeSrc(src)}
      //fill
      //height={Math.round((width * 2) / 3)}
      //priority={priority}
      //priority={priority}
      className={className}
      alt={alt}
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      srcSet={getSrcSet(src)}
      //loader={expediaImageLoader}
    />
  )
}
