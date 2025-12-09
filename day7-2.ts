const exampleInput = 
`.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

const input = `......`

type Character = 'S' | '.' | '^' | '|'

const parseInput = (input: string) => {
  const rows = input.split('\n')
  return rows.map(row => row.split("") as Character[])
}

const countPossibilities = (input: string) => {
  const rows = parseInput(input)
  
  const pipeMemory: Record<string, number> = {}
  const incrementPipeValue = (column: number, row: number, by: number = 1) => {
    const id = `${column},${row}`
    const existingMemory = pipeMemory[id] ?? 0
    pipeMemory[id] = existingMemory + by
  }
  
  const pipeValueAt = (column: number, row: number) => {
    const id = `${column},${row}`
    return pipeMemory[id] ?? 0
  }
  
  // Parse tree for both visualization and easier handling
  let nextIndexes: Set<number> = new Set()
  const parsedTree = rows.map(row => {
    const indexes = new Set(nextIndexes)
    return row.map((character, i) => {
      switch (character) {
        case '.':
          if (indexes.has(i)) {
            return '|'
          }
          break
        case 'S':
          nextIndexes.add(i)
          break
        case '^':
          if (!nextIndexes.has(i)) break
          nextIndexes.delete(i)
          
          nextIndexes.add(i - 1)
          nextIndexes.add(i + 1)
          break
      }
      return character
    })
  })
  
  parsedTree.forEach((row, rowIndex) => {
    for (let currentIndex = 0; currentIndex < row.length; currentIndex++) {
      const character = row[currentIndex]
      
      switch (character) {
        case 'S':
          // S marks the start, start with value 1
          incrementPipeValue(currentIndex, rowIndex + 1)
          break
          
        case '|': {
          // When at pipe, just copy the previous value
          const currentValue = pipeValueAt(currentIndex, rowIndex - 1)
          incrementPipeValue(currentIndex, rowIndex + 1, currentValue)
          break
        }
          
        case '^': {
          // If junction, pass previous pipe value to the two separate streams
          const nextRow = rowIndex + 1
          const currentValue = pipeValueAt(currentIndex, rowIndex - 1)
          incrementPipeValue(currentIndex - 1, nextRow, currentValue)
          incrementPipeValue(currentIndex + 1, nextRow, currentValue)
        }
      }
    }
  })
  
  // Calculate the sum of the last row
  const lastRowIndexString = `${parsedTree.length - 1}`
  return Object.entries(pipeMemory).reduce((result, [key, value]) => {
    if (key.split(',')[1] == lastRowIndexString) {
      return result + value
    }
    return result
  }, 0)
}

console.log(countPossibilities(exampleInput))
