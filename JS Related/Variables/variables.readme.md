## 1.1 Variables in JS

|               |            var            |                                                                                                                      let \*                                                                                                                      |                                const \*                                |
| ------------: | :-----------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|       Scoping |      function scoped      |                                                                                                                   block scoped                                                                                                                   |                              block scoped                              |
|      Hoisting | hoisted — **_undefined_** |                                                                                               **ReferenceError** (if accessed before declaration)                                                                                                |        **ReferenceError**<br/>(if accessed before declaration)         |
| Other details |             —             | `let` begins declarations, not statements<br/>So we can't use a lone declaration as the<br/>body of a block. Ex: `if(true) let v1 = 1`<br/>will throw a **SyntaxError:** `Lexical declaration`<br/>`cannot appear in a single-statement context` | Must be initialized on declaration,<br/>can't re-assign with new value |

\* — _Introduced in ES6 Specification (2015)_

#### Examples

##### Example 1.1.0 — VERY IMPORTANT

```javascript
let x = 4;
if (x) {
  console.log(x);
  let x = 12;
}
```

Output of the above code will be

> ReferenceError: Cannot access 'x' before initialization

Very strange result, so adding it at the beginning itself. If you just change the first `x` from `let` to `var` in line 1, it will still be giving the same `ReferenceError`. Only if you change both the variables to `var`, there will be no issue, with answer being `4` (That is not difficult to predict).

##### Example 1.1.1

```javascript
function addNumbers() {
  var a = 10;
  var b = 20;

  // Random condition check
  if (b > a) {
    var sum = a + b;
    console.log("Inside 'if': ", sum);
  }

  console.log("Outside 'if': ", sum);
}

addNumbers();
```

Output of the above code will be

> Inside 'if': 30
>
> Outside 'if': 30

This output is obtained due to hoisting of `sum` variable to the top of `addNumbers` function.
It is equivalent to having the following:

```javascript
function addNumbers() {
  var sum = undefined // Hoisted to the top of addNumbers
  var a = 10
  ...
```

If you replace `var` with `let` / `const`, both of them will raise a **ReferenceError** at _line 9_.

##### Example 1.1.2

```javascript
var a = 10;

function func() {
  var a = 20;
  console.log(a);
}

func();
console.log(a);
```

Output of the above code will be

> 20
>
> 10

> :memo: **Note:** An important point to remember is that the JS Engine will search for variable `a` in the `function scope` first, if it is not found it will go the the nearest enclosing scope just above it. It does the same thing till it reaches the `global scope`.

##### Example 1.1.3

```javascript
const profile = {
  name: 'Kiran',
  college: 'BMSCE',
  gradSubject: 'CSE',
  location: 'Bengaluru',
};

profile.name = 'Kiran Nayak';
console.log(profile.name);
```

Output of the above code will be

> Kiran Nayak

Even though `profile` is declared with `const` type, its properties can be changed, as `profile` is storing the `reference of the object and not the value` directly. What is being changed is the data inside the object, so this is **_not an error_**.

##### Temporal Dead Zone (TDZ)

The space between the top of the scope till the place of declaration / initialization is called a TDZ. It is easier to demonstrate than explain.

##### Example 1.1.4

```javascript
console.log('Program starts, at line 1');
console.log('Program continues, line 2');
console.log('Program continues, line 3');

let name = 'Kiran'; // Same effect, even if you had used 'const'

console.log(name);
```

Output of the above code will be

> Program starts, at line 1
>
> Program continues, line 2
>
> Program continues, line 3
>
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

It is not causing any `ReferenceError`, because the `letVariable` was initialized before `func` was called.

##### Example 1.1.6

```javascript
...
{
  // TDZ starts at beginning of scope
  const func = () => console.log(letVariable) // OK

  // Within the TDZ letVariable access throws `ReferenceError`

  func() // Called within the TDZ, so ReferenceError will be raised!

  let letVariable = 3 // End of TDZ (for letVariable)
}
...
```

Output of the above code will be

> Uncaught ReferenceError: letVariable is not defined

Obviously, due to premature call to the function before initialization, the `ReferenceError` is raised.

It should now be crystal clear, as to why it is **_Temporal_** Dead Zone (TDZ)

If the interviewer asks which one would you use among `var` / `let` / `const`, say that you would prefer `const` in normal / default cases. If in case there is a need to change the value, choose `let`. Basically, avoid using `var`.

### Some bonus problems

##### Example 1.1.7

```javascript
function test() {
  console.log('x = ', x);
  var x = 10;
  console.log('x = ', x);
}

test();
```

Output of the above code will be

> x = undefined
>
> x = 10

Simple application of Hoisting.

##### Example 1.1.8

```javascript
function test() {
  var x;
  var x;
  var x;

  console.log('x = ', x);
}

test();
```

Output of the above code will be

> x = undefined

No, there will not be an error. That is how "powerful" / "buggy" `var` is.

##### Example 1.1.9

```javascript
function test() {
  var x;
  var x = 10;
  var x;

  console.log('x = ', x);
}

test();
```

Output of the above code will be

> x = 10

##### Example 1.1.10

```javascript
function test() {
  var x = 10;
  var x;
  var x = 30;

  console.log('x = ', x);
}

test();
```

Output of the above code will be

> x = 30

> :memo: **Note:** An important point to remember is that in the second line, where `x` is getting declared without initialization, it is not updated as undefined, for `x`. It still remains `10`.

##### Example 1.1.11

```javascript
function test() {
  var x = 10;
  {
    var x = 20;
    console.log('x = ', x);
  }

  console.log('x = ', x);
}

test();
```

Output of the above code will be

> x = 20
>
> x = 20

This is not difficult to predict. Now if you had initialized with `let` / `const`, you would have `20` and `10` as the answers.

##### Example 1.1.12

```javascript
var rate = 10;
function getRate() {
  if (rate === undefined) {
    var rate = 6;
    return rate;
  } else {
    return 10;
  }
}
console.log('Rate: ', getRate());
```

Output of the above code will be

> Rate: 6

Contrary to what is obvious, this is a very important Conceptual problem. Here, the `rate` is not defined within the `getRate` function, making it `undefined`, so the `if` block will be `true`. There, the value is set to `6` and returned.

##### Example 1.1.13

```javascript
var num1 = 10,
  num2 = 20,
  name = 'Kiran';
function getScore() {
  var num1 = 1,
    num2 = 2;
  function calcScore() {
    return name + ' scored ' + (num1 + num2);
  }
  return calcScore();
}
console.log(getScore());
```

Output of the above code will be

> Kiran scored 3

See that in the above code, `getScore` function has returned the evaluated value of `calcScore` and not the reference. So you don't need to curry it in `console.log`, like `console.log(getScore()())`.

##### Example 1.1.14

```javascript
func();

// As func is a function, it is hoisted to the top.
function func() {
  console.log(letVariable);
}

let letVariable = 20;
```

Output of the above code will be

> Uncaught ReferenceError: letVariable is not defined

This is a version of [Example 1.1.6](#example-116). Not difficult to predict the answer. See the next one for a variation.

##### Example 1.1.15

```javascript
func();

// Here the function func is an arrow function.
const func = () => {
  console.log(letVariable);
};

let letVariable = 20;
```

Output of the above code will be

> Uncaught ReferenceError: Cannot access `func` before initialization.

This means, the arrow function `func` is in TDZ.

##### Example 1.1.16

```javascript
console.log(square);
console.log(square(5));

var square = function (n) {
  return n * n;
};
```

Output of the above code will be

> undefined
>
> TypeError: square is not a function

See that, due to square being a `var` variable, square is hoisted, so first line is `undefined`. But, since it is not yet initialized, we get a `TypeError`.

> See [this problem](../1_4%20—%20Closures/closures.readme.md#example-144--this-was-asked-in-my-interview-c24) that was asked in C24 Interview, regarding `var` used in a loop.
