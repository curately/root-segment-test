'use client'

import { CuratelyScore } from '@/shared/ui/curately-score'

type Props = {
  score: number
}
export function CuratelyScoreClient({ score }: Props) {
  return (
    <div
      onClick={(e: any) => {
        if (e && e.stopPropagation) e.stopPropagation()
        //console.log('clicked')
      }}
    >
      <CuratelyScore score={score} className="w-10 h-10 rounded-full " />
    </div>
  )
}
