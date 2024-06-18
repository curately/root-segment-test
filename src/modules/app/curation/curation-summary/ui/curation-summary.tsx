import Image from 'next/image'

import { getCurationSummary } from '@/app/curation/curation-summary/data-access/curation-summary-data-access'
import { ErrorList } from '@/shared/ui/error/error-list'

type PrismaSlug = {
  prismaSlug: string
}

export async function CurationSummary({ prismaSlug }: PrismaSlug) {
  if (!prismaSlug) {
    return null
  }

  const { data, errors } = await getCurationSummary(prismaSlug)

  if (errors) return <ErrorList errors={errors} />

  if (!data) {
    return 'No curation summary found'
  }

  const { bannerImage, heading, introText } = data

  return (
    <div className="relative">
      <div className="relative aspect-[3/2] w-full md:aspect-[3/1]">
        <Image
          src={`/images/best-of/${bannerImage}`}
          alt="image"
          priority
          width={1200}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-12 hidden h-[350px] w-[600px] rounded-t-xl bg-white/95 p-12 xl:block">
          <TextSummary heading={heading} description={introText} />
        </div>
      </div>
      <div className="py-4 md:py-0 xl:hidden">
        <TextSummary heading={heading} description={introText} />
      </div>
    </div>
  )
}

function TextSummary({ heading, description }: { heading: string; description: string }) {
  return (
    <div>
      <p className="text-xl text-gray-900">Best hotels with...</p>
      <p className="text-4xl text-gray-950 md:text-5xl">{heading}</p>
      <p className="line-clamp-4 pt-sm text-xl leading-7 text-gray-900 md:pt-lg">{description}</p>
    </div>
  )
}
