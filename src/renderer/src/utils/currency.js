export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount)
}

export const sumAmounts = (items) => {
  return items.reduce((acc, item) => acc + (item.amount || 0), 0)
}

export const calculateVariance = (expected, actual) => {
  return actual - expected
}
