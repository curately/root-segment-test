'use client'

import { MenuInner } from '@/app/layout/header/ui/menu-inner'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Menu as BurgerMenuIcon, Search } from 'react-feather'
import { ROUTE_URLS } from '@/shared/domain/routes'

interface Props {
  inContainer?: boolean
  showSearch?: boolean
}
export function MenuContainer({ inContainer = false, showSearch = false }: Props) {
  const pathName = usePathname()

  const [activeId, setActiveId] = useState('')

  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="group">
      <nav>
        <button
          tabIndex={-1}
          aria-label="Open menu"
          onClick={() => {
            setMenuOpen(true)
          }}
          className="z-50 flex items-center cursor-pointer text-dark xl:hidden"
        >
          <BurgerMenuIcon />
        </button>
        <div className={`hidden items-center justify-center gap-8  ${menuOpen ? 'xl:hidden' : 'xl:flex'}`}>
          <Link
            href={ROUTE_URLS.pages.about}
            className={`text-xl text-dark ${
              pathName === '/about-us'
                ? 'decoration-single underline decoration-brand-300 decoration-4 underline-offset-4'
                : ''
            }`}
          >
            About Us
          </Link>
          <div
            role="button"
            className="text-xl text-dark"
            onMouseOver={() => {
              if (activeId !== 'link_items_0') {
                setActiveId('link_items_0')
              }
            }}
            onClick={e => {
              e.preventDefault()
              setActiveId('link_items_0')
              setMenuOpen(true)
            }}
          >
            Popular destinations
          </div>
          <div
            role="button"
            className="text-xl text-dark"
            onMouseOver={() => {
              if (activeId !== 'link_items_1') {
                setActiveId('link_items_1')
              }
            }}
            onClick={e => {
              e.preventDefault()
              setActiveId('link_items_1')
              setMenuOpen(true)
            }}
          >
            Best Of
          </div>
          {showSearch ? (
            <Link href={ROUTE_URLS.pages.search}>
              <Search
                className={`text-xl text-dark ${
                  pathName === '/search'
                    ? 'decoration-single underline decoration-brand-300 decoration-4 underline-offset-4'
                    : ''
                }`}
              />
            </Link>
          ) : (
            false
          )}
        </div>
        <div
          className={`absolute left-0  top-0   z-50 ${
            menuOpen ? 'visible' : 'invisible'
          } h-[100vh]  w-screen overflow-y-auto   bg-white/10  opacity-100 `}
        >
          <div className="flex justify-between">
            <div
              className="hidden w-full xl:block"
              onClick={() => {
                setMenuOpen(false)
                setActiveId('')
              }}
            ></div>
            <div className="w-full bg-white xl:w-[560px] xl:border-l xl:border-l-pill">
              <MenuInner setMenuOpen={setMenuOpen} activeId={activeId} setActiveId={setActiveId} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
