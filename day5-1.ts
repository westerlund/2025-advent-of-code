const input = `97596706806002-98423100350630
....`

const parseInput = (input: string): { ranges: [number, number][], productIds: number[] } => {
  const [rawRanges, rawProductIds] = input.split('\n\n')
  
  return {
    ranges: rawRanges.split('\n').map(range => {
      const [lower, upper] = range.split('-').map(Number);
      return [lower, upper]
    }),
    productIds: rawProductIds.split('\n').map(Number)
  }
}

const existsInRange = (value: number, range: [number, number]) => {
  return value >= range[0] && value <= range[1]
}

const calculateFreshProductIds = (input: string) => {
  const { ranges, productIds } = parseInput(input)
  
  const fresh = productIds.reduce((result, productId) => {
    if (ranges.some(range => existsInRange(productId, range))) {
      return result + 1
    }
    return result
  }, 0)
  
  return fresh
}

console.log(calculateFreshProductIds(input))
