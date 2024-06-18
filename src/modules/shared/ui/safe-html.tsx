//'use client'
import parse from 'html-react-parser'
import React from 'react'
import sanitizeHtml from 'sanitize-html'

interface safeHtml {
  children: string | undefined
}
export function SafeHtml({ children }: safeHtml) {
  if (!children) {
    return <div></div>
  }
  if (typeof children !== 'string') {
    return <div>Please make sure you are only passing HTML and not JSX element</div>
  }

  let sanitizedHtml = sanitizeHtml(children, {
    allowedAttributes: { p: ['class'], div: ['class'] },
  })
  sanitizedHtml = sanitizedHtml.replaceAll('~', '')
  return <>{parse(sanitizedHtml)}</>
}
