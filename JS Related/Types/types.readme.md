## 1.2 Types in JS

There are two types of values in JS. They are:

1. Primitive types — like `string`, `boolean`, `number`, `symbol`, `undefined`, `null`. These are immutable, i.e., Read-only and can't be changed.

   ##### Example 1.2.1

   ```javascript
   let name = 'Kiran';
   name.toLowerCase();
   console.log(name); // still capital-K "Kiran"

   name = name.toLowerCase();
   console.log(name); // now it's "kiran"
   ```

2. All other types are clubbed into `object` type — like `object`, `array`, `function`, and other data structures like `Map` and `Set`. These are mutable, i.e., they can be changed.

## Deep Copy v/s Shallow Copy

[Dave's Blog](https://daveceddia.com/javascript-references/) has more details.

| Deep copy                                                                             | Shallow copy                                                                 |
| :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| New object is created with all properties<br/>that are in a separate memory location. | The reference of the object is copied,<br/>so all the properties are shared. |

### Ways to deep copy an object (That is the most asked question, than array related questions in deep copy)

1. Using the spread operator
2. Using `Object.assign({}, object1, object2, ...)` where each of the successive objects overrides previous objects' properties, if the property `key` is the same.
3. Using `JSON.parse(JSON.stringify(object))`: This has a caveat that it doesn't work with `Dates`, `functions`, `undefined`, `Infinity`, `RegExps`, `Maps`, `Sets`, `Blobs`, `FileLists`, `ImageDatas`, `sparse Arrays`, `Typed Arrays` or `other complex types`.

##### Example 1.2.2

```javascript
function test() {
  const user = {
    name: 'Kiran C Nayak',
    college: 'BMSCE',
    address: {
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  };

  const newUser = user;

  newUser.name = 'New Kiran';

  console.log(user.name);
  console.log(newUser.name);
}
```

Output of the above code will be

> New Kiran
>
> New Kiran

Nothing new here. Due to shallow copy, value is getting shared.

##### Example 1.2.3

```javascript
function test() {
  const user = {
    name: 'Kiran C Nayak',
    college: 'BMSCE',
    address: {
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  };

  const newUser = { ...user };

  newUser.name = 'New Kiran';

  console.log(user.name);
  console.log(newUser.name);
}
```

Output of the above code will be

> Kiran C Nayak
>
> New Kiran

This is the first way to clone an object. Why just `clone` and **`NOT Deep Clone`** ? Because, spread operator only copies the first level. See the following example.

##### Example 1.2.4

```javascript
function test() {
  const user = {
    name: 'Kiran C Nayak',
    college: 'BMSCE',
    address: {
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  };

  const newUser = { ...user };

  newUser.address.city = 'Mysuru';

  console.log(user.address.city);
  console.log(newUser.address.city);
}
```

Output of the above code will be

> Mysuru
>
> Mysuru

This is because, the spread operator did cloning in the first level, so it copied the reference for `address` property.

##### Example 1.2.5

```javascript
function test() {
  const user = {
    name: 'Kiran C Nayak',
    college: 'BMSCE',
    address: {
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  };

  const newUser = Object.assign({}, user);

  newUser.name = 'New Kiran';

  console.log(user.name);
  console.log(newUser.name);
}
```

Output of the above code will be

> Kiran C Nayak
>
> New Kiran

Another way to clone (Yes, **`NOT Deep Clone`**) the properties.

> :memo: NOTE: Before the spread operator syntax, it was `Object.assign()` that was being used. Now, all the places where `Object.assign()` is used, is being replaced with the newer Spread operator.

To do deep copy of the above code we can do the following:

##### Example 1.2.6

```javascript
function test() {
  const user = {
    name: 'Kiran C Nayak',
    college: 'BMSCE',
    address: {
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  };

  const newUser = JSON.parse(JSON.stringify(user));

  newUser.address.city = 'Mysuru';

  console.log(user.address.city);
  console.log(newUser.address.city);
}
```

Output of the above code will be

> Bengaluru
>
> Mysuru

As mentioned in the caveat towards to beginning of this page, it comes with a lot of exceptions. So, only if you know that the object will not have any of the complex object types as mentioned above, you can use this.

##### Example 1.2.7

```javascript
function test() {
  const testObj1 = {
    dateTime: new Date(),
  };

  const testObj2 = JSON.parse(JSON.stringify(testObj1));

  console.log(testObj1);
  console.log(testObj2);
}
```

Output of the above code will be

> { dateTime: 2023-09-16T15:37:37.669Z }
>
> { dateTime: '2023-09-16T15:37:37.669Z' }

A very subtle, but IMPORTANT note, is that `testObj1` is an object (Tautology 😒 DUH!), but `testObj2` has irreversibly become a string.

##### Example 1.2.8

```javascript
function test() {
  const testObj1 = {
    functionProp: console.log,
    infinityProp: undefined,
    notANumProp: NaN,
  };

  const testObj2 = JSON.parse(JSON.stringify(testObj1));

  console.log(testObj1);
  console.log(testObj2);
}
test();
```

Output of the above code will be

> {
>
> &nbsp;&nbsp;&nbsp;&nbsp;functionProp: [Function: log],
>
> &nbsp;&nbsp;&nbsp;&nbsp;infinityProp: Infinity,
>
> &nbsp;&nbsp;&nbsp;&nbsp;notANumProp: NaN
>
> }
>
> { infinityProp: null, notANumProp: null }

Here the `functionProp` is completely lost. `infinityProp` and `notANumProp` have wrongly become `null`.

##### Example 1.2.9

```javascript
function test() {
  const testObj1 = {
    fun1: console.log,
    fun2: undefined,
  };

  const testObj2 = JSON.parse(JSON.stringify(testObj1));

  console.log(testObj1);
  console.log(testObj2);
}
test();
```

Output of the above code will be

> { fun1: [Function: log], fun2: undefined }
>
> {}

This is even worse, that each of the properties has been removed and it has become an empty object.

All these examples are evidence to why we should not use Deep copy a lot.

## Why is JS using Shallow Copy by default ? Why not Deep copy ?

The answer is that since JS was designed initially to be run on the browser, it is constrained by memory that it can access. So the designers made shallow copy the default, and only consciously one must do deep copy, knowing fully well that a new memory is created separately.
