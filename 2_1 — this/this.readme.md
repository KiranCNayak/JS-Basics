## 2.1 _this_ in JS

Functions in JS are invoked in one of 4 different ways of binding.

1. Implicit binding
2. Explicit binding
3. 'new' binding
4. Default binding

##### 1. Implicit binding

```javascript
const person = {
  name: 'Kiran',
  greet() {
    console.log(`Hi ${this.name}!`);
  },
};

person.greet(); // 'this' keyword is referencing the 'person' object implicitly
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
  name: 'Kiran',
};
function greet() {
  console.log(`Hi ${this.name}!`);
}

greet.call(person);
```

Here, `greet` function's `this` object is explicitly bound to `person` context.

```javascript
// syntax of call method of Function
invokingFunc.call(thisArg);
invokingFunc.call(thisArg, arg1);
invokingFunc.call(thisArg, arg1, /*...,*/ argN);
```

Examples with arguments to call method

```javascript
const person = {
  name: 'Kiran',
};
function greet(hobby1, hobby2) {
  console.log(`Hi ${this.name}! Your hobbies are ${hobby1} and ${hobby2}`);
}

greet.call(person, 'Cricket', 'Badminton'); // 'call' method takes 'thisArg' as first argument, where we have passed 'person'
```

Output of the above code will be

> Hi Kiran! Your hobbies are Cricket and Badminton

`apply` which is similar to `call` method, but differs only in that it takes an array, instead of a variable length argument.

```javascript
// syntax of apply method of Function
invokingFunc.apply(thisArg);
invokingFunc.apply(thisArg, [argArray]);
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
  name: 'Kiran',
};

function greet(hobby1, hobby2) {
  console.log(`Hi ${this.name}! Your hobbies are ${hobby1} and ${hobby2}`);
}

const greetKiran = greet.bind(person, 'Cricket', 'Badminton');
greetKiran(); // A re-usable function that is being used here
```

##### 3. 'new' binding

It is similar to how we use `new` keyword in `Java`.

```javascript
function Person(name) {
  this.name = name;
}

const person1 = new Person('Kiran');
const person1 = new Person('Kumar');
```

When we invoke a function with `new` keyword, JS under the hood will create a new empty object which the `this` keyword references. So it is as though :

```javascript
function Person(name) {
  // this = {}  --> whenever you use 'new', an empty `this` object is created under the hood
  this.name = name; // Now, populate the empty 'this' object with a name property having value as 'Kiran', if you consider the next line
}

const person1 = new Person('Kiran');
```

##### 4. Default binding

It is the fallback when none of the other three rules are matched. JS will default to global scope and set `this` keyword to the `window` object.

```javascript
function greet() {
  console.log(`Hi ${this.name}`);
}

greet();
```

Output of the above code will be

> Hi undefined

JS tried to search for name in global scope, and since it didn't find any variable with `name` identifier, it defaulted to `undefined`. In case there were a variable with the name as `name`, it would be used, even though it was not bound to the function's context Implicitly / Explicitly / using a 'new' keyword.

```javascript
var name = 'Kiran';
function greet() {
  console.log(`Hi ${this.name}`);
}

greet();
```

Output of the above code will be

> Hi Kiran

REMEMBER: This only works with `var` and doesn't work with `let` / `const`

`ORDER OF PRECEDENCE` of function bindings is as follows:

1. 'new'
2. Explicit
3. Implicit
4. Default
