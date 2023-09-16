## 1.6 Immutability in JS

[Look at this link for full description](https://daveceddia.com/react-redux-immutability-guide) -> `Very well written`

Some languages are not at all mutable. Meaning, they cannot change the value of a variable once assigned.

JS is part mutable and part immutable. Some `array` operations in JS, return a new array after doing the operation, like `Array.prototype.slice()` method, which is basically immutability in action. Similarly, `Array.prototype.sort()` is done in place, so it is mutable operation.

> EXTRA: Mutable methods of Array
>
> push(\<item\>) — adds an item to the end of the array
>
> pop() — removes an item from the end of the array
>
> shift() — adds an item to the start of the array
>
> unshift(\<item\>) — adds an item to the start of the array
>
> sort()
>
> reverse()
>
> splice()

##### Example 1.6.1

```javascript
const person = {
  name: 'Kiran',
  college: 'BMSCE',
  address: 'KA, India',
};

const addSpecialPowers = target => {
  target.specialPower = 'Invisibility';
  return target;
};

const samePerson = addSpecialPowers(person);

console.log(person.specialPower);
console.log(samePerson.specialPower);

console.log(person === samePerson);
```

Output of the above code will be

> Invisibility
>
> Invisibility
>
> true

As we can see, the original `person` object has been tampered with, that is it has `mutated`.

How do we know they are both the same object ?

`Ans`: The last console log is showing the result needed.

To not have these kind of changes, we need to follow some rules to make functions, `pure`.

##### Rules of immutability

1. A pure function must always return the same value when given the same inputs.

2. A pure function must not have any side effects.

Now, to change the above code to have immutability and `addSpecialPowers` to be a `Pure Function`, we need to make the following changes.

```javascript
// Same as before, so not repeating
function giveAwesomePowers(person) {
  let newPerson = {
    ...person,
    specialPower: 'invisibility',
  };

  return newPerson;
}
// Same as before, so not repeating
```
