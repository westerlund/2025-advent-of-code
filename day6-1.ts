const input = `....`

const operators = ['+', '*'] as const
type Operator = typeof operators[number]

interface MathProblem {
  operator: Operator
  operands: number[]
}

const parseInput = (input: string) => {
  const rows = input.split('\n')
  let parsed: Record<number, number[]> = {}
  let operators: string[] = []
  rows.forEach(row => {
    const matches = (row.match(/(\d+)/g) ?? []).map(Number)
    if (matches.length > 0) {

      matches.forEach((match, column) => {
        parsed[column] = [...parsed[column] ?? [], match]
      })
      
    } else {
      operators = (row.match(/([\/\+\*\-]{1})/g) ?? [])
    }
  })
  
  const output: MathProblem[] = operators.map((operator, column) => ({
    operator: operator as Operator,
    operands: parsed[column]
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
