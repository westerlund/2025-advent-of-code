const instructions = `L20
...`.split('\n')

const multiplier = (direction: 'L' | 'R') => {
  switch (direction) {
    case 'L': return -1
    case 'R': return 1
  }
}

let dial = 50

const calculate = (currentValue: number, instruction: string) => {
  let result = currentValue
  
  const m = multiplier(instruction.slice(0, 1) as 'L' | 'R')
  const value = parseInt(instruction.slice(1))
  
  const newValue = (dial + (value * m))
  
  const previousDial = dial
  // Javascript doesn't handle negative values and modulo correctly, so we must do this hack
  dial = ((newValue % 100) + 100) % 100
  
  // If greater tha 99, we know we passed 0
  if (newValue > 99) {
    result += Math.floor(newValue / 100)
  } else if (newValue < 1) {
    // If less than 1, we know we passed 0
    // If we started on 0, and land on 0, we should not count this as passed 0
    if (previousDial != 0)
      result++
    
    // Calculate number of revolutions
    const r = Math.abs(Math.ceil((newValue) / 100))
    if (r > 0) {
      result += r
    }
  }

  return result
}

const answer = instructions.reduce(calculate, 0)
console.log(answer)
