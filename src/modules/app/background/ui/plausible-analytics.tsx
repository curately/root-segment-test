'use client'

import Script from 'next/script'

export default function PlausibleAnalytics() {
  return (
    <>
      <Script defer data-domain="thefamilyhotelguide.com" src="https://plausible.io/js/script.js" />
    </>
  )
}
