import { type ButtonProps } from '@react-types/button'
import React, { useRef } from 'react'
import { useButton } from 'react-aria'

export function CalendarButton(props: ButtonProps) {
  let ref = useRef(null)
  let { buttonProps, isPressed } = useButton(props, ref)

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`  disabled:opacity-20 disabled:hover:bg-white ${
        isPressed ? 'border-white bg-white outline-none' : 'outline-none'
      }`}
    >
      {props.children}
    </button>
  )
}
