'use client'

import { useActions, useHotelListIsInView } from '@/app/shared/marco-polo/domain/use-show-properties-button-store'
import { Button } from '@/shared/ui/button'

export function ViewPropertiesButton() {
  const hotelListIsInView = useHotelListIsInView()
  const { setHotelListIsInView } = useActions()

  const scrollToHotels = () => {
    const element = document.getElementById('property-list-heading')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
    setHotelListIsInView(true)
  }

  return (
    <div
      className={`fixed bottom-0  left-0 z-20 w-full     transition-all duration-500 ${
        hotelListIsInView ? 'bottom-[-6.2rem]' : ''
      }`}
      id="fixedBar"
    >
      <div className="flex w-full">
        <div className="xl:min-w[700px] w-full border-t-2 border-t-ivory bg-white/100 px-4 py-2 md:w-6/12 lg:w-7/12  xl:w-7/12 2xl:w-5/12">
          <Button
            variant="primary"
            shape="pill"
            fullWidth={true}
            className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium duration-500 opacity-100 group"
            onClick={scrollToHotels}
          >
            <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
              View hotels
            </div>
            <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Button>
        </div>
        <div className="hidden sm:block md:w-6/12 lg:w-5/12 xl:w-5/12 2xl:w-7/12"></div>
      </div>
    </div>
  )
}
