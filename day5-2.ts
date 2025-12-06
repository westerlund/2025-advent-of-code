const input = `97596706806002-98423100350630
....`

export class Range {
  readonly lowerBound: number;
  readonly upperBound: number;
  
  constructor(lowerBound: number, upperBound: number) {
    this.lowerBound = lowerBound
    this.upperBound = upperBound
  }
  
  get range(): [number, number] {
    return [this.lowerBound, this.upperBound]
  }
  
  get numberOfProductIds() {
    return this.upperBound - this.lowerBound + 1
  }
  
  overlaps(range: Range) {
    return this.upperBound >= range.lowerBound && this.lowerBound <= range.upperBound
  }
}

const parseInput = (input: string): { ranges: Range[] } => {
  return {
    ranges: input.split('\n').map(range => {
      const [lower, upper] = range.split('-').map(Number);
      return [lower, upper]
    }).map(r => new Range(r[0], r[1]))
  }
}

const cleanRanges = (ranges: Range[]) => {
  return ranges
    .filter(r => r.lowerBound >= 0 && r.lowerBound <= r.upperBound)
    .sort((a, b) => a.lowerBound - b.lowerBound)
}

const findBiggestInterval = (range: Range, ranges: Range[], lowerBound: number, upperBound: number, foundRanges: Range[]): { lowerBound: number; upperBound: number; foundRanges: Range[] } => {
  const overlapIndex = ranges.findIndex(innerRange => innerRange !== range && range.overlaps(innerRange))
  
  if (overlapIndex != -1) {
    const overlap = ranges[overlapIndex]
    
    let nextRange = overlap
    if (nextRange.upperBound < range.upperBound) {
      nextRange = range
    }
    
    return findBiggestInterval(
      nextRange, 
      ranges.slice(overlapIndex + 1),
      Math.min(lowerBound, range.lowerBound), 
      Math.max(upperBound, overlap.upperBound), 
      [...foundRanges, overlap]
    )
  } else {
    return {
      lowerBound: Math.min(lowerBound, range.lowerBound),
      upperBound: Math.max(upperBound, range.upperBound),
      foundRanges
    }
  }
}

const removeOverlappingRanges = (ranges: Range[]) => {
  let mutableRanges = [...ranges]
  
  for (let i = 0; i < mutableRanges.length; i++) {
    const currentRange = mutableRanges[i]
    const { lowerBound, upperBound, foundRanges } = findBiggestInterval(currentRange, mutableRanges.slice(i), currentRange.lowerBound, currentRange.upperBound, [])
  
    if (foundRanges.length > 0) {
      const newRange = new Range(lowerBound, upperBound)
      
      mutableRanges[i] = newRange
    
      for (const found of foundRanges) {
        mutableRanges = mutableRanges.filter(r => r !== found) 
      }
    }
  }

  return mutableRanges
}

const calculateFreshProductIds = (input: string) => {
  const { ranges } = parseInput(input)
  
  const uniqueRanges = removeOverlappingRanges(cleanRanges(ranges))
  return uniqueRanges.reduce((result, range) => result + range.numberOfProductIds, 0)
}

console.log(calculateFreshProductIds(input))
