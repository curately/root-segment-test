import Link from 'next/link'
import { MapPin } from 'react-feather'
import {
  HotelCard,
  HotelCardBody,
  HotelCardContent,
  HotelCardLocation,
  HotelCardTitle,
} from '@/shared/ui/home-page-card'

export function PopularDestinations() {
  return (
    <>
      <section className="">
        <div className="grid grid-cols-2">
          <div className="bg-red-500">
            {' '}
            <img
              alt=""
              src="https://ik.imagekit.io/curately/The%20Family%20Hotel%20Guide/Destinations/Domestic/hero.jpg?tr=w-1200,fo-auto"
              className="aspect-[16/9]"
            />
          </div>
          <div className="bg-ivory">
            <div className="p-12">
              <h2 className="text-3xl font-semibold font-body">UK</h2>
              <p className="max-w-[500px]">
                Whether indulging in traditional afternoon tea, exploring ancient castles, or strolling along
                picturesque coastlines, a holiday in the UK promises a delightful escape filled with both charm and
                character.
              </p>
              <div className="py-8" />
              <div className="grid grid-cols-3 gap-6 text-xl font-semibold font-body">
                <div className="">
                  <div>
                    <Link
                      href="/united-kingdom/england/brighton"
                      className="p-4 border rounded-md border-ivory hover:border hover:border-pill hover:bg-white"
                    >
                      Brighton (18 hotels)
                    </Link>
                  </div>
                  {/*<div className="text-sm">pools (3), wifi (16)</div>*/}
                </div>
                <div className="">Bristol</div>
                <div className="">London (200+)</div>
                <div className="">Brighton</div>
                <div className="">Edingburgh</div>
                <div className="">Blackpool</div>
                <div className="">Cambridge</div>
                <div className="">Dublin</div>
                <div className="">Manchester</div>
                <div className="">Newcastle</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="order-2 bg-red-500">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1612012921349-ddec45c8b3ab?q=80&w=4096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="aspect-[16/9]"
            />
          </div>
          <div className="order-1 bg-ivory">
            <div className="p-12">
              <h2 className="text-3xl font-semibold font-body">European Islands</h2>
              <p className="max-w-[500px]">
                Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and culturally
                immersive getaway in the heart of Europe.
              </p>
              <div className="py-8" />
              <div className="grid grid-cols-2 gap-6 text-xl font-semibold font-body">
                <div className="">Brighton</div>
                <div className="">Bristol</div>
                <div className="">London</div>
                <div className="">Brighton</div>
                <div className="">Edingburgh</div>
                <div className="">Blackpool</div>
                <div className="">Cambridge</div>
                <div className="">Dublin</div>
                <div className="">Manchester</div>
                <div className="">Newcastle</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <img
              alt=""
              src="https://ik.imagekit.io/curately/The%20Family%20Hotel%20Guide/Destinations/Domestic/hero.jpg?tr=w-1200,fo-auto"
              className="aspect-[16/9]"
            />
            <div className="p-6 bg-ivory">
              <h2 className="text-3xl font-semibold font-body">UK</h2>
              <p className="max-w-[500px]">
                Whether indulging in traditional afternoon tea, exploring ancient castles, or strolling along
                picturesque coastlines, a holiday in the UK promises a delightful escape filled with both charm and
                character.
              </p>
              <div className="py-4 text-xl">Explore our popular UK destinations</div>
              <div className="grid grid-cols-3 gap-2 text-base">
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
                <Link href="">Brighton</Link>
              </div>
            </div>
          </div>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="aspect-[16/9]"
            />
            <div className="p-6 bg-ivory">
              <h2 className="text-3xl font-semibold font-body">City Break</h2>
              <p className="max-w-[500px]">
                Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and culturally
                immersive getaway in the heart of Europe.
              </p>
            </div>
          </div>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="aspect-[16/9]"
            />
            <div className="p-6 bg-ivory">
              <h2 className="text-3xl font-semibold font-body">Winter Sun</h2>
              <p className="max-w-[500px]">
                Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and culturally
                immersive getaway in the heart of Europe.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?q=80&w=3861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="aspect-[16/9]"
            />
            <div className="p-6 bg-ivory">
              <h2 className="text-3xl font-semibold font-body">Beach</h2>
              <p className="max-w-[500px]">
                Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and culturally
                immersive getaway in the heart of Europe.
              </p>
            </div>
          </div>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="aspect-[16/9]"
            />
            <div className="p-6 bg-ivory">
              <h2 className="text-3xl font-semibold font-body">City Break</h2>
              <p className="max-w-[500px]">
                Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and culturally
                immersive getaway in the heart of Europe.
              </p>
            </div>
          </div>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="aspect-[16/9]"
            />
            <div className="p-6 bg-ivory">
              <h2 className="text-3xl font-semibold font-body">Winter Sun</h2>
              <p className="max-w-[500px]">
                Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and culturally
                immersive getaway in the heart of Europe.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-[1200px]  py-xl">
        <h2 className="text-3xl ">Popular Destinations</h2>
        <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-2">
          <HotelCard
            slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
            first={false}
          >
            <div className="relative w-full mx-auto text-center lg:w-full">
              <img
                alt=""
                src="https://ik.imagekit.io/curately/The%20Family%20Hotel%20Guide/Destinations/Domestic/hero.jpg?tr=w-800,h-600,fo-auto"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>UK</HotelCardTitle>

              <HotelCardContent>
                <p className="max-w-[75%]">
                  Whether indulging in traditional afternoon tea, exploring ancient castles, or strolling along
                  picturesque coastlines, a holiday in the UK promises a delightful escape filled with both charm and
                  character.
                </p>
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
                src="https://images.unsplash.com/photo-1612012921349-ddec45c8b3ab?q=80&w=4096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>European Islands</HotelCardTitle>

              <HotelCardContent>
                <p className="max-w-[75%]">
                  Indulge in the delectable local cuisines, meander through charming villages, and soak in the
                  Mediterranean sun, as these enchanting islands provide a perfect backdrop for a relaxing and
                  culturally immersive getaway in the heart of Europe.
                </p>
              </HotelCardContent>
            </HotelCardBody>
          </HotelCard>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          <HotelCard
            slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
            first={false}
          >
            <div className="relative w-full mx-auto text-center lg:w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?q=80&w=3861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>Beach</HotelCardTitle>

              <HotelCardContent>
                Escape to the ultimate relaxation with a beach holiday. Whether it is building sandcastles with the
                family, indulging in water sports, or simply basking in the sun-drenched tranquility, a beach getaway
                promises a rejuvenating break from the ordinary.
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
                src="https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>City Break</HotelCardTitle>

              <HotelCardContent>
                <p>
                  A city break offers an invigorating escape, allowing you to absorb the energy of a metropolis while
                  indulging in the thrill of discovering its hidden gems and unique charm.
                </p>
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
                src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>Winter sun</HotelCardTitle>

              <HotelCardContent>
                {' '}
                <p>
                  Whether it is unwinding poolside, partaking in water activities, or exploring vibrant local markets, a
                  winter sun getaway offers the perfect blend of tranquility and adventure, providing a welcome escape
                  from the chilly monotony of winter back home.
                </p>
              </HotelCardContent>
            </HotelCardBody>
          </HotelCard>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-2">
          <HotelCard
            slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
            first={false}
          >
            <div className="relative w-full mx-auto text-center lg:w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1602940659805-770d1b3b9911?q=80&w=4332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>Long haul</HotelCardTitle>

              <HotelCardContent>
                <p>
                  Embark on a journey to a long-haul destination and unlock a world of adventure and cultural diversity.
                  Whether it is the exotic landscapes of Southeast Asia, the vibrant energy of South America, or the
                  awe-inspiring vistas of New Zealand, long-haul destinations promise a tapestry of experiences.
                </p>
              </HotelCardContent>
            </HotelCardBody>
          </HotelCard>
          <HotelCard
            slug="/hotel/united-states-of-america/new-york/new-york/manhattan/mint-house-at-70-pine/506937"
            first={false}
          >
            <div className="relative w-full mx-auto text-center lg:w-full ">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1486684338211-1a7ced564b0d?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="aspect-[16/9] rounded-lg"
              />
            </div>
            <HotelCardBody>
              <HotelCardTitle>Ski</HotelCardTitle>

              <HotelCardContent>
                <p>
                  Whether {"you're"} carving down powdery slopes, enjoying après-ski delights in cozy chalets, or taking
                  in breathtaking panoramas from the mountaintop, a ski holiday is a thrilling escape into the heart of
                  winter magic. With the crisp mountain air and the scent of pine trees, these snowy retreats provide a
                  picturesque backdrop for a memorable and invigorating getaway.
                </p>
              </HotelCardContent>
            </HotelCardBody>
          </HotelCard>
        </div>
      </section>
    </>
  )
}
