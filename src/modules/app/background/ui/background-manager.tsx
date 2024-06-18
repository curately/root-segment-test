'use client'

import Script from 'next/script'
import { lazy, Suspense } from 'react'

//const PlausibleAnalytics = lazy(() => import('@/background/ui/plausible-analytics'))

export function BackgroundManager() {
  return (
    <Suspense>
      <Script defer data-domain="thefamilyhotelguide.com" src="https://plausible.io/js/script.js" />
    </Suspense>
  )
}
