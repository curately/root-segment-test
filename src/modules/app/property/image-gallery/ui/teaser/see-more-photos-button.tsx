'use client'

import { useQueryState } from 'nuqs'
import { Image as ImageIcon } from 'react-feather'
import { Button } from '@/shared/ui/button'

export function SeeMorePhotosButton({ numImages }: { numImages: number }) {
  const [_, setModal] = useQueryState('modal')

  return (
    <Button
      variant="pill"
      onClick={() => {
        setModal('gallery')
      }}
    >
      <div className="flex items-center justify-start gap-2 px-4 text-sm">
        <ImageIcon size={14} /> View all photos ({numImages})
      </div>
    </Button>
  )
}
