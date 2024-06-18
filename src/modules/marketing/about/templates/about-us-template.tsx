import { AboutUsHero } from '../hero/ui/hero'
import { AboutUsMainContent } from '../main-content/ui/new-content'

export function AboutUsTemplate() {
  return (
    <main className="isolate md:mb-24">
      <AboutUsHero />
      <AboutUsMainContent />
    </main>
  )
}
