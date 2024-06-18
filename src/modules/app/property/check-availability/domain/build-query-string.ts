export function buildQueryString(params: object) {
  const filteredQueryString = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== '' && value !== '2'),
  )
  if (Object.keys(filteredQueryString).length === 0) return ''
  return '?' + new URLSearchParams(filteredQueryString).toString()
}
