export interface FlightLargeType {
  meta: Meta
  data: FlightType[]
  dictionaries: Dictionaries
}

export interface Meta {
  count: number
  links: Links
}

export interface Links {
  self: string
}

export interface FlightType {
  type: string
  id: string
  source: string
  instantTicketingRequired: boolean
  nonHomogeneous: boolean
  oneWay: boolean
  lastTicketingDate: string
  numberOfBookableSeats: number
  itineraries: Itinerary[]
  price: Price
  pricingOptions: PricingOptions
  validatingAirlineCodes: string[]
  travelerPricings: TravelerPricing[]
}

export interface Itinerary {
  duration: string
  segments: Segment[]
}

export interface Segment {
  departure: Departure
  arrival: Arrival
  carrierCode: string
  number: string
  aircraft: Aircraft
  operating: Operating
  duration: string
  id: string
  numberOfStops: number
  blacklistedInEU: boolean
}

export interface Departure {
  iataCode: string
  terminal: string
  at: string
}

export interface Arrival {
  iataCode: string
  terminal?: string
  at: string
}

export interface Aircraft {
  code: string
}

export interface Operating {
  carrierCode: string
}

export interface Price {
  currency: string
  total: string
  base: string
  fees: Fee[]
  grandTotal: string
}

export interface Fee {
  amount: string
  type: string
}

export interface PricingOptions {
  fareType: string[]
  includedCheckedBagsOnly: boolean
}

export interface TravelerPricing {
  travelerId: string
  fareOption: string
  travelerType: string
  price: Price2
  fareDetailsBySegment: FareDetailsBySegment[]
}

export interface Price2 {
  currency: string
  total: string
  base: string
}

export interface FareDetailsBySegment {
  segmentId: string
  cabin: string
  fareBasis: string
  class: string
  includedCheckedBags: IncludedCheckedBags
}

export interface IncludedCheckedBags {
  weight: number
  weightUnit: string
}

export interface Dictionaries {
  locations: any
  aircraft: any
  currencies: any
  carriers: any
}

// export interface Locations {
//   BKK: Bkk
//   MNL: Mnl
//   SYD: Syd
// }

// export interface Bkk {
//   cityCode: string
//   countryCode: string
// }

// export interface Mnl {
//   cityCode: string
//   countryCode: string
// }

// export interface Syd {
//   cityCode: string
//   countryCode: string
// }

// export interface Aircraft2 {
//   "320": string
//   "321": string
//   "333": string
// }

// export interface Currencies {
//   EUR: string
// }

// export interface Carriers {
//   PR: string
// }
