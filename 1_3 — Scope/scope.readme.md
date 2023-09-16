## 1.3 Scope in JS

There are 4 kinds of Scopes in JS.

|           Type | Description                                                                  |
| -------------: | :--------------------------------------------------------------------------- |
|   Global Scope | Default scope for all code running in script mode.                           |
|   Module Scope | scope for code running in module mode.                                       |
| Function Scope | Scope created within a function                                              |
|    Block Scope | (Introduced in ES6 Specification) Scope created with a pair of curly braces. |

There is another concept of `Lexical Scoping` which is used by the `Parser` to resolve variable names when the functions are nested.

`Lexical scoping` refers to the location where a variable is declared within the source code to determine where that variable is available. If there are nested functions, JS Engine for variable lookup starts with the inner function where we are trying to access the variable and moves outward until it reaches the global scope.

##### Example 1.3.1

```javascript
const a = 10;

function exampleFunc() {
  const b = 20;

  function inner() {
    const c = 30;

    console.log(a, b, c);
  }
}
```

Output of the above code will be

> 10 20 30

The JS Engine checks if `a` is defined in the inner function scope. Since it is not present, it goes to the block just above it, which is a function block (exampleFunc). Since it is not present here as well, it goes to the block above it (This will happen till the global scope is reached, for every variable). Now the variable is found, and its value is used in the log statement.

Similarly, the engine checks if the variable `b` and `c` are available. The above mentioned process repeats, and `b` and `c` are found.

Now we need to understand about `Scope Chaining`. It is the union of currect scope and all the parent scopes that a function has access to. In the `Example 1.2.1` above, `inner` function has access to all variables `a`, `b` and `c`, due to scope chaining.
