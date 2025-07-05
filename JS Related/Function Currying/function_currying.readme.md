## 1.5 Function Currying in JS

Currying is the process in `Functional Programming` in which we transform a function with multiple arguments into a sequence of nesting functions that take one argument at a time.

That is to say, we transform a function `func(a, b, c)` to `func(a)(b)(c)`

Currying doesn't call the function, it simply transforms it.

##### Example 1.5.1

```javascript
function sumOf3Nos(a, b, c) {
  return a + b + c;
}

function func(cbFunc) {
  return function (a) {
    return function (b) {
      return function (c) {
        return cbFunc(a, b, c);
      };
    };
  };
}

const curriedFunc = func(sumOf3Nos);
console.log(curriedFunc(4)(5)(6));

// Above code returns the same as following result, but is extra verbose
const funcA = func(sumOf3Nos);
const funcB = funcA(4);
const funcC = funcB(5);
const value = funcC(6);

console.log(value);
```

Output of the above code will be

> 15
>
> 15

##### Applications of Function Currying

1. Functions that are highly modular and useful utilities

   > ```javascript
   > function log(date, imp_level, msg) {
   >   console.log(
   >     `[${date.getHours()}:${date.getMinutes()}] [${imp_level}] ${msg}`,
   >   );
   > }
   >
   > // Logger is used by passing three parameters
   > log(new Date())('INFO')('function took 2500ms to finish...');
   > log(new Date())('WARN')('variable declared, but not used...');
   > log(new Date())('ERROR')('Some error occurred...');
   >
   > // While the above code is useful, we are sending some parameters unnecessarily.
   > // If we make use of function currying, we can create modular functions that have
   > //  a pre-set argument, that you initialize only once.
   >
   > function curry(cbFunc) {
   >   return function (date) {
   >     return function (imp_level) {
   >       return function (msg) {
   >         return cbFunc(date, imp_level, msg);
   >       };
   >     };
   >   };
   > }
   >
   > const curriedLog = curry(log);
   > curriedLog(new Date())('INFO')('function took 2500ms to finish...'); // Same as previous usage
   >
   > const logNow = curriedLog(new Date());
   > logNow('WARN')('variable declared, but not used...'); // Because of currying we created a custom logNow function
   >
   > const logErrorNow = logNow('ERROR');
   > logErrorNow('Some error occurred...'); // Here we only sent last argument as first two are already sent
   > ```

   Note that `logNow`, `logErrorNow` are just two examples of a large set of functions that can be created using currying.
