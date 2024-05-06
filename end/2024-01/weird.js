[] + {}
// "[object Object]"

{} + []
// 0

[] + []
// ""

null + []
// 'null'

parseInt(0.0000001)
// 1

parseInt(null, 24)
// 23

Math.min() > Math.max()
// true

0.1 + 0.2
// 0.30000000000000004

1 < 2 < 3
// true

3 > 2 > 1
// false

"abc" instanceof String
// false

1.toString()
// Uncaught SyntaxError: Invalid or unexpected token

[20, 3, 15, 0, 1, 34].sort()
// [0, 1, 15, 20, 3, 34]

console.log(02024)
// 1044

[].every(() => true) && [].every(() => false)
// true

!!"false"
// true

new Object() +new Array() + new Set()
// '[object Object][object Set]'

"abc".at(Math.E)
// 'c'


