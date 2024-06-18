'use client'

//import { SearchBarNarrow } from "components/layout/search-bar/search-bar-narrow"
//import { SkipRenderOnClient } from "components/skip-render-on-client"
import HeroImage from '@public/hotelLuxury3.jpg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ROUTE_URLS } from '@/shared/domain/routes'
import { Logo } from '@/shared/ui/logo'
import { MenuContainer } from '../header/ui/menu-container'
import { SearchBarDesktop } from '../searchbar/search-bar-desktop'
import { SearchBarMobileContainer } from '../searchbar/searchbar-mobile-container'

const MOBILE_BREAKPOINT = 768
const pages = ROUTE_URLS.pages
const propertyValues = Object.values(pages)
const noSearchBarRoutes = [ROUTE_URLS.pages.home]
const searchBarRoutesContained = [ROUTE_URLS.pages.bestOf, ROUTE_URLS.pages.about]
const searchBarRoutesShouldScroll = [ROUTE_URLS.pages.bestOf, ROUTE_URLS.pages.about, ROUTE_URLS.pages.hotel]
//const stickHeaderRoutes = [ROUTE_URLS.pages.hotel]
const HOTEL_PAGE = [ROUTE_URLS.pages.hotel]
const NEVER_STICKY_ROUTES = [
  ROUTE_URLS.pages.home,
  ROUTE_URLS.pages.about,
  ROUTE_URLS.pages.bestOf,
  ROUTE_URLS.pages.hotel,
]
export function NavBar() {
  const pathName = usePathname()

  const firstPartOfPath = '/' + pathName.split('/')[1]

  //const sticky = searchBarRoutesShouldScroll.includes(pathName) ? false : true
  //const container = searchBarRoutesContained.includes(firstPartOfPath) ? true : false
  const container = firstPartOfPath === (ROUTE_URLS.pages.bestOf || ROUTE_URLS.pages.about) ? true : false
  const sticky =
    firstPartOfPath ===
    (ROUTE_URLS.pages.home || ROUTE_URLS.pages.bestOf || ROUTE_URLS.pages.home || ROUTE_URLS.pages.hotel)
      ? false
      : true
  const isHotelPage = firstPartOfPath === ROUTE_URLS.pages.hotel ? true : false

  const noSearchBar = firstPartOfPath === ROUTE_URLS.pages.home ? true : false
  //const sticky = NEVER_STICKY_ROUTES.includes(firstPartOfPath) ? false : true
  //const isHotelPage = HOTEL_PAGE.includes(firstPartOfPath) ? true : false
  if (isHotelPage) {
    return (
      <nav className="top-0 z-50 bg-white border-b border-b-ivory">
        <div
          className={`z-9 container top-0 mx-auto h-header  max-w-[1100px] border-0 border-pill px-0 md:h-header-lg`}
        >
          <div className="flex items-center justify-between w-full h-full px-4 xl:px-0">
            <div className="relative">
              <Logo />
            </div>

            <div>
              <MenuContainer showSearch={true} />
            </div>
          </div>
        </div>
      </nav>
    )
  }
  if (noSearchBar) {
    return (
      <>
        <nav className="top-0 z-30 bg-white ">
          <div className="top-0 z-50 px-0 mx-auto border-b h-header border-pill md:h-header-lg xl:px-10">
            <div className="container flex items-center justify-between w-full h-full px-4 mx-auto max-w-inner-container xl:px-0">
              <div className="w[1/3]  logo relative">
                <Logo />
              </div>

              <div className="w[1/3]">
                <MenuContainer inContainer={true} />
              </div>
            </div>
          </div>
        </nav>

        <div className="after:inset  relative isolate bg-gray-900 after:absolute after:top-0  after:aspect-[16/9] after:w-full after:bg-black/20 max-md:aspect-[16/9] md:h-[440px] md:after:content-[]">
          <Image src={HeroImage} alt="" fill className="absolute inset-0 object-cover w-full h-full -z-10 bg-dark/20" />
          <div className="w-full h-full bg-cyan-900/20">
            <div className="w-full h-full max-w-6xl pt-24 mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-6xl">
                Amazing family hotels
              </h1>
              <div className="pt-16">
                <SearchBarDesktop />
              </div>
              <div className="pt-16">
                <SearchBarMobileContainer />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <nav className={`${sticky ? 'sticky' : ''} top-0 z-50 bg-white`}>
      <div
        className={`z-9 top-0 mx-auto h-header border-0  border-pill px-0 md:h-header-lg ${
          container ? 'container' : 'xl:px-10'
        }`}
      >
        <div className="flex items-center justify-between w-full h-full px-4 xl:px-0">
          <div className="relative">
            <Logo />
          </div>

          <div>
            <MenuContainer />
          </div>
        </div>
      </div>
      <div>
        {/*}
        <SkipRenderOnClient
          breakpoint={MOBILE_BREAKPOINT}
          shouldRenderOnClient={() => window?.innerWidth < MOBILE_BREAKPOINT}
        >
          <SearchBarNarrow />
        </SkipRenderOnClient>
        <SkipRenderOnClient
          breakpoint={MOBILE_BREAKPOINT}
          shouldRenderOnClient={() => window?.innerWidth >= MOBILE_BREAKPOINT}
        >
          <div className="hidden w-full bg-primary-300 md:block">
            <div
              className={`${container ? 'container' : 'xl:px-10'} ${
                isHotelPage && 'max-w-hotel-container'
              }  w-full py-2 mx-auto max-w-inner-container h-searchbar-lg bg-primary-300 flex items-center flex-cols`}
            >
              <SearchBarWide />
            </div>
          </div>
        </SkipRenderOnClient>
            */}
        {/*} <SearchBarNarrow /> */}
        <div className="w-full bg-primary-300 ">
          <div
            className={`${container ? 'container' : 'xl:px-10'} ${
              isHotelPage && 'max-w-hotel-container'
            }  md:flex-cols mx-auto hidden h-searchbar-lg w-full max-w-inner-container items-center bg-primary-300 py-2 md:flex `}
          >
            <SearchBarDesktop />
          </div>
          <div className="md:hidden">
            <SearchBarMobileContainer />
          </div>
        </div>
      </div>
    </nav>
  )
}
