# Fun with pattern matching

I saw the
[pattern matching proposal](https://github.com/tc39/proposal-pattern-matching)
a while back and thought is was really cool. Tried to see if there were existing
pattern matching libs out there that had a nice, pure JS api
(I didn't want to use a babel or sweet.js plugin),
so started trying to play around and building out a small lib myself for fun
and as a potential util for side projects in places where I don't really
care about performance.

I later found out that [pattycake](https://github.com/zkat/pattycake) was a
thing and has a similar api to what I thought a pure js implementation of
pattern matching should have. It's also pretty robust. So if you want something
to use now, go check that out.

Might typescriptify this and get fancy with generics, idk yet.

```js
const patternMatch = (input) => match(input)(
  { prop: true }, () => 'matched object where prop is true',
  { prop: { nested: true } }, () => 'matched object where prop.nested is true',
  /test/, 'matched string with text containing "test"'
  None, () => 'No match'
)


patternMatch({ prop: true }) // returns 'matched object where prop is true'

patternMatch({ prop: { nested: true }}) // returns 'matched object where prop.nested is true'

patternMatch('test string') // returns 'matched string with text containing "test"' (note how result is not a function)
```
