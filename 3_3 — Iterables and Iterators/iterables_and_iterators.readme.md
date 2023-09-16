## 3.3 Iterables and Iterators in JS (Introduced in `ES6` Specification)

Why were they introduced ?

> To process a sequence of data more efficiently
>
> They make it possible to access data from a collection one at a time which will allow us to focus on what to do with that data rather than how to access that data.
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
  console.log(ch);
}

// To access each item in an array
for (const item of array) {
  console.log(item);
}

// To access each K-V pair in a map
for (const [key, val] of mMap) {
  console.log(`${key}: ${val}`);
}

// To access each element in a set
for (const elem of mSet) {
  console.log(elem);
}
```

REMEMBER: `Objects` in JS are **_NOT_** `Iterable` by default. We can make an object iterable by implementing the iterable protocol. Let us now implement it, to convert an object .

```javascript
const obj = {
  // Every 'iterable' must have a Symbol called 'iterator'
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        switch (step) {
          case 1:
            return { value: 'Hello', done: false };
          case 2:
            return { value: 'World', done: false };
          default:
            return { value: undefined, done: true };
        }
      },
    };
  },
};
```

You can create a custom iterable that gives a range of numbers from `1` to `max` (specified by you).

```javascript
const range = function (max) {
  return {
    [Symbol.iterator]: function () {
      let idx = 0;
      return {
        next: function () {
          return { value: ++idx, done: idx === max + 1 };
        },
      };
    },
  };
};

for (const a of range(10)) {
  console.log(a);
}
```

> IMPORTANT: The iterator mentioned above, can optionally also return a `return` property, which is called when the iterator stops prematurely (Like a `break` statement in the `for...of` loop). See below on how to use it.

```javascript
const range = function (max) {
  return {
    [Symbol.iterator]: function () {
      let idx = 0;
      return {
        next: function () {
          return { value: ++idx, done: idx === max + 1 };
        },
        // This is not Compulsory
        return: function () {
          return {
            done: true,
          };
        },
      };
    },
  };
};

for (const a of range(10)) {
  console.log(a);
  if (a === 5) break;
}
```

> Similarly there is an optional `throw` property as well.
>
> See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) if you need more info on `Iteration Protocols`.
