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
