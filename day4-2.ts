const sampleInput = `
  ..@@.@@@@.
  @@@.@.@.@@
  @@@@@.@.@@
  @.@@@@..@.
  @@.@@@@.@@
  .@@@@@@@.@
  .@.@.@.@@@
  @.@@@.@@@@
  .@@@@@@@@.
  @.@.@@@.@.
`

const expectedOutput = `
  ..xx.xx@x.
  x@@.@.@.@@
  @@@@@.x.@@
  @.@@@@..@.
  x@.@@@@.@x
  .@@@@@@@.@
  .@.@.@.@@@
  x.@@@.@@@@
  .@@@@@@@@.
  x.x.@@@.x.
`

const testInput = `
.@@@.@@@.
.........
.@@@.@@@.
..@..@@@.
.........
@@@@@@@@@
.........
@@@@@@@@@
@@@@@@@@@
@@@@@@@@@
.........
@@.....@@
@.......@
.........
....@....
...@@@...
....@....
.........
@.@.@.@.@
.@.@.@.@.
@.@.@.@.@
.........
....@....
.........
`

const expectedTestOutput = `
.xxx.xxx.
.........
.xxx.x@x.
..x..x@x.
.........
xxxxxxxxx
.........
x@@@@@@@x
@@@@@@@@@
x@@@@@@@x
.........
xx.....xx
x.......x
.........
....x....
...x@x...
....x....
.........
x.x.x.x.x
.@.@.@.@.
x.x.x.x.x
.........
....x....
.........
`

const isToiletPaper = (input: string) => input == "@"
const adjacent = 1

const visualizeInputExpected = (solved: string[][], expected: string[][]) => {
  console.log("Calculated", "   Expected")
  solved.forEach((row, rowIndex) => {
    const calculatedRow = row.join("")
    const expectedRow = expected[rowIndex].join("")
    const isIncorrect = calculatedRow != expectedRow
    console.log(calculatedRow, "  ", expectedRow, isIncorrect ? "<" : " ")
  })
}

const numberOfAdjacent = (input: string[][], column: number, row: number, adjacent: number) => {
  if (!isToiletPaper(input[row][column])) {
    return -1
  }

  const getValue = (input: string[], index: number) => {
    if (typeof input === 'undefined') return null
    return input[index] || null
  }
  
  const x0 = column - adjacent
  const x1 = column + adjacent
  const y0 = row - adjacent
  const y1 = row + adjacent
  
  const square = [
    getValue(input[y0], x0), getValue(input[y0], column), getValue(input[y0], x1),
    getValue(input[row], x0), getValue(input[row], x1),
    getValue(input[y1], x0), getValue(input[y1], column), getValue(input[y1], x1),
  ].filter(x => !!x)
  
  return square.reduce((result, item) => result + (item == "@" ? 1 : 0), 0)
}

const countAndRemoveAdjacentToiletPaperRolls = (input: string[][], compareVisuallyWith?: string) => {
  let totalNumberOfRolls = 0
  const output = input.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
      const numberOfRolls = numberOfAdjacent(input, columnIndex, rowIndex, adjacent)
      if (numberOfRolls == -1 || numberOfRolls >= 4) {
        return column
      }
      totalNumberOfRolls++
      return "."
    })
  })
  
  if (compareVisuallyWith) {
    const expected = compareVisuallyWith.split('\n').map(row => row.split(""))
    visualizeInputExpected(output, expected)
  }
  
  return {
    output: output,
    totalNumberOfRolls
  }
}

const countTotalRemovableRolls = (input: string) => {
  let parsedInput = input.split('\n').map(row => row.trim().split(""))
  
  let didRemoveRolls = true
  let totalCount = 0
  
  while (didRemoveRolls) {
    const { output, totalNumberOfRolls } = countAndRemoveAdjacentToiletPaperRolls(parsedInput)
    parsedInput = output
    totalCount += totalNumberOfRolls
    didRemoveRolls = totalNumberOfRolls > 0
  }
  
  return totalCount
}

console.log(countTotalRemovableRolls(testInput))
