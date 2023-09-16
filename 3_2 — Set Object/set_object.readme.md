## 3.2 `Set` — Standard Object in JS

A `Set` object in JS stores **`UNIQUE`** values of any type. So no repetition of values.

To insert an element to a `Set`, use `add(<item>)` (This is different from the `set` method of `Map`).

Almost all the methods and properties are similar to `Map`, like `size`, `has(<item>)`, `delete(<item>)`, `clear()`, `forEach()`, `entries()`, `keys()`, `values()`.

> NOTE: `keys()` and `values()` in a `Set` return same values. Per MDN, `keys()` is an alias of `values()`

`To iterate` over the values of a `Set`, use **`for...of`** construct.

```javascript
const st = new Set();

st.add('Red');
st.add('Red'); // This element won't be inserted
st.add('Blue');
st.add('Green');
st.add('Yellow');

for (let value of st) {
  console.log(value);
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
const colorSet = new Set();

colorSet.add('Red');
colorSet.add('Blue');
colorSet.add('Green');
colorSet.add('Yellow');

const colorArray = [...colorSet];
```

```javascript
const colorArray = ['Red', 'Blue', 'Green', 'Yellow']; // It will also remove any duplicates, if present.
const colorSet = new Map(colorArray);
```
