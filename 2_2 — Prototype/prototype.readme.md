## 2.2 Prototype in JS

Consider you have to create a `person` object that holds `name` and some associated methods with it, similar to what is described below.

```javascript
let person = {};

person.name = 'Kiran';

person.greet = function () {
  console.log(`Hi ${this.name}!`);
};

person.talk = function () {
  console.log('Talking');
};

person.eatFood = function (food) {
  console.log(`Eating ${food}`);
};
```

If you need to make it a bit more re-usable, you should convert it into a function (basically an object factory / similar to a class in Java) and call it each time you need a new `Person`, as shown below.

```javascript
function Person(name) {
  let person = {};

  person.name = name;

  person.greet = function () {
    console.log(`Hi ${this.name}!`);
  };

  person.talk = function () {
    console.log('Talking');
  };

  person.eatFood = function (food) {
    console.log(`Eating ${food}`);
  };
  return person;
}

const personKiran = Person('Kiran');
const personKumar = Person('Kumar');
const personVarun = Person('Varun');
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

Now we are equipped enough to start talking about Prototypes.

In JS, every function has a property called `prototype`. We can make use of it to define all our shareable methods instead of having to create a separate object (like `personMethods`) ourselves.

```javascript
Person.prototype.greet = function () {
  console.log(`Hi ${this.name}`);
};

Person.prototype.talk = function () {
  console.log('Talking');
};

Person.prototype.eatFood = function (food) {
  console.log(`Eating ${food}`);
};

function Person(name) {
  let person = Object.create(Person.prototype);
  person.name = name;

  return person;
}

const personKiran = Person('Kiran');
```

There is one more optimization that can be done, which uses `new` keyword. If you use `new` keyword to initialize a person, then you wouldn't even have to create & return an object. `new` does it under the hood.

```javascript
Person.prototype.greet = function () {
  console.log(`Hi ${this.name}`);
};

Person.prototype.talk = function () {
  console.log('Talking');
};

Person.prototype.eatFood = function (food) {
  console.log(`Eating ${food}`);
};

// Since this function is invoked with the 'new' keyword, it is called a 'constructor' function
function Person(name) {
  this.name = name;
}

const personKiran = new Person('Kiran'); // Using 'new' makes it have all methods associated with 'Person' prototype.
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
