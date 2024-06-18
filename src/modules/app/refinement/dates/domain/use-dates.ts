type UseDatesProps = {
  checkin: string | null
  checkout: string | null
}
export function useDates({ checkin, checkout }: UseDatesProps) {
  let hasDates = true
  if (!checkin || !checkout) {
    hasDates = false
  }
  if (checkin === '' || checkout === '') {
    hasDates = false
  }

  return { hasDates }
}
