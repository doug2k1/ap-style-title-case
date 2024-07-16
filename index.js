/**
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean} [keepSpaces=false]
 *   Keep superfluous whitespace.
 *   Whitespace is turned into a space by default.
 * @property {Array<string>} [stopwords]
 *   List of stopwords.
 *   When a lowercased word is included in this list, it will be used as
 *   lowercase.
 *   Otherwise words are capitalized.
 */

const stopwords = 'a an and at but by for in nor of on or so the to up yet'
const defaults = stopwords.split(' ')

/**
 * Convert a value to AP/APA title case.
 *
 * @param {string} [value]
 *   Short text of unknown casing.
 * @param {Options} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Title-cased version of `value`.
 */
export function apStyleTitleCase(value, options) {
  const configuration = options || {}

  if (!value) return ''

  const stop = configuration.stopwords || defaults
  const keep = configuration.keepSpaces
  const splitter = /(\s+|[-‑–—,:;!?()\/])/

  return value
    .split(splitter)
    .map((word, index, all) => {
      // The splitter:
      if (index % 2) {
        if (/\s+/.test(word)) return keep ? word : ' '
        return word
      }

      const lower = word.toLowerCase()

      if (index !== 0 && index !== all.length - 1 && stop.includes(lower)) {
        return lower
      }

      return capitalize(word)
    })
    .join('')
}

/**
 *
 * @param {string} value
 * @returns {string}
 */
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
