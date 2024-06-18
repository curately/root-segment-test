import { env } from 'env'

const stats = [
  { label: 'Family friendly hotels on our website', value: '125k' },
  { label: 'Unique destination guides to explore', value: '48k' },
]
const hotelDotComLink = env.NEXT_PUBLIC_PARTNERIZE_BASE_AFF_LINK.replace('/destination:', '') ?? 'https://uk.hotels.com'

export function AboutUsMainContent() {
  return (
    <>
      <div className="px-6 mx-auto -mt-12 max-w-7xl sm:mt-0 lg:px-8 xl:-mt-8">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We&apos;re on a mission to help families...
          </h2>
          <div className="flex flex-col mt-6 gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
                To find the right hotel for <span className="italic font-medium text-dark">your</span> family we have
                developed a unique hotel ranking system. We consider amenities and facilities specifically designed for
                families, such as spacious rooms, play areas, kid-friendly pools, babysitting services, and more.
              </p>
              <div className="max-w-xl mt-10 text-base leading-7 text-gray-700">
                <p className="mt-10">
                  But we don&apos;t stop there! We also consider feedback from families who have actually stayed at
                  these hotels. We analyse all those juicy guest reviews to learn about the service, how friendly the
                  staff is to kids, and the overall family experience. We take all that insider info and blend it with
                  our objective data to create a ranking system that&apos;s filters out only the best.
                </p>
                <p className="mt-10">
                  We understand that what makes a hotel perfect for one family may not be the same for another.
                  That&apos;s why our ranking system is smartly weighted to match different family dynamics and
                  preferences. Whether you&apos;ve got tiny tots, active teenagers, or a mix of generations exploring
                  together, we&apos;ve got you covered.
                </p>
                <p className="mt-10">
                  And when you have found the perfect hotel, and checked real-time availability and pricing, you can
                  proceed to book online directly with our booking partner{' '}
                  <a href={hotelDotComLink} target="_blank" rel="noreferrer" className="underline">
                    hotels.com
                  </a>{' '}
                  for total peace of mind.
                </p>
                <p className="mt-10">
                  Ready to dive in? Start exploring our curated collection of family-friendly hotels now and let&apos;s
                  make some incredible memories together!
                </p>
                <p className="mt-10">
                  Happy travels,
                  <br />
                  The Family Hotels Guide Team
                </p>
              </div>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map(stat => (
                  <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                    <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Image section */}
      <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          src="/images/best-of/bicycle-rentals.jpg"
          alt="playground"
          className="aspect-[16/9] w-full object-cover md:aspect-[5/2] xl:rounded-3xl"
        />
      </div>
    </>
  )
}
