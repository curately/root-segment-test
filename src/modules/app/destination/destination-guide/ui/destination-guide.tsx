import { CheckCircle, CloudDrizzle, Umbrella } from 'react-feather'
import { Card, CardContent } from '@/shared/ui/card'
import { ErrorList } from '@/shared/ui/error/error-list'
import { SafeHtml } from '@/shared/ui/safe-html'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { getDestinationDescription } from '../data-access/destination-guide-data-access'
import type {
  AirportNames,
  DestinationIntroduction,
  Highlights,
  ThingsToDo,
  Weather,
  WhenToVisit,
} from '../domain/destination-guide-domain'
import { MONTH_NAMES, MONTHS, type Month } from '../domain/weather-months'
import { formatLargeLetter } from '../ui/format-large-letter'

type Props = {
  prismaSlug: string
  className?: string
}

type WeatherCardProps = {
  weather: Weather | null
  month: Month
}

export async function DestinationGuide({ prismaSlug, className }: Props) {
  const { data, errors } = await getDestinationDescription(prismaSlug)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!data) {
    return <div>No description returned</div>
  }

  const { destinationName, destinationDescription, thingsToDo, whenToVisit, weather, highlights, airportNames } = data
  const defaultValue = getDefaultValue({
    destinationDescription,
    thingsToDo,
    whenToVisit,
    weather,
    highlights,
    airportNames,
  })
  return (
    <div className="flex flex-col gap-8 px-4">
      <h2 className="text-5xl">{destinationName} Travel Guide</h2>
      <Tabs defaultValue={defaultValue} className="block w-full" orientation="horizontal">
        <TabsList className="grid w-full grid-cols-6 bg-white">
          {destinationDescription ? (
            <TabsTrigger value="about" className="rounded-2xl hover:text-dark/80 data-[state=active]:bg-accent">
              About
            </TabsTrigger>
          ) : null}
          {thingsToDo ? (
            <TabsTrigger value="thingstodo" className="rounded-2xl hover:text-dark/80 data-[state=active]:bg-accent">
              Things to do
            </TabsTrigger>
          ) : null}
          {whenToVisit ? (
            <TabsTrigger value="whentovisit" className="rounded-2xl hover:text-dark/80 data-[state=active]:bg-accent">
              When to visit
            </TabsTrigger>
          ) : null}
          {weather ? (
            <TabsTrigger value="weather" className="rounded-2xl hover:text-dark/80 data-[state=active]:bg-accent">
              Weather
            </TabsTrigger>
          ) : null}
          {highlights.length ? (
            <TabsTrigger value="highlights" className="rounded-2xl hover:text-dark/80 data-[state=active]:bg-accent">
              Highlights
            </TabsTrigger>
          ) : null}
          {airportNames ? (
            <TabsTrigger value="airports" className="rounded-2xl hover:text-dark/80 data-[state=active]:bg-accent">
              Airports
            </TabsTrigger>
          ) : null}
        </TabsList>
        {destinationDescription ? (
          <TabsContent value="about">
            <Card>
              <CardContent className="py-4 space-y-2">
                <DescriptionSection title="About Brighton" content={destinationDescription} largeFirstLetter={true} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {thingsToDo ? (
          <TabsContent value="thingstodo">
            <Card>
              <CardContent className="py-4 space-y-2">
                <DescriptionSection title="Things to do" content={thingsToDo} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {whenToVisit ? (
          <TabsContent value="whentovisit">
            <Card>
              <CardContent className="py-4 space-y-2">
                <DescriptionSection title="When to visit" content={whenToVisit} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {weather ? (
          <TabsContent value="weather">
            <Card>
              <CardContent className="py-4 space-y-2">
                <WeatherSection weather={weather} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {highlights.length ? (
          <TabsContent value="highlights">
            <Card>
              <CardContent className="py-4 space-y-2">
                <HighlightsSection highlights={highlights} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
        {airportNames ? (
          <TabsContent value="airports">
            <Card>
              <CardContent className="py-4 space-y-2">
                <AirportsSection airportNames={airportNames} />
              </CardContent>
            </Card>
          </TabsContent>
        ) : null}
      </Tabs>
      {/*}
      <article className={cn('text-dark flex flex-col gap-8', className)}>
        <DescriptionSection content={destinationDescription} largeFirstLetter={true} />
        <DescriptionSection title="Things to do" content={thingsToDo} />
        <DescriptionSection title="When to visit" content={whenToVisit} />
        <WeatherSection weather={weather} />
        <HighlightsSection highlights={highlights} />
        <AirportsSection airportNames={airportNames} />
      </article>
  */}
    </div>
  )
}

function DescriptionSection({
  title,
  content,
  largeFirstLetter = false,
}: {
  title?: string
  content: string | null
  largeFirstLetter?: boolean
}) {
  if (!content || content === '') {
    return null
  }
  if (largeFirstLetter) {
    content = formatLargeLetter(content)
  }
  if (!title) {
    return (
      <div className="text-lg prose">
        <SafeHtml>{content}</SafeHtml>
      </div>
    )
  }
  return (
    <div>
      <DescriptionSectionTitle>{title}</DescriptionSectionTitle>
      <div className="text-lg prose">
        <SafeHtml>{content}</SafeHtml>
      </div>
    </div>
  )
}

function DescriptionSectionTitle({ children }: { children: React.ReactNode }) {
  if (!children) {
    return null
  }
  return <h3 className="text-2xl font-semibold text-dark ">{children}</h3>
}

function WeatherSection({ weather }: { weather: Weather | null }) {
  if (!weather) {
    return null
  }
  return (
    <>
      <h2 className="text-2xl font-semibold text-dark ">Weather</h2>
      <div className="flex w-full gap-6 overflow-x-scroll bg-white snap-x snap-mandatory scroll-px-10 scroll-smooth scrollbar-hide">
        {MONTHS.map((month, index) => {
          return <WeatherCard key={index} weather={weather} month={month} />
        })}
      </div>
    </>
  )
}

function WeatherCard({ weather, month }: WeatherCardProps) {
  if (!weather) {
    return null
  }
  const { highTemp, lowTemp, totalRainFallCm, rainyDays } = weather
  return (
    <div className="relative aspect-[16/9] shrink-0 snap-start snap-always rounded-xl border-1 border-primary-100 bg-primary-50 p-4">
      <div className="text-lg font-bold"> {MONTH_NAMES[month].slice(0, 3)}</div>
      <p className="text-md text-dark">
        High: {highTemp[month]}°C | Low: {lowTemp[month]}°C
      </p>

      <div className="flex items-center gap-2 my-3">
        <CloudDrizzle className="text-sm text-brand/60" size={15} />
        <p className="text-sm text-dark">Rainfall: {totalRainFallCm[month]}mm</p>
      </div>
      <div className="flex items-center gap-2 my-3">
        <Umbrella className="text-sm text-brand/60" size={15} />
        <p className="text-sm text-dark">
          Rainy Days: <span className="font-semibold">{rainyDays[month]}</span>
        </p>
      </div>
    </div>
  )
}

function HighlightsSection({ highlights }: { highlights: Array<string> | null }) {
  if (!highlights || !highlights.length) {
    return null
  }
  return (
    <article className="flex flex-col gap-sm">
      <h2 className="text-2xl font-semibold text-dark ">{"Things you'll love..."}</h2>
      <ul>
        {highlights.map((highlight, index) => {
          return (
            <li key={index} className="flex items-center justify-start gap-4 py-2">
              <div>
                <CheckCircle className="text-lg text-brand text-primary-600 md:block" size={20} />
              </div>
              <div className="text-lg">{highlight}</div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

function AirportsSection({ airportNames }: { airportNames: Array<string> | null }) {
  if (!airportNames || !airportNames.length) {
    return null
  }
  return (
    <>
      <div className="flex items-center justify-start gap-2">
        {/*<Image src={Plane} alt="Airplane" width={20} style={{ height: 'auto' }} />*/}
        <h4 className="text-2xl font-semibold text-dark">
          Main airport
          {airportNames.length > 1 ? 's' : null}
        </h4>
      </div>
      <ul className="list-disc list-inside">
        {airportNames.map((name, index) => {
          return (
            <li key={index} className="w-full text-lg">
              {name}
            </li>
          )
        })}
      </ul>
    </>
  )
}
type getDefaultValueProps = {
  destinationDescription: DestinationIntroduction
  thingsToDo: ThingsToDo
  whenToVisit: WhenToVisit
  weather: Weather
  highlights: Highlights
  airportNames: AirportNames
}
function getDefaultValue({
  destinationDescription,
  thingsToDo,
  whenToVisit,
  weather,
  highlights,
  airportNames,
}: getDefaultValueProps) {
  if (destinationDescription) {
    return 'about'
  }
  if (thingsToDo) {
    return 'thingstodo'
  }
  if (whenToVisit) {
    return 'whentovisit'
  }
  if (weather) {
    return 'weather'
  }
  if (highlights.length) {
    return 'highlights'
  }
  if (airportNames) {
    return 'airports'
  }
  return 'about'
}
