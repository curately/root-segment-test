import { Breadcrumb } from '@/app/shared/breadcrumb/ui/breadcrumb'

import { CuratedProperties } from '../curated-properties/ui/curated-properties'
import { CurationSummary } from '../curation-summary/ui/curation-summary'

type Props = {
  prismaSlug: string
}

export function CurationTemplate({ prismaSlug }: Props) {
  return (
    <div className="px-4 mx-auto max-w-hotel-container">
      <CurationBreadcrumb prismaSlug={prismaSlug} />
      <CurationSummary prismaSlug={prismaSlug} />
      <h2 className="text-3xl font-semibold py-xl text-gray-950">Our top recommended hotels</h2>
      <CuratedProperties prismaSlug={prismaSlug} />
    </div>
  )
}

function CurationBreadcrumb({ prismaSlug }: Props) {
  if (prismaSlug === '/best-of') {
    return <div className="w-full py-lg">&nbsp;</div>
  }
  return <Breadcrumb type="curation" prismaSlug={prismaSlug} hideLast={false} className="w-full py-lg" />
}
