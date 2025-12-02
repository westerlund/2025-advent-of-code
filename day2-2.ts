const inputData = `4487-9581,755745207-755766099,......`;

const generateRange = (args: { from: string; to: string }) => {
  const [from, to] = [parseInt(args.from), parseInt(args.to)];
  const diff = to - from
  return [...Array(diff + 1).keys()]
      .map(i => i + from)
      .map(v => v.toString())
};

const chunk = (list: string[], chunks: number) => {
  let output: string[] = []
  for (let i = 0; i < list.length; i += chunks) {
    output.push(
      list.slice(i, i + chunks).join("")
    )
  }
  return output
}

const isRepeated = (value: string) => {
  const half = Math.floor(value.length / 2)
  
  const array = value.split("")
  
  for (let i = half; i > 0; i--) {
    const chunks = chunk(array, i)
    if (chunks.slice(1).every(c => c == chunks[0])) {
      return true
    }
  }
  return false
}

const answer = inputData.split(',').reduce((result, input) => { 
  const [from, to] = input.split('-')
  const range = generateRange({ from, to })
  for (const value of range) {
    if (isRepeated(value)) {
      result += parseInt(value)
    }
  }
  return result
}, 0)

console.log(answer)
