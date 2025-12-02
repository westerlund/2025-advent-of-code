const inputData = `4487-9581,755745207-755766099,......`;

const generateRange = (args: { from: string; to: string }) => {
  const [from, to] = [parseInt(args.from), parseInt(args.to)];
  const diff = to - from
  return [...Array(diff + 1).keys()]
      .map(i => i + from)
      .map(v => v.toString())
};

const isRepeated = (value: string) => {
  const halfLength = value.length / 2
  const [a, b] = [value.slice(0, halfLength), value.slice(halfLength)]
  return a ==  b
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
