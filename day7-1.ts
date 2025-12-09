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

type Character = 'S' | '.' | '^'

const parseInput = (input: string) => {
  const rows = input.split('\n')
  return rows.map(row => row.split("") as Character[])
}

const calculateNumberOfSplits = (input: string) => {
  const rows = parseInput(input)
  
  let nextIndexes: Set<number> = new Set()
  let numberOfSplits = 0
  const output = rows.map(row => {
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
          
          numberOfSplits++
          break
      }
      
      return character
    })
  })
  
  return {
    visualTree: output.map(outer => outer.join("")).join("\n"),
    numberOfSplits
  }
}

const { visualTree, numberOfSplits } = calculateNumberOfSplits(exampleInput)

console.log(visualTree)
console.log(numberOfSplits)
