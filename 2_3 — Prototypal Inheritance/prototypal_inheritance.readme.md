## 2.3 Prototypal Inheritance in JS

If you need to have `Inheritance based data initialization`, where common features go into the parent Prototype (similar to the one in `Java`), you can make use of Prototypal Inheritance that is already there in JS (by 'already' I mean, it existed before the concept of `class` was introduced in `ES6` specification).

Say you need a `Programmer` function that has methods and properties similar to `Person` without Inheritance, it would be implemented as given below:

```javascript
function Programmer(name, language) {
  this.name = name; // This is created as a property of Programmer (Obviously!)
  this.language = language;
}

Programmer.prototype.greet = function () {
  console.log(`Hi ${this.name}`);
};

Programmer.prototype.eat = function (food) {
  console.log(`Eating ${food}`);
};

Programmer.prototype.talk = function () {
  console.log('Talking');
};

Programmer.prototype.code = function () {
  console.log(`Coding in ${this.language} language`);
};
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
  Person.call(this, name); // Passing name as argument to initialize a new 'Person', but with 'Programmer' context
  this.language = language;
}
```

Now we need to setup the prototypes properly, making `Person` as the fallback prototype when `Programmer` prototype doesn't have a property / method that is being accessed on `Programmer`.

```javascript
function Programmer(name, language) {
  Person.call(this, name);
  this.language = language;
}

Programmer.prototype = Object.create(Person.prototype);

// IMPORTANT: You must initialize 'code' method on Programmer's prototype ONLY AFTER the previous line (that is after Object.create is invoked)
//  If you do it before, it will not have 'code' as a member method, as 'Object.create' overrides the content of Programmer.prototype.
Programmer.prototype.code = function () {
  console.log(`Coding in ${this.language} language`);
};
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
