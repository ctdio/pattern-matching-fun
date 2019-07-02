const matches = require('lodash.matches')

const None = '__None__'
const matchDefaultCase = matches(None)

const handleMatch = (input, pattern, result) => {
  return typeof result === 'function'
    ? result(input, pattern)
    : result
}

const patternMatch = (input, clauses, defaultClause) => {
  const length = clauses.length

  for (let i = 0; i < length; i++) {
    const clause = clauses[i]

    const { test, pattern, result } = clause

    if (test(input)) {
      return handleMatch(input, pattern, result)
    }
  }

  if (defaultClause) {
    const { test, pattern, result } = defaultClause
    return handleMatch(input, pattern, result)
  }

  return undefined
}

const boolTestFunc = (pattern) => (input) => input === pattern

const regexTestFunc = (pattern) =>
  (input) => typeof input === 'string'
      ? pattern.test(input)
      : false

const buildMatcher = (...clausesArgs) => {
  const length = clausesArgs.length

  if (length % 2 === 1) {
    throw new Error('Cannot build matcher')
  }

  const clauses = []
  let defaultClause

  for (let i = 0; i < length; i += 2) {
    const pattern = clausesArgs[i]
    const result = clausesArgs[i + 1]

    if (pattern === None) {
      defaultClause = {
        pattern: None,
        test: matchDefaultCase,
        result
      }

      clauses.push(defaultClause)
    } else {
      let testFunc

      if (typeof pattern === 'boolean') {
        testFunc = boolTestFunc(pattern)
      } else if (pattern instanceof RegExp) {
        testFunc = regexTestFunc(pattern)
      } else {
        testFunc = matches(pattern)
      }

      clauses.push({
        pattern,
        test: testFunc,
        result
      })
    }
  }

  return (input) => patternMatch(input, clauses, defaultClause)
}

const match = (input) =>
  (...clausesArgs) => buildMatcher(...clausesArgs)(input)

module.exports = {
  match,
  buildMatcher,
  None
}
