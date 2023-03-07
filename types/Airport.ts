export type Airports = Airport[]

export interface Airport {
  id: number
  name: string
  iata: string
  icao: string
  city: string
  lat: number
  lon: number
  country: string
  alt: any
  size: number
  timezone: Timezone
  countryId: number
}

export interface Timezone {
  name: string
  offset: number
  offsetHours: string
  abbr: string
  abbrName: string
  isDst: boolean
}
