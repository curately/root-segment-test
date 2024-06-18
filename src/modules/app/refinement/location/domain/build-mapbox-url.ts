import { env } from 'env'

export function buildMapboxAutoCompleteUrl(inputValue: string) {
  const apiUrl = [
    env.NEXT_PUBLIC_MAPBOX_AUTOCOMPLETE_API,
    inputValue,
    '.json?access_token=',
    'pk.eyJ1IjoidGhlZmFtaWx5aG90ZWxndWlkZSIsImEiOiJjbGdqNno3bTUxMnN1M2RwaHZnajlsM2k1In0.VLvow3R3rakCza3hK4p86w',
    '&autocomplete=true&language=en&types=country,region,district,place,locality,poi',
  ].join('')
  return apiUrl
}
