export function formatLargeLetter(paragraph: string) {
  return paragraph.replace('<p>', '<p class="first-letter:text-4xl first-letter:font-header">')
}
