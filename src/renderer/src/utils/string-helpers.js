export const toProperCase = (value) => {
  if (!value) return ''

  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const toSingleWordProperCase = (value) => {
  if (!value) return ''

  const lower = value.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}
