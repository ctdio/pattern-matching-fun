const { match, None } = require('./index')

const patternMatch = (input) => match(input)(
  true, () => 'pattern is true',
  false, () => 'pattern is false',
  { prop: true }, () => 'prop is true',
  { prop: false }, () => 'prop is false',
  { prop: { nested: true } }, () => 'prop.nested is true',
  { functionNotRequired: true }, { some: 'object' },
  /test/ , () => 'matches test string',
  None, () => 'No match'
)

;[
  true,
  false,
  { object: 'that doesn\'t match anything' },
  {prop: true},
  {prop: false},
  { prop: { nested: true } },
  { functionNotRequired: true },
  'test string',
  None,
].map((input) => console.log(patternMatch(input)));
