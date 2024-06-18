import { MapPin } from 'react-feather'
import {
  HotelCard,
  HotelCardBody,
  HotelCardContent,
  HotelCardLocation,
  HotelCardTitle,
} from '@/shared/ui/home-page-card'

export function PopularHotels() {
  return (
    <section className="container mx-auto max-w-[1200px] px-4 py-xl md:px-0">
      <h2 className="text-3xl ">Popular Hotels</h2>
      <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/2000000/1910000/1902500/1902433/beb4c9da.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
              className="rounded-lg"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Torre Del Mar</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Ibiza, Spain
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/11000000/10390000/10389200/10389117/f833ff78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
              className="rounded-lg"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Mint House at 70 Pine</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    New York, America
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/2000000/1180000/1171300/1171299/82a3b3b4.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
              className="rounded-lg"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Bellevue Dubrovnik</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Dubrovnik, Croatia
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/11000000/10390000/10389200/10389117/f833ff78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Name</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Brighton
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/11000000/10390000/10389200/10389117/f833ff78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Name</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Brighton
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/11000000/10390000/10389200/10389117/f833ff78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Name</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Brighton
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/11000000/10390000/10389200/10389117/f833ff78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
              className="rounded-lg"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Name</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Brighton
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
        <HotelCard
          slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
          first={false}
        >
          <div className="relative w-full mx-auto text-center lg:w-full">
            <img
              alt=""
              src="https://images.trvl-media.com/lodging/11000000/10390000/10389200/10389117/f833ff78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium"
            />
          </div>
          <HotelCardBody>
            <HotelCardTitle>
              <div className="flex justify-between w-full md:items-start">
                <div>
                  <div>Hotel Name</div>
                  <HotelCardLocation>
                    <MapPin className="inline text-brand" size={13} />
                    Brighton
                  </HotelCardLocation>
                </div>
              </div>
            </HotelCardTitle>

            <HotelCardContent>
              <h4 className="font-semibold">Why we love it</h4>
              <div className="flex flex-col justify-start gap-2 my-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great for families</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Short flight time from UK</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great weather</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#44708B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Great beaches</p>
                </div>
              </div>
            </HotelCardContent>
          </HotelCardBody>
        </HotelCard>
      </div>
    </section>
  )
}
