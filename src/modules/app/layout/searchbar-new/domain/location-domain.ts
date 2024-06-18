import { usePathname, useSearchParams } from "next/navigation"
import { useRef } from "react"

export function useLocation() {
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const location = searchParams.get('location') ?? ''
  return { location, inputRef }
}
