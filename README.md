# JS-Basics

Quick Notes to prepare for JS heavy Interviews (like React and React Native)

## 1.1 Variables in JS

|               |            var            |                                                                                                                        let                                                                                                                        |                                 const                                  |
| :-----------: | :-----------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|    Scoping    |      function scoped      |                                                                                                                   block scoped                                                                                                                    |                              block scoped                              |
|   Hoisting    | hoisted — **_undefined_** |                                                                                                **ReferenceError** (if accessed before declaration)                                                                                                |        **ReferenceError**<br/>(if accessed before declaration)         |
| Other details |             —             | `let` begins declarations, not statements<br/>So we can't use a lone declaration as the<br/>body of a block. Ex: `if(true) let v1 = 1`<br/>will throw a **SyntaxError:** `Lexical declaration`<br/>`cannot applear in a single-statement context` | Must be initialized on declaration,<br/>can't re-assign with new value |

#### Examples

```javascript
function addNumbers() {
  var a = 10
  var b = 20

  // Random condition check
  if (b > a) {
    var sum = a + b
    console.log("Inside 'if': ", sum) // Inside 'if': 30
  }

  console.log("Outside 'if': ", sum) // Outside 'if': 30
}

addNumbers()
```

This output is obtained due to hoisting of `sum` variable to the top of `addNumbers` function.
It is equivalent to having the following:

```javascript
function addNumbers() {
  var sum = undefined // Hoisted to the top of addNumbers
  var a = 10
  ...
```

If you replace `var` with `let` / `const` (As part of ES6 (2015) specification), both of them will raise a **ReferenceError** at _line 9_.

If the interviewer asks which one would you use among `var` / `let` / `const`, say that you would prefer `const` in normal / default cases. If in case there is a need to change the value, choose `let`. Basically, avoid using `var`.

---

## Glossary

|     Term | Meaning / Other details                                                                                                                                       |
| -------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hoisting | Variable declarations are put into memory during the compile phase<br/>In simple words, Hoisting means moving variable declarations to the top of their scope |

---

## Sources

|      Topic | Source Link                                                                                              |
| ---------: | :------------------------------------------------------------------------------------------------------- |
| Javascript | [MDN](https://developer.mozilla.org/docs/Web)<br/>[Codevolution Course](https://learn.codevolution.dev/) |
|   Markdown | [Markdown Guide](https://www.markdownguide.org/basic-syntax)                                             |
