'use client'

import logo from '@public/android-chrome-512x512.png'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTE_URLS } from '@/shared/domain/routes'

export function Logo() {
  return (
    <Link href={ROUTE_URLS.pages.home}>
      <Image priority src={logo} height={30} className="md:h-logo-lg" alt="The Family Hotel Guide" />
    </Link>
  )
}
