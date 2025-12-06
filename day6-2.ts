const input = `....`

export const operators = ['+', '*'] as const
type Operator = typeof operators[number]

interface MathProblem {
  operator: Operator
  operands: number[]
}

const parseColumns = (rows: string[]) => {
  return rows
    .reduce((result, row) => {
      const rowLength = row.length
      for (let column = 0; column < rowLength; column++) {
        // Concatinate a single column
        result[column] = `${result[column] ?? ""}${row[column]}`.trim()
      }
      return result
    }, [] as string[])
}

const parseInput = (input: string) => {
  const rows = input.split('\n')
  
  // Parse and remove operator row
  const operators: string[] = rows.splice(-1)[0].match(/([\+\*]{1})/g) ?? []
  
  const columns = parseColumns(rows)
  
  // Split columns into a two-dimensional array, splitting on the value ""
  const grouped = columns.reduce((result, column) => {
    if (column == "") {
      result.push([])
    } else {
      result[result.length - 1].push(column)
    }
    return result
  }, [[]] as string[][])
  
  const output: MathProblem[] = operators.map((operator, column) => ({
    operator: operator as Operator,
    operands: grouped[column].map(Number)
  }))
  
  return output
}

const solveMathProblem = (problem: MathProblem) => {  
  const startingNumber = problem.operator == '*' ? 1 : 0
  return problem.operands.reduce((result, value) => {
    switch (problem.operator) {
      case '*': return result * value
      case '+': return result + value
      default: throw new Error()
    }
  }, startingNumber)
}

const solveProblems = (input: string) => {
  const parsed = parseInput(input)
  return parsed.reduce((result, problem) => result + solveMathProblem(problem), 0)
}

console.log(solveProblems(input))
