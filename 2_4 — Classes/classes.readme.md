## 2.4 Classes in JS (Introduced in `ES6` Specification)

Unlike C# and Java, classes in JS are just a syntactic sugar over the existing Prototypal inheritance.

Therefore, it is better to directly convert the existing code in `Prototypal Inheritance` to `Classes`.

**Given below is the existing code for `Person` constructor function**

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hi ${this.name}`);
};

Person.prototype.talk = function () {
  console.log('Talking');
};

Person.prototype.eatFood = function (food) {
  console.log(`Eating ${food}`);
};

const personKiran = new Person('Kiran');
const personKumar = new Person('Kumar');
const personVarun = new Person('Varun');
```

**`It changes to the following using Classes`**

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi ${this.name}`);
  }

  talk() {
    console.log('Talking');
  }

  eatFood(food) {
    console.log(`Eating ${food}`);
  }
}

const personKiran = new Person('Kiran');
const personKumar = new Person('Kumar');
const personVarun = new Person('Varun');
```

Similarly let us change the definition of Programmer constructor function as well.

**Given below is the existing code for `Programmer` constructor function**

```javascript
function Programmer(name, language) {
  Person.call(this, name);
  this.language = language;
}

Programmer.prototype = Object.create(Person.prototype);

Programmer.prototype.code = function () {
  console.log(`Coding in ${this.language} language`);
};

Programmer.prototype.constructor = Programmer;

const programmerKiran = new Programmer('Kiran', 'Javascript');
```

**`It changes to the following using Classes`**

```javascript
// Notice how similar this is to the Java code
//  even though concept is not same as in Java
class Programmer extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }

  code() {
    console.log(`Coding in ${this.language} language`);
  }
}

const programmerKiran = new Programmer('Kiran', 'Javascript');
```
