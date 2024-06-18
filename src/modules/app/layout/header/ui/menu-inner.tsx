import { MenuData } from '@/app/layout/header/ui/menu.constants'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'react-feather'

interface Props {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
}

export function MenuInner({ setMenuOpen, activeId, setActiveId }: Props) {
  const [backButtonId, setbackButtonId] = useState('')

  return (
    <>
      <nav className="z-50 nav-mobile ">
        <div className="flex items-center justify-between w-full px-4 pl-2 bg-white h-header text-dark">
          <div className="w-[60px]">
            {activeId !== '' ? (
              <div
                //href="#0"
                className="w-full tfgh_nav_link_back"
                onClick={e => {
                  setActiveId(backButtonId)
                  setbackButtonId('')
                }}
              >
                <div className="flex items-center w-full">
                  <ChevronLeft />
                </div>
              </div>
            ) : (
              <div className="flex items-center "></div>
            )}
          </div>
          <button
            onClick={e => {
              //e.stopPropagation()
              setMenuOpen(false)
              setActiveId('')
            }}
          >
            <X className="z-50 cursor-pointer text-dark" />
          </button>
        </div>
        <ul id="tfhg_nav" className="relative w-full h-screen p-0 m-0 ">
          <li key="about-us" className="">
            <Link href="/about-us" className="text-3xl font-medium font-header text-dark">
              About Us
            </Link>
          </li>
          {MenuData.map((item, index) => {
            let additionalChildrenIds = [] as string[]
            if (item.children.length) {
              item.children.map((child, childIndex) => {
                additionalChildrenIds.push(`link_items_${index}_${childIndex}`)
              })
            }

            return (
              <li key={item.label} className={'children' in item ? `tfgh_has_children  last:border-b-0 ` : ''}>
                <div
                  //href="#0"
                  onClick={() => {
                    if ('children' in item) {
                      setActiveId(`link_items_${index}`)
                      setbackButtonId('')
                    }
                  }}
                >
                  <div className={`flex items-center justify-between  ${index === 0 ? 'mt-0' : ''}`}>
                    <div className="text-3xl font-medium font-header">{item.label}</div>
                    {item.children && <ChevronRight className="text-medium" size={30} />}
                  </div>
                </div>
                <ul
                  id={`link_items_${index}`}
                  className={
                    activeId === `link_items_${index}` || additionalChildrenIds.includes(activeId)
                      ? 'active  p0 relative z-50 m-0 h-screen w-full'
                      : 'p0 relative m-0 h-screen w-full'
                  }
                >
                  {item.children && (
                    <>
                      {item.children.map((child, childIndex) => {
                        const hasChildren = 'children' in child
                        return (
                          <li
                            key={child.label}
                            className={
                              'children' in child
                                ? 'tfgh_has_children border-b border-b-pill/50 last:border-b-0'
                                : 'border-b border-b-pill/50'
                            }
                          >
                            {hasChildren ? (
                              <div
                                role="button"
                                className="block cursor-pointer p-sm"
                                onClick={() => {
                                  if (hasChildren) {
                                    setActiveId(`link_items_${index}_${childIndex}`)
                                    setbackButtonId(`link_items_${index}`)
                                  } else {
                                    setMenuOpen(false)
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="text-xl">{child.label}</div>
                                  <ChevronRight className="text-medium" />
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={child.href}
                                onClick={() => {
                                  if (hasChildren) {
                                    setActiveId(`link_items_${index}_${childIndex}`)
                                    setbackButtonId(`link_items_${index}`)
                                  } else {
                                    setMenuOpen(false)
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="text-xl">{child.label}</div>
                                </div>
                              </Link>
                            )}
                            {/*
                            <Link
                              href={hasChildren ? '#' : child.href}
                              onClick={() => {
                                if (hasChildren) {
                                  setActiveId(`link_items_${index}_${childIndex}`)
                                  setbackButtonId(`link_items_${index}`)
                                } else {
                                  setMenuOpen(false)
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-xl">{child.label}</div>
                                {hasChildren && <ChevronRight className="text-medium" />}
                              </div>
                            </Link>
                            */}
                            <ul
                              id={`link_items_${index}_${childIndex}`}
                              className={
                                activeId === `link_items_${index}_${childIndex}`
                                  ? 'active p0 relative m-0 h-screen w-full'
                                  : 'p0 relative m-0 h-screen w-full'
                              }
                            >
                              {hasChildren &&
                                child.children.map(innerChild => {
                                  return (
                                    <li
                                      key={innerChild.label}
                                      className={
                                        hasChildren
                                          ? 'tfgh_has_children border-b border-b-pill/50 last:border-b-0'
                                          : 'border-b border-b-pill/50'
                                      }
                                    >
                                      <Link
                                        href={innerChild.href}
                                        onClick={() => {
                                          setMenuOpen(false)
                                        }}
                                      >
                                        <span className="text-xl">{innerChild.label}</span>
                                      </Link>
                                    </li>
                                  )
                                })}
                            </ul>
                          </li>
                        )
                      })}
                    </>
                  )}
                </ul>
              </li>
            )
          })}

          {activeId === '' && (
            <li>
              <div
                className="absolute bottom-[65px] left-0 z-0 h-[150px] w-full overflow-hidden bg-accent"
                style={{
                  clipPath: 'polygon(0 28%, 100% 0, 100% 100%, 0% 100%)',
                }}
              >
                <div className="flex h-[150px] flex-col justify-center pt-4 text-center">
                  &copy; 2023 The Family Hotel Guide
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}
