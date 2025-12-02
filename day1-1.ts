const instructions = `L20
...`.split('\n')

const offset = (value: number, by: number, max: number = 99) => {
  return (value + by) % (max + 1)
}

const multiplier = (direction: 'L' | 'R') => {
  switch (direction) {
    case 'L': return -1
    case 'R': return 1
  }
}

let dial = 50

const answer = instructions.reduce((result, instruction) => { 
  const m = multiplier(instruction.slice(0, 1) as 'L' | 'R')
  const value = parseInt(instruction.slice(1))
  dial = offset(dial, value * m)
  
  if (dial == 0) {
    result++
  }
  
  return result
}, 0)

console.log(answer)
