stdin-gets
==========

Test code

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
