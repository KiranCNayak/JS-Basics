# `React` and `React Native` probable Interview Questions

## 1. If JS is interpreted, why does `Hoisting` work

JS compilation happens in 2 steps / runs. First, there is scanning for functions, variables and allocation of memory. Second, is where the actual execution of the code happens.

JS Engine is written in C++ (Example: Chrome's V8 Engine). They enable the two step compilation process for JS, and therefore give rise to concepts of Hoisting. In a way, Hoisting is due to the extra capability of the compiler / engine and not the stated objective of JS. [Similar Question on SO](https://stackoverflow.com/a/15014769/8500730).

## 2. var, let, const (Similarities and Differences)

Separately mentioned in the [Variables chapter](../1_1%20—%20Variables/variables.readme.md).

## Strongly typed vs Weakly typed languages

<div align="center">
  <table>
    <tr style="font-weight: bold;font-size: 20px; text-align: center">
      <td>Strongly Typed</td>
      <td> Weakly Typed</td>
    </tr>
    <tr>
      <td style="text-align: right">
        <span style="text-decoration-line: line-through;">
          Type checking at compile-time.
        </span>
      </td>
      <td>
        <span style="text-decoration-line: line-through;">
          Type is <span style="font-style: italic;font-weight: bold;">inferred</span> at run-time.
        </span>
      </td>
    </tr>
    <tr>
      <td colspan=2 style="text-align: center; font-weight: bold;">Both of the above explanations aren't related to Strongly / Weakly typed definitions.<br/>It is actually related to Static / Dynamic typed definitions.</td>
    </tr>
    <tr>
      <td style="text-align: right">
        Re-assignment of a variable of<br/>one type to another causes errors.
      </td>
      <td>
        It is generally allowed.
      </td>
    </tr>
    <tr>
      <td style="text-align: right">
        Ex: Adding a number to a string won't work
      </td>
      <td>
        It is allowed generally, with unexpected results.<br/>Ex: 1 + "23" will give "123", which wouldn't be<br/>allowed in a Strongly typed language.
      </td>
    </tr>
    <tr>
      <td style="text-align: right">
        Because of type checking they are a<br/>bit slower than weakly-typed languages.
      </td>
      <td>
        No type-check by default, so faster to compile.
      </td>
    </tr>
  </table>
</div>

IMPORTANT:
`Java` is static language is a strongly typed definition language (type-safe language)
`Python` is a dynamic language and is a strongly typed definition language (type-safe language)
`VBScript` is a dynamic language and is a weakly typed definition language (type-unsafe language)
`Javascript` is a dynamic language and is a weakly typed definition language (type-unsafe language)

One could give the example (wrongly) of Java to be weakly typed language by providing an example of

```java
String str = "Value is" + 123;
```

But in reality it is just a syntactic-sugar for its strongly typed twin.

```java
String s = "abc" + new Integer(123).toString()
```

## Why is JS weakly typed (Is there a reason why it was intentionally made weakly typed)

- JS was built to be read as-is by browsers for scripting on websites. This takes work away from developers by making decisions for them but at the cost of producing possibly erroneous results.

- JavaScript was created for the Internet, where all information is stored in strings. Even when you type a phone number or a birth year on a website, that information goes to the server as a string, not as a number. So the designers of the language decided that automatic type conversion is suitable and convenient.

> Spread operator
>
> Closures (Remember a real world example for this. It will be useful!)
>
> Shallow Copy and Deep Copy
>
> Advantages of JSX
>
> Class Components vs Functional Components (Pros & Cons)
>
> Promises vs async / await
>
> React.memo
>
> Hooks
>
> Custom Hooks
>
> (Difference between useState and useRef, and difference between useCallback and useMemo)
>
> When not to use Hooks
>
> Disadvantages of Hooks
>
> React.memo and others
>
> Context API
>
> Redux
>
> Implementation Question asked — return an object with frequency of all characters in a String
>
> Implementation Question asked — Implement infinite scroll in React Native as soon as user reaches the end of FlatList.
