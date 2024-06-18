import type {
  Collection,
  CollectionContent,
  CollectionProgrammaticContentAirports,
  CollectionProgrammaticContentWeather,
} from '@prisma/client'
import type { Prettify } from '@/shared/domain/utility-types'

export type DestinationName = Collection['name']
export type DestinationIntroduction = CollectionContent['introduction']
export type Highlights = CollectionContent['highlights']
export type ThingsToDo = CollectionContent['thingsToDo']
export type WhenToVisit = CollectionContent['whenToVisit']
export type Weather = CollectionProgrammaticContentWeather
export type AirportNames = Array<CollectionProgrammaticContentAirports['name']>

export type DestinationDescription = Prettify<{
  destinationName: DestinationName
  destinationDescription: DestinationIntroduction
  highlights: Highlights
  thingsToDo: ThingsToDo
  whenToVisit: WhenToVisit
  weather: Weather
  airportNames: AirportNames
}>
