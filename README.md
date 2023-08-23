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
>
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
>
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
>
> 12 10
>
> 11 5
>
> 12 10

##### Applications of Closures

1. Utility functions that implement `memoization`
2. Module Pattern which provides `data privacy`
3. Throttle and Debounce functionality
   > ```javascript
   > // Throttle Functionality
   > const throttle = (cbFunc, limit) => {
   >   let isThrottling = false
   >   return function () {
   >     if (!isThrottling) {
   >       cbFunc.apply(this, arguments)
   >       isThrottling = true
   >       setTimeout(() => {
   >         isThrottling = false
   >       }, limit)
   >     }
   >   }
   > }
   >
   > // Debounce
   > const debounce = (cbFunc, delay) => {
   >   let debouncing
   >   return function () {
   >     clearTimeout(debouncing)
   >     debouncing = setTimeout(() => {
   >       cbFunc.apply(this, arguments)
   >     }, delay)
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
>
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

## 2.1 _this_ in JS

Functions in JS are invoked in one of 4 different ways of binding.

1. Implicit binding
2. Explicit binding
3. 'new' binding
4. Default binding

##### 1. Implicit binding

```javascript
const person = {
  name: "Kiran",
  greet() {
    console.log(`Hi ${this.name}!`)
  },
}

person.greet() // 'this' keyword is referencing the 'person' object implicitly
```

`this.name` will be considered as `person.name` and the output will be `Hi Kiran!`

In implicit binding, the function that uses `this` keyword is part of the object that calls it, i.e., `greet` is part of `person`.

##### 2. Explicit binding

There are 3 methods of `Function` to do explicit binding in JS. They are:

1. `call` method
2. `apply` method
3. `bind` method

```javascript
const person = {
  name: "Kiran",
}
function greet() {
  console.log(`Hi ${this.name}!`)
}

greet.call(person)
```

Here, `greet` function's `this` object is explicitly bound to `person` context.

```javascript
// syntax of call method of Function
invokingFunc.call(thisArg)
invokingFunc.call(thisArg, arg1)
invokingFunc.call(thisArg, arg1, /*...,*/ argN)
```

Examples with arguments to call method

```javascript
const person = {
  name: "Kiran",
}
function greet(hobby1, hobby2) {
  console.log(`Hi ${this.name}! Your hobbies are ${hobby1} and ${hobby2}`)
}

greet.call(person, "Cricket", "Badminton") // 'call' method takes 'thisArg' as first argument, where we have passed 'person'
```

Output of the above code will be

> Hi Kiran! Your hobbies are Cricket and Badminton

`apply` which is similar to `call` method, but differs only in that it takes an array, instead of a variable length argument.

```javascript
// syntax of apply method of Function
invokingFunc.apply(thisArg)
invokingFunc.apply(thisArg, [argArray])
```

Per MDN, this `argArray`'s length is capped arbitrarily at `65,636`. For more details, see [MDN documentation on `apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#using_apply_and_built-in_functions)

> Trick to REMEMBER what `call` and `apply` do, is to think of them as follows:
>
> `call` as a function that takes `comma` separated arguments and
>
> `apply` as a function that takes an `array` of arguments

`bind` method is similar to `call`, except that it doesn't call the function right there (where it is declared), it returns a function which now has the context of what `thisArg` means, and it can be used to invoke at a later point.

```javascript
const person = {
  name: "Kiran",
}

function greet(hobby1, hobby2) {
  console.log(`Hi ${this.name}! Your hobbies are ${hobby1} and ${hobby2}`)
}

const greetKiran = greet.bind(person, "Cricket", "Badminton")
greetKiran() // A re-usable function that is being used here
```

##### 3. 'new' binding

It is similar to how we use `new` keyword in `Java`.

```javascript
function Person(name) {
  this.name = name
}

const person1 = new Person("Kiran")
const person1 = new Person("Kumar")
```

When we invoke a function with `new` keyword, JS under the hood will create a new empty object which the `this` keyword references. So it is as though :

```javascript
function Person(name) {
  // this = {}  --> whenever you use 'new', an empty `this` object is created under the hood
  this.name = name // Now, populate the empty 'this' object with a name property having value as 'Kiran', if you consider the next line
}

const person1 = new Person("Kiran")
```

##### 4. Default binding

It is the fallback when none of the other three rules are matched. JS will default to global scope and set `this` keyword to the `window` object.

```javascript
function greet() {
  console.log(`Hi ${this.name}`)
}

greet()
```

Output of the above code will be

> Hi undefined

JS tried to search for name in global scope, and since it didn't find any variable with `name` identifier, it defaulted to `undefined`. In case there were a variable with the name as `name`, it would be used, even though it was not bound to the function's context Implicitly / Explicitly / using a 'new' keyword.

```javascript
var name = "Kiran"
function greet() {
  console.log(`Hi ${this.name}`)
}

greet()
```

Output of the above code will be

> Hi Kiran

REMEMBER: This only works with `var` and doesn't work with `let` / `const`

`ORDER OF PRECEDENCE` of function bindings is as follows:

1. 'new'
2. Explicit
3. Implicit
4. Default

## 2.2 Prototype in JS

Consider you have to create a `person` object that holds `name` and some associated methods with it, similar to what is described below.

```javascript
let person = {}

person.name = "Kiran"

person.greet = function () {
  console.log(`Hi ${this.name}!`)
}

person.talk = function () {
  console.log("Talking")
}

person.eatFood = function (food) {
  console.log(`Eating ${food}`)
}
```

If you need to make it a bit more re-usable, you should convert it into a function (basically an object factory / similar to a class in Java) and call it each time you need a new `Person`, as shown below.

```javascript
function Person(name) {
  let person = {}

  person.name = name

  person.greet = function () {
    console.log(`Hi ${this.name}!`)
  }

  person.talk = function () {
    console.log("Talking")
  }

  person.eatFood = function (food) {
    console.log(`Eating ${food}`)
  }
  return person
}

const personKiran = Person("Kiran")
const personKumar = Person("Kumar")
const personVarun = Person("Varun")
```

There is a downside to this, since the `greet`, `talk`, `eatFood` methods are created for each of these objects, and allocated memory separately. But it is evident from the definition of these methods that it is generic enough to separate them out of `Person`, into a new `personMethods` object, and `Person` function can be re-written as follows.

```javascript
const personMethods = {
  greet() {
    console.log(`Hi ${this.name}!`)
  }

  talk() {
    console.log("Talking")
  }

  eatFood(food) {
    console.log(`Eating ${food}`)
  }
}

function Person(name) {
  let person = {}

  person.name = name
  person.talk = personMethods.talk
  person.greet = personMethods.greet
  person.eatFood = personMethods.eatFood

  return person
}

const personKiran = Person("Kiran")
personKiran.greet()
personKiran.talk()
personKiran.eatFood("Dosa")
```

Output of the above code will be

> Hi Kiran
>
> Talking
>
> Eating Dosa

Here, we assigned the same object properties of `personMethods` to `Person`'s methods. This re-uses the methods and doesn't create new instances of these methods for each `Person` object.

Although, this is quite an improvement over the previous code, there are some more changes that can be done. For instance, we don't need to set `personMethods`' methods individually to `Person`'s methods. That can be achieved using `Object.create()`.

```javascript
const personMethods = {
  //Same as before, so not repeating
  ...
}

function Person(name) {
  let person = Object.create(personMethods) // Instead of empty object initialization use 'create' method of 'Object'.
  person.name = name

  // 'person' is already having all the methods of 'personMethods', that is why we don't need to associate it again explicitly.

  return person
}

const personKiran = Person("Kiran")
personKiran.greet()
personKiran.talk()
personKiran.eatFood("Dosa")
```

Output of the above code will be

> Hi Kiran
>
> Talking
>
> Eating Dosa

The output is obviously the same. Only the internal mechanism has been modified. We are now properly re-using the methods (Though without Prototype yet!).

Now we are equiped enough to start talking about Prototypes.

In JS, every function has a property called `prototype`. We can make use of it to define all our shareable methods instead of having to create a separate object (like `personMethods`) ourselves.

```javascript
Person.prototype.greet = function () {
  console.log(`Hi ${this.name}`)
}

Person.prototype.talk = function () {
  console.log("Talking")
}

Person.prototype.eatFood = function (food) {
  console.log(`Eating ${food}`)
}

function Person(name) {
  let person = Object.create(Person.prototype)
  person.name = name

  return person
}

const personKiran = Person("Kiran")
```

There is one more optimization that can be done, which uses `new` keyword. If you use `new` keyword to initialize a person, then you wouldn't even have to create & return an object. `new` does it under the hood.

```javascript
Person.prototype.greet = function () {
  console.log(`Hi ${this.name}`)
}

Person.prototype.talk = function () {
  console.log("Talking")
}

Person.prototype.eatFood = function (food) {
  console.log(`Eating ${food}`)
}

// Since this function is invoked with the 'new' keyword, it is called a 'constructor' function
function Person(name) {
  this.name = name
}

const personKiran = new Person("Kiran") // Using 'new' makes it have all methods associated with 'Person' prototype.
```

> IMPORTANT: There is no prototype for arrow functions

##### Constructor property of a `prototype`

If you log the above `Person`'s `prototype`, you can see

```javascript
... // Same as above
console.log(Person.prototype)
```

Output of the above code will be

> `{ greet: f, talk: f, eatFood: f, constructor: f }`

And if you log the `constructor` property of `prototype`, It will return the original `Person` function back.

```javascript
... // Same as above
console.log(Person.prototype.constructor)
```

Output of the above code will be

> `f Person(name) {`
>
> &nbsp;&nbsp;&nbsp;&nbsp;`this.name = name`
>
> `}`

As we expect, we get the original `Person` function back, when we access the constructor property.

##### `Object.getPrototypeOf()`

Once an object is created, it is possible to get the prototype of that object using `Object.getPrototypeOf()` method.

```javascript
... // Same as above
console.log(Object.getPrototypeOf(personKiran))
```

Output of the above code will be

> `{ greet: f, talk: f, eatFood: f, constructor: f }`

##### `instanceof` operator

It is possible to know if an object is an instance of a constructor function using the `instanceof` operator.

```javascript
... // Same as above
console.log(personKiran instanceof Person)
```

Output of the above code will be

> `true`

##### `hasOwnProperty` of objects

```javascript
... // Same as above
const personKiran = new Person("Kiran")

// Iterate on all properties of 'personKiran' object, & print
//  only those which are directly belonging to 'personKiran'.
for (key in personKiran) {
  if (personKiran.hasOwnProperty(key)) {
    console.log(
      `\nOWN PROPERTY\nkey: ${key}\tvalue: ${personKiran[key]}`,
    )
  } else {
    console.log(
      `\nINHERITED PROPERTY\nkey: ${key}\tvalue: ${personKiran[key]}`,
    )
  }
}
```

Output of the above code will be

> OWN PROPERTY
>
> key: name value: Kiran
>
> INHERITED PROPERTY
>
> key: greet value: function () {
>
> &nbsp;&nbsp;&nbsp;&nbsp;console.log(\`Hi ${this.name}, How are you doing ?\`)
>
> }
>
> INHERITED PROPERTY
>
> key: talk value: function () {
>
> &nbsp;&nbsp;&nbsp;&nbsp;console.log(\`${this.name} is talking!\`)
>
> }
>
> INHERITED PROPERTY
>
> key: eatFood value: function (food = "Idli") {
>
> &nbsp;&nbsp;&nbsp;&nbsp;console.log(\`Eating ${food} 🍛\`)
>
> }

## 2.3 Prototypal Inheritance in JS

If you need to have `Inheritance based data initialization`, where common features go into the parent Prototype (similar to the one in `Java`), you can make use of Prototypal Inheritance that is already there in JS (by 'already' I mean, it existed before the concept of `class` was introduced in `ES6` specification).

Say you need a `Programmer` function that has methods and properties similar to `Person` without Inheritance, it would be implemented as given below:

```javascript
function Programmer(name, language) {
  this.name = name // This is created as a property of Programmer (Obviously!)
  this.language = language
}

Programmer.prototype.greet = function () {
  console.log(`Hi ${this.name}`)
}

Programmer.prototype.eat = function (food) {
  console.log(`Eating ${food}`)
}

Programmer.prototype.talk = function () {
  console.log("Talking")
}

Programmer.prototype.code = function () {
  console.log(`Coding in ${this.language} language`)
}
```

Since we already have a `Person` object that takes in a property `name` and has the same three methods, we can make use of Inheritance here.

`Prototypal Inheritance` is done in 4 basic steps:

1. Add properties pertaining to `Programmer`
1. Add methods pertaining to `Programmer`
1. Inherit properties from `Person`
1. Inherit methods from `Person`

To set the value of name to the `Programmer` we use `Explicit binding` to send the value of name to `Person` from the `Programmer` context. This can be done using the `call` method of `Object`.

```javascript
function Programmer(name, language) {
  // this.name = name  // Instead of setting a new 'name' property to 'Programmer', initialize 'name' to 'Person'
  Person.call(this, name) // Passing name as argument to initialize a new 'Person', but with 'Programmer' context
  this.language = language
}
```

Now we need to setup the prototypes properly, making `Person` as the fallback prototype when `Programmer` prototype doesn't have a property / method that is being accessed on `Programmer`.

```javascript
function Programmer(name, language) {
  Person.call(this, name)
  this.language = language
}

Programmer.prototype = Object.create(Person.prototype)

// IMPORTANT: You must initialize 'code' method on Programmer's prototype ONLY AFTER the previous line (that is after Object.create is invoked)
//  If you do it before, it will not have 'code' as a member method, as 'Object.create' overrides the content of Programmer.prototype.
Programmer.prototype.code = function () {
  console.log(`Coding in ${this.language} language`)
}
```

Basically, we have now wired `Person` to be the fallback prototype to be searched, on a failed lookup of a property / method of `Programmer`. Say, you access a property `age` on an object created with `new` keyword on `Programmer`. JS Engine searches that object first, if there is no such property then `Programmer` prototype is looked up. If it also doesn't have the property, JS Engine goes on to check `Person` prototype (This is because of `Object.create` wiring that was done previously). If it also doesn't have the property, JS Engine goes on doing the same till it reaches `Object` object. If `Object` also doesn't have that property, then JS Engine calls off, and the value is set as `undefined`.

There is a pitfall in this code. To see that run the following:

```javascript
... // Same as above
const programmerKiran = new Programmer("Kiran", "Javascript")
console.log(programmerKiran.constructor)
```

Output of the above code will be

> `f Person(name) {`
>
> &nbsp;&nbsp;&nbsp;&nbsp;`this.name = name`
>
> `}`

Instead of pointing to the `Programmer` constructor function, the above code wrongly points to `Person` constructor function. To rectify this error, we need to point the Programmer.prototype.contructor to Programmer as given below:

```javascript
... // Same as above
const programmerKiran = new Programmer("Kiran", "Javascript")

Programmer.prototype.constructor = Programmer // This resets the reference of 'Programmer' prototype's 'constructor' correctly to 'Programmer'.

console.log(programmerKiran.constructor)
```

Output of the above code will be

> `f Programmer(name, language) {`
>
> &nbsp;&nbsp;&nbsp;&nbsp;`Person.call(this, name)`
>
> &nbsp;&nbsp;&nbsp;&nbsp;`this.language = language`
>
> `}`

## 2.4 Classes in JS (Introduced in `ES6` Specification)

Unlike C# and Java, classes in JS are just a syntactic sugar over the existing Prototypal inheritance.

Therefore, it is better to directly convert the existing code in `Prototypal Inheritance` to `Classes`.

**Given below is the existing code for `Person` constructor function**

```javascript
function Person(name) {
  this.name = name
}

Person.prototype.greet = function () {
  console.log(`Hi ${this.name}`)
}

Person.prototype.talk = function () {
  console.log("Talking")
}

Person.prototype.eatFood = function (food) {
  console.log(`Eating ${food}`)
}

const personKiran = new Person("Kiran")
const personKumar = new Person("Kumar")
const personVarun = new Person("Varun")
```

**`It changes to the following using Classes`**

```javascript
class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    console.log(`Hi ${this.name}`)
  }

  talk() {
    console.log("Talking")
  }

  eatFood(food) {
    console.log(`Eating ${food}`)
  }
}

const personKiran = new Person("Kiran")
const personKumar = new Person("Kumar")
const personVarun = new Person("Varun")
```

Similarly let us change the definition of Programmer constructor function as well.

**Given below is the existing code for `Programmer` constructor function**

```javascript
function Programmer(name, language) {
  Person.call(this, name)
  this.language = language
}

Programmer.prototype = Object.create(Person.prototype)

Programmer.prototype.code = function () {
  console.log(`Coding in ${this.language} language`)
}

Programmer.prototype.constructor = Programmer

const programmerKiran = new Programmer("Kiran", "Javascript")
```

**`It changes to the following using Classes`**

```javascript
// Notice how similar this is to the Java code
//  even though concept is not same as in Java
class Programmer extends Person {
  constructor(name, language) {
    super(name)
    this.language = language
  }

  code() {
    console.log(`Coding in ${this.language} language`)
  }
}

const programmerKiran = new Programmer("Kiran", "Javascript")
```

## 3.1 `Map` — Standard Object in JS

`Map` object in JS holds Key-Value pairs similar to an object. It is declared as follows.

```javascript
const mp = new Map()
```

`To add` K-V pairs we use the **`set`** `method`, by passing key and value as arguments.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")
```

`To get` the value use the **`get`** `method`, by passing key as argument.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

console.log(mp.get("firstName")) // Obviously prints 'Kiran'
```

`To get` the size of the map use **`size`** `property`. Re-iterating again, **`size`** is a `property`.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

console.log(mp.size) // Prints 2
```

`To see` if map has a `property` given in the argument, use the **`has`** method.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

console.log(mp.has("firstName")) // Prints true
console.log(mp.has("fullName")) // Prints false
```

`To delete` a K-V pair from the map, use **`delete`** method, by passing key as argument. It returns `true` if the `key` that was passed existed in the map, otherwise returns `false`.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

console.log(mp.delete("firstName")) // Prints true
console.log(mp.delete("fullName")) // Prints false
```

`To delete` all K-V pairs from the map, use **`clear`** method.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

mp.clear()

console.log(mp.size) // Prints 0
```

`To iterate` over K-V pairs, use **`forEach`** method of `Map`. It takes a function with 3 arguments where, **_`WEIRDLY`_**, `value` comes first, then the `key` and then the `map` on which it is iterating on. Each element is taken based on the **`INSERTION ORDER`**.

```javascript
function logMapElements(val, key, map) {
  console.log(`m[${key}] = ${val}`)
}
new Map([
  ["foo", 3],
  ["bar", {}],
  ["baz", undefined],
]).forEach(logMapElements)
```

Output of the above code will be

> `m[foo] = 3`
>
> `m[bar] = [object Object]`
>
> `m[baz] = undefined`

`To iterate` over K-V pairs, use **`for...of`** construct.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

for (let [key, value] of mp) {
  console.log(key + ": " + value)
}
```

`To iterate` over K-V pairs, you can also use **`for...of`** construct on `entries()` method of `Map`, which returns a `map iterator` having `[key, value]` pair array for each element, in the **`INSERTION ORDER`**.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

for (let [key, value] of mp.entries()) {
  console.log(key + ": " + value)
}
```

Output of `both` the above codes will be

> `firstName: Kiran`
>
> `lastName: Nayak`

`To iterate` over only the Keys, use **`for...of`** construct on `keys` method of map.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

for (let key of mp.keys()) {
  console.log(key)
}
```

Output of the above code will be

> `firstName`
>
> `lastName`

`To iterate` over only the Values, use **`for...of`** construct on `values` method of map.

```javascript
const mp = new Map()

mp.set("firstName", "Kiran")
mp.set("lastName", "Nayak")

for (let value of mp.values()) {
  console.log(value)
}
```

Output of the above code will be

> `Kiran`
>
> `Nayak`

##### Converting `Map` to `Array` and vice versa

```javascript
const personMap = new Map()

personMap.set("firstName", "Kiran")
personMap.set("lastName", "Nayak")

const personArray = Array.from(personMap)
```

```javascript
const personArray = [
  ["firstName", "Kiran"],
  ["lastName", "Nayak"],
]
const personMap = new Map(personArray)
```

##### Obvious Question: Why use `Map` when there is `Object` already ?

Reasons are listed below:

1. key type

   > A `Map`'s keys can be any value (including functions, objects or any primitive).
   >
   > But an `Object` can only have a `String` / `Symbol` as keys.

2. Default keys

   > `Map` doesn't contain any keys by default.
   >
   > But an `Object` however has a `prototype`, so it contains default keys.

3. Accessing the size

   > Map has an inbuilt `property` called `size`.
   >
   > But an `Object` doesn't, so we need to manually check for the size.

4. Iteration strategies

   > Map is an `Iterable`, so it can directly be iterated upon.
   >
   > Iterating over an `Object` needs a way to obtain its keys, then iterate over them.

## 3.2 `Set` — Standard Object in JS

A `Set` object in JS stores **`UNIQUE`** values of any type. So no repetition of values.

To insert an element to a `Set`, use `add(<item>)` (This is different from the `set` method of `Map`).

Almost all the methods and properties are similar to `Map`, like `size`, `has(<item>)`, `delete(<item>)`, `clear()`, `forEach()`, `entries()`, `keys()`, `values()`.

> NOTE: `keys()` and `values()` in a `Set` return same values. Per MDN, `keys()` is an alias of `values()`

`To iterate` over the values of a `Set`, use **`for...of`** construct.

```javascript
const st = new Set()

st.add("Red")
st.add("Red") // This element won't be inserted
st.add("Blue")
st.add("Green")
st.add("Yellow")

for (let value of st) {
  console.log(value)
}
```

Output of the above code will be

> `Red`
>
> `Blue`
>
> `Green`
>
> `Yellow`

##### Converting `Set` to `Array` and vice versa

```javascript
const colorSet = new Set()

colorSet.add("Red")
colorSet.add("Blue")
colorSet.add("Green")
colorSet.add("Yellow")

const colorArray = [...colorSet]
```

```javascript
const colorArray = ["Red", "Blue", "Green", "Yellow"] // It will also remove any duplicates, if present.
const colorSet = new Map(colorArray)
```

## 3.3 Iterables and Iterators in JS (Introduced in `ES6` Specification)

Why were they introduced ?

> To process a sequence of data more efficiently
>
> They make it possible to access data from a collection one at a time which will allow us to focus on what to do with taht data rather than how to access that data.
>
> JS didn't have the vest looping construct to iterate over a collection of data and there was a need to introduce a better `iteration protocol`.

Technical Definition of `Iterables` and `Iterators`

##### Iterable

It is a data structure that wants to make its elements accessible to the public.

##### Iterator

It is an object that knows how to access items from a collection one at a time, while keeping track of its current position within that sequence.

---

`Built-in Iterables` in JS are `Strings`, `Arrays`, `Maps`, `Sets`. There is a way to access elements one at a time from these data structures. But to access these there was a new looping construct (`for...of`) introduced in the `ES6` Specification.

this `for...of` loop construct is easy to use and implement over the built-in objects as shown below.

```javascript
// To access each character in a string
for (const ch of str) {
  console.log(ch)
}

// To access each item in an array
for (const item of array) {
  console.log(item)
}

// To access each K-V pair in a map
for (const [key, val] of mMap) {
  console.log(`${key}: ${val}`)
}

// To access each element in a set
for (const elem of mSet) {
  console.log(elem)
}
```

REMEMBER: `Objects` in JS are **_NOT_** `Iterable` by default. We can make an object iterable by implementing the iterable protocol. Let us now implement it, to convert an object .

```javascript
const obj = {
  // Every 'iterable' must have a Symbol called 'iterator'
  [Symbol.iterator]: function () {
    let step = 0
    const iterator = {
      next: function () {
        step++
        switch (step) {
          case 1:
            return { value: "Hello", done: false }
          case 2:
            return { value: "World", done: false }
          default:
            return { value: undefined, done: true }
        }
      },
    }
  },
}
```

You can create a custom iterable that gives a range of numbers from `1` to `max` (specified by you).

```javascript
const range = function (max) {
  return {
    [Symbol.iterator]: function () {
      let idx = 0
      return {
        next: function () {
          return { value: ++idx, done: idx === max + 1 }
        },
      }
    },
  }
}

for (const a of range(10)) {
  console.log(a)
}
```

> IMPORTANT: The iterator mentioned above, can optionally also return a `return` property, which is called when the iterator stops prematurely (Like a `break` statement in the `for...of` loop). See below on how to use it.

```javascript
const range = function (max) {
  return {
    [Symbol.iterator]: function () {
      let idx = 0
      return {
        next: function () {
          return { value: ++idx, done: idx === max + 1 }
        },
        // This is not Compulsory
        return: function () {
          return {
            done: true,
          }
        },
      }
    },
  }
}

for (const a of range(10)) {
  console.log(a)
  if (a === 5) break
}
```

> Similarly there is an optional `throw` property as well.
>
> See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) if you need more info on `Iteration Protocols`.

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
