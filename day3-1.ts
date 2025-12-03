const input = `225252....`.split('\n')

const findNextLargestDigit = (list: number[], startIndex: number, endIndex: number): { largest: number; index: number } => {
  let output = { largest: 0, index: 0 }
  for (let i = startIndex; i < endIndex; i++) {
    if (list[i] > output.largest) {
      output.largest = list[i]
      output.index = i
    }
  }
  return output
}

const iterations = 2
const answer = input.reduce((result, row) => {
  const input = row.split("").map(parseFloat)
  
  const output = Array.from({ length: iterations }, (_, i) => i).reduce((innerResult, i) => {
    const startIndex = innerResult.currentIndex
    const endSlots = iterations - i - 1
    const endIndex = input.length - endSlots
    
    const { largest, index } = findNextLargestDigit(input, startIndex, endIndex)
    innerResult.result.push(largest)
    innerResult.currentIndex = index + 1
    
    return innerResult
  }, { result: [], currentIndex: 0 } as { result: number[]; currentIndex: number; })
  
  result += parseInt(output.result.map(x => x.toString()).join(""))
  
  return result
}, 0)

console.log(answer)
