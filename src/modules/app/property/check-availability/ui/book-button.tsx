/* eslint-disable no-restricted-globals */
'use client'

import { Button } from '@/shared/ui/button'

/* eslint-disable no-restricted-globals */

interface BookButtonProps {
  expediaDeepLink: string
  slug: string
  rooms: string
  totalPrice: number | null
  lengthOfStay: number
  checkin: string
  checkout: string
}
export function BookButton({
  expediaDeepLink,
  slug,
  rooms,
  totalPrice,
  lengthOfStay,
  checkin,
  checkout,
}: BookButtonProps) {
  return (
    <div className="w-full my-6">
      <Button
        variant="accent"
        shape="pill"
        effect="blur"
        className="py-6 text-base"
        //className="w-full bg-primary-600 hover:from-brand hover:to-brand-light"
        onClick={() => {
          if (process.env.NODE_ENV !== 'development') {
            logExpediaClickWithAirtable({
              totalPrice,
              slug,
              lengthOfStay,
              rooms,
              checkin,
              checkout,
            })
          } else {
            console.log('Expedia Click not logged during development')
          }
          window.open(expediaDeepLink, '_blank')
        }}
      >
        View Room Options
      </Button>
    </div>
  )
}

type logExpediaClickWithAirtableProps = {
  totalPrice: number | null
  slug: string
  lengthOfStay: number
  rooms: string
  checkin: string
  checkout: string
}

function logExpediaClickWithAirtable({
  totalPrice,
  slug,
  lengthOfStay,
  rooms,
  checkin,
  checkout,
}: logExpediaClickWithAirtableProps) {
  const propertyClickEventData = {
    eventType: 'expedia-click',
    slug: slug,
    totalPrice: totalPrice,
    site: 'the family hotel guide',
    lengthOfStay: lengthOfStay,
    rooms: rooms,
    checkin: checkin,
    checkout: checkout,
  }

  fetch('/api/event-logger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyClickEventData),
  })
}
