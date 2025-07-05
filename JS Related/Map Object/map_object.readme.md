## 3.1 `Map` — Standard Object in JS

`Map` object in JS holds Key-Value pairs similar to an object. It is declared as follows.

```javascript
const mp = new Map();
```

`To add` K-V pairs we use the **`set`** `method`, by passing key and value as arguments.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');
```

`To get` the value use the **`get`** `method`, by passing key as argument.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

console.log(mp.get('firstName')); // Obviously prints 'Kiran'
```

`To get` the size of the map use **`size`** `property`. Re-iterating again, **`size`** is a `property`.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

console.log(mp.size); // Prints 2
```

`To see` if map has a `property` given in the argument, use the **`has`** method.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

console.log(mp.has('firstName')); // Prints true
console.log(mp.has('fullName')); // Prints false
```

`To delete` a K-V pair from the map, use **`delete`** method, by passing key as argument. It returns `true` if the `key` that was passed existed in the map, otherwise returns `false`.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

console.log(mp.delete('firstName')); // Prints true
console.log(mp.delete('fullName')); // Prints false
```

`To delete` all K-V pairs from the map, use **`clear`** method.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

mp.clear();

console.log(mp.size); // Prints 0
```

`To iterate` over K-V pairs, use **`forEach`** method of `Map`. It takes a function with 3 arguments where, **_`WEIRDLY`_**, `value` comes first, then the `key` and then the `map` on which it is iterating on. Each element is taken based on the **`INSERTION ORDER`**.

```javascript
function logMapElements(val, key, map) {
  console.log(`m[${key}] = ${val}`);
}
new Map([
  ['foo', 3],
  ['bar', {}],
  ['baz', undefined],
]).forEach(logMapElements);
```

Output of the above code will be

> `m[foo] = 3`
>
> `m[bar] = [object Object]`
>
> `m[baz] = undefined`

`To iterate` over K-V pairs, use **`for...of`** construct.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

for (let [key, value] of mp) {
  console.log(key + ': ' + value);
}
```

`To iterate` over K-V pairs, you can also use **`for...of`** construct on `entries()` method of `Map`, which returns a `map iterator` having `[key, value]` pair array for each element, in the **`INSERTION ORDER`**.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

for (let [key, value] of mp.entries()) {
  console.log(key + ': ' + value);
}
```

Output of `both` the above codes will be

> `firstName: Kiran`
>
> `lastName: Nayak`

`To iterate` over only the Keys, use **`for...of`** construct on `keys` method of map.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

for (let key of mp.keys()) {
  console.log(key);
}
```

Output of the above code will be

> `firstName`
>
> `lastName`

`To iterate` over only the Values, use **`for...of`** construct on `values` method of map.

```javascript
const mp = new Map();

mp.set('firstName', 'Kiran');
mp.set('lastName', 'Nayak');

for (let value of mp.values()) {
  console.log(value);
}
```

Output of the above code will be

> `Kiran`
>
> `Nayak`

##### Converting `Map` to `Array` and vice versa

```javascript
const personMap = new Map();

personMap.set('firstName', 'Kiran');
personMap.set('lastName', 'Nayak');

const personArray = Array.from(personMap);
```

```javascript
const personArray = [
  ['firstName', 'Kiran'],
  ['lastName', 'Nayak'],
];
const personMap = new Map(personArray);
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
