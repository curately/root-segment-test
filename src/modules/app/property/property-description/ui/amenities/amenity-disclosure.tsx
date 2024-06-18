'use client'

import Image from 'next/image'

import { Disclosure } from '@headlessui/react'
import { Minus as MinusIcon, Plus as PlusIcon } from 'react-feather'

import { Badge } from '@/shared/ui/badge'

import { Amenities } from '../../../property-description/domain/property-description-domain'
import {
  AccessibilityIcon,
  ActivitiesIcon,
  ConveniencesIcon,
  FamilyIcon,
  FoodAndDrinkIcon,
  GuestServicesIcon,
  InternetIcon,
  MoreIcon,
  OutdoorIcon,
  SpaIcon,
} from '../../../property-description/ui/assets'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}
export function AmenityDisclosure({ amenities }: { amenities: Amenities }) {
  const {
    accessibility,
    spa,
    conveniences,
    familyFriendly,
    foodAndDrink,
    guestServices,
    internet,
    thingsToDo,
    outdoor,
    more,
  } = amenities
  return (
    <div className="border-t divide-y divide-gray-200">
      <AmenityDisclosureGroup amenityGroup={familyFriendly} icon={FamilyIcon} title="Family friendly" />
      <AmenityDisclosureGroup amenityGroup={internet} icon={InternetIcon} title="Wifi" />
      <AmenityDisclosureGroup amenityGroup={foodAndDrink} icon={FoodAndDrinkIcon} title="Food and drink" />
      <AmenityDisclosureGroup amenityGroup={spa} icon={SpaIcon} title="Spa" />
      <AmenityDisclosureGroup amenityGroup={guestServices} icon={GuestServicesIcon} title="Guest services" />
      <AmenityDisclosureGroup amenityGroup={accessibility} icon={AccessibilityIcon} title="Accessibility" />
      <AmenityDisclosureGroup amenityGroup={thingsToDo} icon={ActivitiesIcon} title="Things to do" />
      <AmenityDisclosureGroup amenityGroup={outdoor} icon={OutdoorIcon} title="Outdoor" />
      <AmenityDisclosureGroup amenityGroup={conveniences} icon={ConveniencesIcon} title="Conveniences" />
      <AmenityDisclosureGroup amenityGroup={more} icon={MoreIcon} title="More" />
    </div>
  )
}

function AmenityDisclosureGroup({
  amenityGroup,
  icon,
  title,
}: {
  amenityGroup: Array<string>
  icon: string
  title: string
}) {
  return (
    <Disclosure as="div" key={title}>
      {({ open }) => (
        <div className="">
          <h3>
            <Disclosure.Button className="relative flex items-center justify-between w-full py-6 text-left group">
              <span className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>
                {title}
              </span>
              <span className="flex items-center ml-6">
                {open ? (
                  <MinusIcon className="block w-6 h-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                ) : (
                  <PlusIcon className="block w-6 h-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel as="div" className="pb-6 prose-sm prose" unmount={false}>
            <div className="flex flex-row flex-wrap items-center justify-start w-full gap-2 ">
              {amenityGroup.map((amenity, index) => {
                return (
                  <div className="gap-2 py-1 capitalize " key={index}>
                    <Badge
                      variant="ivory"
                      className="px-3 text-sm bg-white border roundex-3xl line-clamp-1 border-ivory"
                    >
                      {amenity}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
