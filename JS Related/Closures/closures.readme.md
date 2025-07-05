## 1.4 Closures in JS

Closure gives you access to an outer functions's scope from an inner function. In JS, Closures are created every time a function is created, at function creation time. Therefore, the combination of the function and its scope chain (lexical environment) is what is called a Closure in JS.

##### Example 1.4.1

```javascript
function outerFunc(argVar) {
  let counter = 0;

  function innerFunc() {
    counter += 5;

    console.log(++argVar, counter);
  }

  return innerFunc;
}

const fn = outerFunc(10);
fn();
fn();
```

Output of the above code will be

> 11 5
>
> 12 10

`outerFunc` returns the `innerFunc` function. In this case, it has not only sent the definition of the `innerFunc`, but also all of the variables, arguments, and their state (See that first call to `fn` updates `argVar` to 11, and the second one uses this persisted value and updates to 12) that the `innerFunc` has access to (Here it is `argVar` and `counter` variable) in its scope.

But if there are multiple closures, each of them holds a separate instance of a closure.

##### Example 1.4.2

```javascript
function outerFunc(argVar) {
  let counter = 0;

  function innerFunc() {
    counter += 5;

    console.log(++argVar, counter);
  }

  return innerFunc;
}

const fn1 = outerFunc(10);
fn1();
fn1();

const fn2 = outerFunc(10);
fn2();
fn2();
```

Output of the above code will be

> 11 5
>
> 12 10
>
> 11 5
>
> 12 10

##### Example 1.4.3

```javascript
function outerFunc() {
  var name = 'Kiran';

  function innerFunc() {
    console.log(name);
  }

  return innerFunc;
}

var func = outerFunc();
func();
```

Output of the above code will be

> Kiran

There is no new concept in the existing code. But had the last line in `outerFunc` been `innerFunc()`, meaning if the `innerFunc` had been invoked inside the `outerFunc`, then it wouldn't have been a closure concept. It would be a `Lexical scope`.

##### Example 1.4.4 — This was asked in my Interview (C24)

```javascript
function test() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, 1000);
  }
}

test();
```

Output of the above code will be

> 3
>
> 3
>
> 3

Why this result ? Obvious right? `var` hoists `i` to the first line of `test`. This is equivalent to having 3 consecutive `var i` initializations with 1, 2, and 3. So it will assign the value to the latest value.

##### Applications of Closures

1. Utility functions that implement `memoization`
2. Module Pattern which provides `data privacy`
3. Throttle and Debounce functionality

   ```javascript
   // Throttle Functionality
   const throttle = (cbFunc, limit) => {
     let isThrottling = false;
     return function () {
       if (!isThrottling) {
         cbFunc.apply(this, arguments);
         isThrottling = true;
         setTimeout(() => {
           isThrottling = false;
         }, limit);
       }
     };
   };

   // Debounce
   const debounce = (cbFunc, delay) => {
     let debouncing;
     return function () {
       clearTimeout(debouncing);
       debouncing = setTimeout(() => {
         cbFunc.apply(this, arguments);
       }, delay);
     };
   };
   ```

4. Promises
5. Function Currying
