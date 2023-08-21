# JS-Basics

Quick Notes to prepare for JS heavy Interviews (like React and React Native)

## 1.1 Variables in JS

|               |            var            |                                                                                                                        let                                                                                                                        |                                 const                                  |
| ------------: | :-----------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|       Scoping |      function scoped      |                                                                                                                   block scoped                                                                                                                    |                              block scoped                              |
|      Hoisting | hoisted — **_undefined_** |                                                                                                **ReferenceError** (if accessed before declaration)                                                                                                |        **ReferenceError**<br/>(if accessed before declaration)         |
| Other details |             —             | `let` begins declarations, not statements<br/>So we can't use a lone declaration as the<br/>body of a block. Ex: `if(true) let v1 = 1`<br/>will throw a **SyntaxError:** `Lexical declaration`<br/>`cannot applear in a single-statement context` | Must be initialized on declaration,<br/>can't re-assign with new value |

#### Examples

##### Example 1.1.1

```javascript
function addNumbers() {
  var a = 10
  var b = 20

  // Random condition check
  if (b > a) {
    var sum = a + b
    console.log("Inside 'if': ", sum)
  }

  console.log("Outside 'if': ", sum)
}

addNumbers()
```

Output of the above code will be

> Inside 'if': 30
> Outside 'if': 30

This output is obtained due to hoisting of `sum` variable to the top of `addNumbers` function.
It is equivalent to having the following:

```javascript
function addNumbers() {
  var sum = undefined // Hoisted to the top of addNumbers
  var a = 10
  ...
```

If you replace `var` with `let` / `const` (As part of ES6 (2015) specification), both of them will raise a **ReferenceError** at _line 9_.

##### Example 1.1.2

```javascript
var a = 10

function func() {
  var a = 20
  console.log(a)
}

func()
console.log(a)
```

Output of the above code will be

> 20
> 20

> NOTE: An important point to remember is that the JS Engine will search for variable `a` in the `function scope` first, if it is not found it will go the the nearest enclosing scope just above it. It does the same thing till it reaches the `global scope`.

##### Example 1.1.3

```javascript
const profile = {
  name: "Kiran",
  college: "BMSCE",
  gradSubject: "CSE",
  location: "Bengaluru",
}

profile.name = "Kiran Nayak"
console.log(profile.name)
```

Output of the above code will be

> Kiran Nayak

Even though `profile` is declared with `const` type, its properties can be changed, as `profile` is storing the `reference of the object and not the value` directly. What is being changed is the data inside the object, so this is **_not an error_**.

##### Temporal Dead Zone (TDZ)

The space between the top of the scope till the place of declaration / initialization is called a TDZ. It is easier to demonstrate than explain.

##### Example 1.1.4

```javascript
console.log("Program starts, at line 1")
console.log("Program continues, line 2")
console.log("Program continues, line 3")

let name = "Kiran" // Same effect, even if you had used 'const'

console.log(name)
```

Output of the above code will be

> Program starts, at line 1
> Program continues, line 2
> Program continues, line 3
> Kiran

More than the output, it is important to understand that the variable `name`, was in a `Temporal Dead Zone (TDZ)` till line 4, where it was declared and initialized. This would've been the same with `const` as well. But, with `var` it differs completely. If `var name` were used instead of `let name` / `const name`, then `name` would be available from line 1 itself.

It is also important to note that it is called "**_Temporal_** Dead Zone" because the zone depends on the order of execution (Time-based) rather than the order in which the code is written (Position-based). An example to illustrate this point:

##### Example 1.1.5

```javascript
...
{
  // TDZ starts at beginning of scope
  const func = () => console.log(letVariable) // OK

  // Within the TDZ letVariable access throws `ReferenceError`

  let letVariable = 3 // End of TDZ (for letVariable)
  func() // Called outside TDZ!
}
...
```

Output of the above code will be

> 3

It should now be crystal clear, as to why it is **_Temporal_** Dead Zone (TDZ)

If the interviewer asks which one would you use among `var` / `let` / `const`, say that you would prefer `const` in normal / default cases. If in case there is a need to change the value, choose `let`. Basically, avoid using `var`.

## 1.2 Scope in JS

There are 4 kinds of Scopes in JS.

|           Type | Description                                                                  |
| -------------: | :--------------------------------------------------------------------------- |
|   Global Scope | Default scope for all code running in script mode.                           |
|   Module Scope | scope for code running in module mode.                                       |
| Function Scope | Scope created within a function                                              |
|    Block Scope | (Introduced in ES6 Specification) Scope created with a pair of curly braces. |

There is another concept of `Lexical Scoping` which is used by the `Parser` to resolve variable names when the functions are nested.

`Lexical scoping` refers to the location where a variable is declared within the source code to determine where that variable is available. If there are nested functions, JS Engine for variable lookup starts with the inner function where we are trying to access the variable and moves outward until it reaches the global scope.

##### Example 1.2.1

```javascript
const a = 10

function exampleFunc() {
  const b = 20

  function inner() {
    const c = 30

    console.log(a, b, c)
  }
}
```

Output of the above code will be

> 10 20 30

The JS Engine checks if `a` is defined in the inner function scope. Since it is not present, it goes to the block just above it, which is a function block (exampleFunc). Since it is not present here as well, it goes to the block above it (This will happen till the global scope is reached, for every variable). Now the variable is found, and its value is used in the log statement.

Similarly, the engine checks if the variable `b` and `c` are available. The above mentioned process repeats, and `b` and `c` are found.

Now we need to understand about `Scope Chaining`. It is the union of currect scope and all the parent scopes that a function has access to. In the `Example 1.2.1` above, `inner` function has access to all variables `a`, `b` and `c`, due to scope chaining.

## 1.3 Closures in JS

Closure gives you access to an outer functions's scope from an inner function. In JS, Closures are created every time a function is created, at function creation time. Therefore, the combination of the function and its scope chain (lexical environment) is what is called a Closure in JS.

##### Example 1.3.1

```javascript
function outerFunc(argVar) {
  let counter = 0

  function innerFunc() {
    counter += 5

    console.log(++argVar, counter)
  }

  return innerFunc
}

const fn = outerFunc(10)
fn()
fn()
```

Output of the above code will be

> 11 5
> 12 10

`outerFunc` returns the `innerFunc` function. In this case, it has not only sent the definition of the `innerFunc`, but also all of the variables, arguments, and their state (See that first call to `fn` updates `argVar` to 11, and the second one uses this persisted value and updates to 12) that the `innerFunc` has access to (Here it is `argVar` and `counter` variable) in its scope.

But if there are multiple closures, each of them holds a separate instance of a closure.

##### Example 1.3.2

```javascript
function outerFunc(argVar) {
  let counter = 0

  function innerFunc() {
    counter += 5

    console.log(++argVar, counter)
  }

  return innerFunc
}

const fn1 = outerFunc(10)
fn1()
fn1()

const fn2 = outerFunc(10)
fn2()
fn2()
```

Output of the above code will be

> 11 5
> 12 10
> 11 5
> 12 10

##### Applications of Closures

1. Utility functions that implement `memoization`
2. Module Pattern which provides `data privacy`
3. Throttle and Debounce functionality
   > ```javascript
   > // Throttle Functionality
   > const throttle = (func, limit) => {
   >   let isThrottling
   >   return function () {
   >     const args = arguments
   >     const context = this
   >     if (!isThrottling) {
   >       func.apply(context, args)
   >       isThrottling = true
   >       setTimeout(() => (isThrottling = false), limit)
   >     }
   >   }
   > }
   >
   > // Debounce
   > const debounce = (func, delay) => {
   >   let debouncing
   >   return function () {
   >     const context = this
   >     const args = arguments
   >     clearTimeout(debouncing)
   >     debouncing = setTimeout(() => func.apply(context, args), delay)
   >   }
   > }
   > ```
4. Promises
5. Function Currying

## 1.4 Function Currying in JS

Currying is the process in `Functional Programming` in which we transform a function with multiple arguments into a sequence of nesting functions that take one arguement at a time.

That is to say, we transform a function `func(a, b, c)` to `func(a)(b)(c)`

Currying doesn't call the function, it simply transforms it.

##### Example 1.4.1

```javascript
function sumOf3Nos(a, b, c) {
  return a + b + c
}

function func(cbFunc) {
  return function (a) {
    return function (b) {
      return function (c) {
        return cbFunc(a, b, c)
      }
    }
  }
}

const curriedFunc = func(sumOf3Nos)
console.log(curriedFunc(4)(5)(6))

// Above code returns the same as following result, but is extra verbose
const funcA = func(sumOf3Nos)
const funcB = funcA(4)
const funcC = funcB(5)
const value = funcC(6)

console.log(value)
```

Output of the above code will be

> 15
> 15

##### Applications of Function Currying

1. Functions that are highly modular and useful utilities

   > ```javascript
   > function log(date, imp_level, msg) {
   >   console.log(
   >     `[${date.getHours()}:${date.getMinutes()}] [${imp_level}] ${msg}`,
   >   )
   > }
   >
   > // Logger is used by passing three parameters
   > log(new Date())("INFO")("function took 2500ms to finish...")
   > log(new Date())("WARN")("variable declared, but not used...")
   > log(new Date())("ERROR")("Some error occured...")
   >
   > // While the above code is useful, we are sending some parameters unnecessarily.
   > // If we make use of function currying, we can create modular functions that have
   > //  a pre-set argument, that you initialize only once.
   >
   > function curry(cbFunc) {
   >   return function (date) {
   >     return function (imp_level) {
   >       return function (msg) {
   >         return cbFunc(date, imp_level, msg)
   >       }
   >     }
   >   }
   > }
   >
   > const curriedLog = curry(log)
   > curriedLog(new Date())("INFO")("function took 2500ms to finish...") // Same as previous usage
   >
   > const logNow = curriedLog(new Date())
   > logNow("WARN")("variable declared, but not used...") // Because of currying we created a custom logNow function
   >
   > const logErrorNow = logNow("ERROR")
   > logErrorNow("Some error occured...") // Here we only sent last argument as first two are already sent
   > ```

   Note that `logNow`, `logErrorNow` are just two examples of a large set of functions that can be created using currying.

## Glossary

|                     Term | Meaning / Other details                                                                                                                                                                                                   |
| -----------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                 Hoisting | Variable declarations are put into memory during the compile phase<br/>In simple words, Hoisting means moving variable declarations to<br/>the top of their scope.                                                        |
|                    Scope | The scope is the current context of execution in which values and<br/>expressions are "visible" or can be referenced.                                                                                                     |
|                  Closure | It is the combination of a function bundled together with references<br/>to its surrounding state (Lexical Environment)                                                                                                   |
| Temporal Dead Zone (TDZ) | A variable declared with `let`, `const`, or `class` is said to be in a<br/>`"temporal dead zone" (TDZ)` from the start of the block, till code<br/>execution reaches the line where variable is declared and initialized. |

---

## Sources

|      Topic | Source Link                                                                                              |
| ---------: | :------------------------------------------------------------------------------------------------------- |
| Javascript | [MDN](https://developer.mozilla.org/docs/Web)<br/>[Codevolution Course](https://learn.codevolution.dev/) |
|   Markdown | [Markdown Guide](https://www.markdownguide.org/basic-syntax)                                             |
