'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  slug: string
  label: string
}
export function SimilarDestinationLink({ slug, label }: Props) {
  const router = useRouter()
  return (
    <Link
      href={slug}
      className="text-brand block hover:underline"
      prefetch={false}
      onMouseEnter={() => router.prefetch(slug)}
    >
      <span className="text-dark/60">{'- '} </span> {label}
    </Link>
  )
}
