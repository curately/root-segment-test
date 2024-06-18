import Image from 'next/image'
import Link from 'next/link'

export function CurationList() {
  return (
    <section className="container mx-auto max-w-[1200px]  py-xl">
      <h2 className="text-3xl ">Our Best Of Collection</h2>
      <h3 className="text-xl font-normal font-body">
        {"We've"} curated the best collection of hotels with those all important family-friendly amenities.
      </h3>
      <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-5">
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative col-span-2 row-span-2  ml-4  w-full shrink-0 snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Playground</h2>
          </div>
          <Image
            src={`/images/best-of/square/playground.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Bike rentals</h2>
          </div>
          <Image
            src={`/images/best-of/square/bicycle-rentals.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Free cribs</h2>
          </div>
          <Image
            src={`/images/best-of/square/infant-beds.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Baby sitting</h2>
          </div>
          <Image
            src={`/images/best-of/square/babysitter.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-sm bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Swim up bar</h2>
          </div>
          <Image
            src={`/images/best-of/square/swim-up-bar.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-sm"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Indoor pool</h2>
          </div>
          <Image
            src={`/images/best-of/square/indoor-pool.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Pool</h2>
          </div>
          <Image
            src={`/images/best-of/square/pool.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Waterpark</h2>
          </div>
          <Image
            src={`/images/best-of/square/waterpark.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2] "
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Beach location</h2>
          </div>
          <Image
            src={`/images/best-of/square/beach-location.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative col-span-2 row-span-2  ml-4  w-full shrink-0 snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Spa</h2>
          </div>
          <Image
            src={`/images/best-of/square/spa.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Games room</h2>
          </div>
          <Image
            src={`/images/best-of/square/games-room.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Water sports</h2>
          </div>
          <Image
            src={`/images/best-of/square/watersports.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Tennis courts</h2>
          </div>
          <Image
            src={`/images/best-of/square/tennis.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Bowling alley</h2>
          </div>
          <Image
            src={`/images/best-of/square/bowling-alley.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Kids club</h2>
          </div>
          <Image
            src={`/images/best-of/square/kids-club.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Child care</h2>
          </div>
          <Image
            src={`/images/best-of/square/kids-club.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Housekeeping</h2>
          </div>
          <Image
            src={`/images/best-of/square/housekeeping.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Garden</h2>
          </div>
          <Image
            src={`/images/best-of/square/garden.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div
          //className="ml-4 md:2/3 relative aspect-square xl:aspect-[2/3]  w-[200px] h-[200px] xl:h-full shrink-0 snap-start snap-always rounded-xl  sm:w-[44%] md:w-[15%]"
          className="aspect-square  relative ml-4 w-full  shrink-0  snap-start snap-always rounded-xl xl:aspect-[2/2]"
        >
          <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-dark">
            <h2 className="pl-4 mt-4 text-xl font-bold text-white">Kids stay free</h2>
          </div>
          <Image
            src={`/images/best-of/square/family.jpg`}
            alt="image"
            fill
            priority={false}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
