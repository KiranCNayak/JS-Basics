## 1.1 Variables in JS

|               |            var            |                                                                                                                       let                                                                                                                        |                                 const                                  |
| ------------: | :-----------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|       Scoping |      function scoped      |                                                                                                                   block scoped                                                                                                                   |                              block scoped                              |
|      Hoisting | hoisted — **_undefined_** |                                                                                               **ReferenceError** (if accessed before declaration)                                                                                                |        **ReferenceError**<br/>(if accessed before declaration)         |
| Other details |             —             | `let` begins declarations, not statements<br/>So we can't use a lone declaration as the<br/>body of a block. Ex: `if(true) let v1 = 1`<br/>will throw a **SyntaxError:** `Lexical declaration`<br/>`cannot appear in a single-statement context` | Must be initialized on declaration,<br/>can't re-assign with new value |

#### Examples

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

If you replace `var` with `let` / `const` (As part of ES6 (2015) specification), both of them will raise a **ReferenceError** at _line 9_.

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
> 20

> NOTE: An important point to remember is that the JS Engine will search for variable `a` in the `function scope` first, if it is not found it will go the the nearest enclosing scope just above it. It does the same thing till it reaches the `global scope`.

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

It should now be crystal clear, as to why it is **_Temporal_** Dead Zone (TDZ)

If the interviewer asks which one would you use among `var` / `let` / `const`, say that you would prefer `const` in normal / default cases. If in case there is a need to change the value, choose `let`. Basically, avoid using `var`.
