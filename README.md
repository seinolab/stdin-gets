stdin-gets
==========

## Handling plain-texts

Sample code

```JavaScript
var stdin = require("stdin-gets");

process.stdin.resume();
process.stdin.setEncoding("utf8");

stdin.gets(function (buf, num) {
  console.log("%d: %s", num, buf)

}, function () {
  console.log("[EOF]");

});
```

Result: 

```
0: var stdin = require("stdin-gets");
1: 
2: process.stdin.resume();
3: process.stdin.setEncoding("utf8");
4: 
5: stdin.gets(function (buf, num) {
6:   console.log("%d: %s", num, buf)
7: 
8: }, function () {
9:   console.log("[EOF]");
10: 
11: });
12: 
[EOF]
```

## Handling CSV

```JavaScript```
var stdin = require("stdin-gets");

process.stdin.resume();
process.stdin.setEncoding("utf8");

stdin.csv([
  // 1st row as Date
  function (stamp) {
    return new Date(stamp)
  },
  // 2nd row as String (no conversion)
  null,
  // 3rd and 4th rows as Number with decimal fractions.
  parseFloat,
  parseFloat,

], function (buf, num) {
  console.log(buf)

}, function () {
  console.log("[EOF]");

});
```

Test data

```
2014/11/15 21:00:00,USD/JPY,116.262,116.290 
2014/11/15 21:00:00,EUR/USD,1.25217,1.25275
2014/11/15 21:00:00,GBP/USD,1.56635,1.56721
```

Result

```
[ Sat Nov 15 2014 21:00:00 GMT+0900 (JST),
  'USD/JPY',
  116.262,
  116.29 ]
[ Sat Nov 15 2014 21:00:00 GMT+0900 (JST),
  'EUR/USD',
  1.25217,
  1.25275 ]
[ Sat Nov 15 2014 21:00:00 GMT+0900 (JST),
  'GBP/USD',
  1.56635,
  1.56721 ]
[ Invalid Date ]
[EOF]
```

