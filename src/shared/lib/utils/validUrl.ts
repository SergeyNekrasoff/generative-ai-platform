export function isValidURL(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    throw new Error('Fail validation url string')
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
