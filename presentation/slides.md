---
theme: light-icons
colorSchema: dark
layout: intro
image: https://source.unsplash.com/collection/94734566/1920x1080
---

<div class="absolute left-5 top-10">
  Marcin Brzeziński, 12.04.2022
</div>
  
<div class="absolute top-5 right-5">
  <img src="/assets/typescript.svg" class="h-15"/>
</div>
  
<div class="absolute left-5 bottom-30">
  <h1>TypeScript Introduction</h1>
  <p>How to start with statically-typed JavaScript?</p>
</div>


---
layout: dynamic-image
image: https://source.unsplash.com/collection/94734566/1920x1080
equal: false
left: true
---

<h2 class="text-primary flex content-center pb-2">
  <light-icon icon="book mr-2"/>
  Table of contents
</h2>

0. Why TypeScript?
1. Basics
2. Complex types
3. Classes
4. Assertions, Narrowing
5. Generics
6. Types Manipulation
7. More on functions
8. Mixins
9. Decorators
10. Modules and namespaces
11. Declaration files
12. Build tools

<style>
ol {
  list-style: decimal;
}
</style>

---
layout: center-image
---

<h2 class="text-primary text-xl font-semibold">
  Clone the repo
</h2>

https://github.com/brzezinskimarcin/typescript-workshops

https://stackblitz.com/edit/typescript-lcbqt5?file=exercises/1-basics/index.ts

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  0. Why TypeScript?
</h2>

---
layout: default
---

<Header title="0. Why TypeScript?"/>

- JavaScript was initially developed as a simple scripting language
- Over time its use cases expanded significantly, from few lines of script on the webpage...
- ... to fully interactive web applications, web servers, etc.
  
Having language designed for quick uses with the intent to build full applications, results in some "quirks":

<div v-click="1">

- `==` (and other comparison operators) can be problematic:

</div>

<div class="grid grid-cols-2 gap-4">
<div v-click="2">

```ts
  '0' == 0  // -> true
  0  == [] // -> true
  '0' == [] // -> false, not transitive!
```

</div>
<div v-click="3">

```ts
  null == 0  // -> false
  null < 0 // -> false
  null <= 0 // -> true, different type conversions!
```

</div>
<div v-click="4">

```ts
  [] == ![]; // -> true, array is not an array!
  1 < 2 < 3 // -> true
  3 > 2 > 1 // -> false
```

<div v-click="6" class="mt-4"><span class="text-green-500">Easy!</span> We can use `===` instead.</div>

</div>
<div v-click="5">

```ts
const a = '0'
const b = 0
if (a) { console.log('test') } // > 'test'
a == b // -> true
if (b) { console.log('test') } // > nothing is printed!
```

</div>
</div>

---
layout: default
---

<Header title="0. Why TypeScript?"/>

- but other operators, like `+` or `-` can also be problematic

<div class="grid grid-cols-2 gap-4">
<div v-click>

```ts
[1, 2, 3] + [4, 5, 6] // -> '1,2,34,5,6'
```

</div>
<div v-click>

```ts
'b' + 'a' + + 'a' + 'a' // -> 'baNaNa'
```

</div>

<div v-click>

```ts
 3  - 1  // -> 2
 3  + 1  // -> 4
'3' - 1  // -> 2
'3' + 1  // -> '31'
```

</div>
<div v-click>

```ts
2 + 2 - 2 // -> 2
2 - 2 + 2 // -> 2
'2' + '2' - '2' // -> 20
'2' - '2' + '2' // -> '02'
```

</div>
<div v-click>

```ts
[] + [] // -> ''
{} + [] // -> 0
[] + {} // -> '[object Object]'
{} + {} // -> '[object Object][object Object]'
(!+[]+[]+![]).length // -> 9
```

</div>
<div v-click>

```ts
(+{} + [] + +!![] / +![])[+!![] + [+[]]] +
([] + {})[+!![]] +
([][[]] + [])[!+[] + !![]] +
(![] + [])[+!![]]
// -> 'yoda'
```

</div>
</div>

<div v-click>

- what if we are using external libraries?

```ts
const date = faker.date.past() // is it javascript Date or is it a string in ISO format?
this.$cookies.set('termsAccepted', true, { expires: '3Y' }) // { expires: '3Y' } or just '3Y'?
```
</div>

<!--

clicks: 3

Let's imagine instead of string '3' we have a variable amount coming from some user input, and instead of number 1 we have a variable called taxes. If we don't convert user input to number, we will end up with wrong value!

clicks: 7

Last (cookies) example comes from GRT.
-->

---
layout: default
---

<Header title="0. Why TypeScript?"/>

- accessing or writing to `undefined` properties

<div class="grid grid-cols-1 gap-4">
<div>

```ts
const rectangle = { width: 10, height: 15 };
const area = rectangle.widht * rectangle.height; // -> NaN, there is a typo!
```

</div>
<div>

```ts
const product = {
  name: 'Shovel',
  price: 20,
  quantity: 20
};
const updated = { propertyName: 'price', value: 35 };
product[updated.propertyname] = updated.value; // -> again typo!
// {
//   name: 'Shovel',
//   price: 20,
//   quantity: 20,
//   undefined: 35
// }
```

</div>
</div>

<!--
ESLint accepts all presented snippets (except from '{} + []' and '{} + {}').

And these are only small code snippets. Realworld applications contain thousands lines of code, can be developed by multiple developers simultaneously, it can be much harder to reason about these problems on such a big scale!
-->

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  1. Basics
</h2>

---
layout: default
---

<Header title="1. Basics"/>

| | |
|----------:|:------|
| TypeScript | superset of Javascript |
| Compiler | static type-checker |
| Compilation | type-checking and ereasing type annotations |

**TypeScript does not change the runtime behavior of our code!**

<div class="grid grid-cols-2 gap-4">
<div>

```ts
const rectangle = { width: 10, height: 15 };
const area = rectangle.widht * rectangle.height;
```

<div class="text-red-500 text-xs">Property 'widht' does not exist on type '{ width: number; height: number; }'. Did you mean 'width'?</div>

</div>
<div>

```ts
'2' - '2'
```

<div class="text-red-500 text-xs">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</div>
<div class="text-red-500 text-xs">The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</div>
</div>
<div>

```ts
1 < 2 < 3
```

<div class="text-red-500 text-xs">Operator '&lt;' cannot be applied to types 'boolean' and 'number'.</div>
</div>
<div>

```ts
[1, 2, 3] + [4, 5, 6]
```

<div class="text-red-500 text-xs">Operator '+' cannot be applied to types 'number[]' and 'number[]'.</div>
</div>
</div>

<!--
TypeScript is just a runtime JavaScript with compile-time type checker.

That strict rule of not altering the runtime  behavior makes upgrade js -> ts much easier and smoother. 

JavaScript is always emitted, even if type error ocurred. To prevent this, you can set "noEmitOnError" option in the compiler options.

You can't learn TypeScript without learning JavaScript!
-->

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">TypeScript introduces contextual, structural, gradual type system.</div>

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">TypeScript introduces <span class="text-green-500">contextual</span>, structural, gradual type system.</div>

<div v-click>

- you can explicitly put type annotations...

```ts
const x: number = 0;
```
</div>

<div v-click>

- ... but compiler often is able to infer types from the context!

```ts
const x = 0; // x: number;
const arr = [1, 2, 3]; // x: number[];
const sum = arr.reduce((a, b) => a + b, 0); // sum, a, b: number;
const strings = arr.map((i) => i.toString(), 0); // i: number; strings: string[];
const todo = { value: 'Go to a gym', modified: new Date() } // todo: { value: string; modified: Date; };
window.onmousedown = function (mouseEvent) { // mouseEvent: MouseEvent;
  console.log(mouseEvent.button);
};
```
</div>

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">TypeScript introduces contextual, <span class="text-green-500">structural</span>, gradual type system.</div>

<div v-click>

- types determined based on the structure
</div>
<div v-click>

- duck typing...
  
*"If it walks like a duck and it quacks like a duck, then it must be a duck"*

```ts
class Duck {
  swim() {}
}

class Whale {
  swim() {}
}

let duck: Duck = new Whale(); // -> no error!
duck.swim();
```
<!--
Python developers should feel at home: it's almost like "duck typing".

In Java or other language with nominative typing it would be an error, because in that type system types are determined by explicit declarations or names.
-->

</div>

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">TypeScript introduces contextual, <span class="text-green-500">structural</span>, gradual type system.</div>

- types determined based on the structure
- duck typing...
  
*"If it walks like a duck and it quacks like a duck, then it must be a duck"*

```ts
class Duck {
  swim() {}
  fly() {}
}

class Whale {
  swim() {}
}

let duck: Duck = new Whale(); // -> Property 'fly' is missing in type 'Whale' but required in type 'Duck'.
duck.swim();
```

- but static!

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">TypeScript introduces contextual, structural, <span class="text-green-500">gradual</span> type system.</div>

<div v-click>

- whenever compiler is able to tell what the type of an expression should be, it performs type checking...
</div>
<div v-click>

- ... but if not it uses a special type `any`, that turns off type checking

```ts
const arr = []; // arr: any[];
arr.push(1);
arr.push('oh no');
arr.push({ anything: null });

const x: any; // x: any; 
x.push(1);
x + 2;
x.property;
```
</div>
<div v-click>

- it means we can convert our non-type-safe javascript code to type-safe typescript code gradually
</div>
<!--
clicks: 2

with "noImplicitAny": false in tsconfig.json we need to explicitly annotate arr: any[] 

clicks: 3

any basically turns off the type checker for all parts of the code using this variable, so use it with caution!

-->

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">Javascript primitives:</div>

- `number`
- `bigint`
- `string`
- `boolean`
- `symbol`
- `null`
- `undefined`
```ts
let decimal = 6;       // decimal: number;
let hex = 0xf00d;      // hex: number;
let big = 100n;        // big: bigint;
let align = 'left';    // align: string;
let isDone = false;    // isDone: boolean;
let symbol = Symbol(); // symbol: Symbol;
let undef = undefined; // undef: undefined;
let n = null;          // n: null;
```

---
layout: default
---

<Header title="1. Basics"/>
<div class="grid grid-cols-1 gap-2">
<div>
<div class="mb-2">Literal types:</div>

```ts
let align = 'left'; // align: string;
```

</div>
<div v-click>
<div class="mb-2">But defining constant:</div>

```ts
const align = 'left'; // align: 'left';
align = 'right' // -> Cannot assign to 'align' because it is a constant.
const b = 0 // b: 0;
const a = false // a: false;
```

</div>
<div v-click>
<div class="mb-2">However:</div>

```ts
const req = { url: 'https://example.com', method: 'GET' }; // { url: string; method: string }
req.method = 'RANDOM' // -> OK
```

</div>
<div v-click>
<div class="-mt-4 -mb-2">

Solution? `as const`:

</div>

```ts
const req = { url: 'https://example.com', method: 'GET' } as const; // { url: 'https://example.com'; method: 'GET' }
req.method = 'RANDOM' // -> Error
```

</div>

<div v-click>Right now, these types seem not to be valuable, but soon you'll find out they can be really useful!</div>
</div>

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">Functions</div>

<div>

```ts
function logger(info: string) {
  console.log(`LOG ${new Date().toISOString()}: ${info}`);
}
```
</div>
<div v-click class="mt-4">

```ts
function add(a: number, b: number): number {
  return a + b;
}

const add = function (a: number, b: number) {
  return a + b;
}

const add = (a: number, b: number) => a + b;
```
</div>
<div v-click class="mt-4">

```ts
const add: (arg1: number, arg2: number) => number = (a: number, b: number) => a + b;

function accumulate(arr: number[], adder: (a: number, b: number) => number) {
  return arr.reduce(adder, 0);
}
```
</div>

<!-- clicks: 2

array type: number[]
-->

---
layout: default
---

<Header title="1. Basics"/>
<div class="mb-2">TypeScript specific types:</div>

- `any` -> you can use whenever you don’t want a particular value to cause typechecking errors

<div v-click>

- `void` -> you can only assign `null` and `undefined`, typical use case: function returns nothing
```ts
function doNothing(): void {}
let a = doNothing();
a + 2; // -> Operator '+' cannot be applied to types 'void' and 'number'.
```
</div>
<div v-click>

- `unknown` -> works as "top" type, it basically means "I don't know anything about what type it is"
```ts
let a: unknown = { some_property: 'some_value' };
a = 2; // OK: a is 'unknown', so we can assign value of any type to it.
a - 2; // -> Object is of type 'unknown'.
```
</div>
<div v-click>

- `never` -> works as "bottom" type, it basically means "The value of such type should never occur"
```ts
let a: never = 5; // -> Type 'number' is not assignable to type 'never'.
function throwError(): never { // OK: function immediately throws an error so it never reaches end point.
  throw new Error();
}
function doNothing(): never {} // -> A function returning 'never' cannot have a reachable end point.

```
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/1-basics.ts
</h2>















---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  2. Complex types
</h2>

---
layout: default
---

<Header title="2. Complex types"/>
Objects
<div v-click>

- object -> refers to any value that is not primitive
```ts
let obj: object = {}; // obj: object;
obj.hasOwnProperty('a'); // OK
obj.a; // -> Property 'a' does not exist on type 'object'.
obj = 'asd' // -> Type 'string' is not assignable to type 'object'.
```
</div>
<div v-click>

- object literal -> simply list its properties and (optionally) their types
```ts
function printPoint(point: { x: number; y: number }) {
  console.log(`(${point.x}, ${point.y})`);
}
const point = { x: 3, y: 7 };
printPoint(point);
```
</div>
<div class="grid grid-cols-2 gap-4">
<div v-click>

We should consider it as "constraint", so this code also works fine:
```ts
const point3d = { x: 3, y: 7, z: 5 };
printPoint(point3d);
```

</div>

<div v-click>

Interesting consequence: **empty type**
```ts
const empty1: {} = { x: 3, y: 7, z: 5 };
const empty2: {} = { };
const empty3: {} = 123;
const empty4: {} = null;
// -> Type 'null' is not assignable to type '{}'.
```

</div>
</div>

---
layout: default
---

<Header title="2. Complex types"/>
<div class="mb-2">Type aliases</div>

<div class="mb-2">Listing object properties each time can become inconvenient...</div>

```ts
function distance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

<div class="grid grid-cols-2 gap-4 mt-2">
<div v-click>
<div class="mb-2">So we can define type aliases...</div>

```ts
type Point = {
  x: number;
  y: number;
}

function distance(p1: Point, p2: Point) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```
</div>

<div v-click>
<div class="mb-2">... with two possible ways</div>

```ts
interface Point {
  x: number;
  y: number;
}

function distance(p1: Point, p2: Point) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

</div>
</div>

<div class="text-center mt-2" v-click>What's the difference? Soon we will find out.</div>

---
layout: default
---

<Header title="2. Complex types"/>
<div class="mb-2">Unions:</div>

<div class="grid grid-cols-1 gap-4">
<div v-click>

```ts
function printUserId(id: number | string) {
  console.log(`User id: ${id}`);
}
printUserId(101);
printUserId('202');
printUserId(null); // -> Argument of type 'null' is not assignable to parameter of type 'string | number'.
```

</div>
<div v-click>

```ts
interface Bird {
  fly(): void;
  layEggs(): void;
}
 
interface Fish {
  swim(): void;
  layEggs: () => void;
}
 
function foo(pet: Fish | Bird) {
  pet.layEggs(); // OK
  pet.swim(); // Property 'swim' does not exist on type 'Bird | Fish'. Property 'swim' does not exist on type 'Bird'.
};
```
</div>
</div>

<!--

clicks: 2

Side note: `layEggs(): void;` alternative way of defining function -->

---
layout: default
---

<Header title="2. Complex types"/>

<div class="grid grid-cols-2 gap-4">
<div>

We can narrow the union type using javascript `typeof` operator:

```ts
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()); // id: string;
  } else {
    console.log(id); // id: number;
  }
}
```

<div v-click="2">

Optional (`?`) operator `<type> | undefined`:

```ts
function printId(id?: number) {
  console.log(id); // id: number | undefined;
}

interface NetworkError {
  error?: string; // error: string | undefined;
}
```
</div>

</div>
<div v-click="1">
<div class="mb-2">Or we can finally use our string literals:</div>

```ts
interface Loading {
  state: 'loading';
};
interface Failed {
  state: 'failed';
  code: number;
};
interface Success {
  state: 'success';
  response: { data: string; };
};
type NetworkState = Loading | Failed | Success;
function logger(state: NetworkState): string {
  switch (state.state) {
    case 'loading': // state: Loading;
      return 'Downloading...';
    case 'failed': // state: Failed;
      return `Error ${state.code} downloading`;
    case 'success': // state: Success;
      const { data } = state.response;
      return `Downloaded ${data}`;
  }
}
```
</div>
</div>

<!-- clicks: 1

By switching on state, TypeScript can narrow the union down in code flow analysis -->

---
layout: default
---

<Header title="2. Complex types"/>
<div class="mb-2">Intersections - symmetric to unions</div>

```ts
interface CreateArtistBioBase {
  artistID: string;
  thirdParty?: boolean;
}
type BioFormat = { html: string } | { markdown: string };
type CreateArtistBioRequest = CreateArtistBioBase & BioFormat;

const correctRequest: CreateArtistBioRequest = {
  artistID: 'banksy',
  markdown: 'Banksy is an anonymous England-based graffiti artist...',
}; // OK

const badRequest: CreateArtistBioRequest = {
  artistID: 'banksy',
}; // -> Property 'markdown' is missing in type '{ artistID: string; }' but required in type '{ markdown: string; }'.

const badRequest2: CreateArtistBioRequest = {
  markdown: 'banksy',
}; // -> Property 'artistID' is missing in type '{ markdown: string; }' but required in type 'CreateArtistBioBase'.
```

---
layout: default
---

<Header title="2. Complex types"/>
<div class="grid grid-cols-2 gap-4">
<div class="col-span-2">

<div class="mb-2">Tuples - fixed-length arrays</div>

```ts
type Point = [number, number];
function print(coordinates: Point) {
  console.log(coordinates); // -> 1,3
  const [x, y] = coordinates; // They behave just like arrays
  console.log(`Provided coordinates - x: ${x}, y: ${y}`);
  const z = coordinates[3]; // -> Tuple type 'Point' of length '2' has no element at index '3'.
}
```

</div>
<div v-click>
<div class="mb-2">Can be optional...</div>

```ts
type Either2dOr3d = [number, number, number?];
function foo(coordinates: Either2dOr3d) {
  const [x, y, z] = coord; // z: number | undefined;
}
```

</div>
<div v-click>
<div class="mb-2">... and even use rest elements!</div>

```ts
type Str_Num_Bools = [string, number, ...boolean[]];
type Str_Bools_Num = [string, ...boolean[], number];
type Bools_Str_Num = [...boolean[], string, number];
```

</div>
</div>

---
layout: default
---

<Header title="2. Complex types"/>

Differences between `interface` and `type`:

<table>
<thead>
<tr>
<th>diff</th>
<th>interface</th>
<th>type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

primitives

</td>
<td>

```ts
interface Name {}; // -> ❌ Impossible to define!
interface Pair {}  // -> ❌ Impossible to define!
```

</td>
<td>

```ts
type Name = string;           // -> ✔️
type Pair = [number, number]; // -> ✔️
```

</td>
</tr>

<tr v-click>
<td>

unions

</td>
<td>

```ts
interface Info {} // -> ❌ Impossible to define!
interface BioFormat { // -> ❌ Impossible to define!
  html?: string;
  markdown?: string;
}
const bio: BioFormat = {};
// -> OK
```

</td>
<td>

```ts
type Info = string | { name: string }; // -> ✔️
type BioFormat = // -> ✔️
  { html: string } |
  { markdown: string };

const bio: BioFormat = {};
// -> Type '{}' is not assignable to type 'BioFormat'.
```

</td>
</tr>
</tbody>
</table>

---
layout: default
---

<Header title="2. Complex types"/>

Differences between `interface` and `type`:

<table>
<thead>
<tr>
<th>diff</th>
<th>interface</th>
<th>type</th>
</tr>
</thead>
<tbody>

<tr>
<td>

extending

</td>
<td>

```ts
interface Animal {
  name: string;
}
interface Bear extends Animal {
  honey: boolean;
} // -> ✔️
```

</td>
<td>

```ts
type Animal = {
  name: string;
}
type Bear = Animal & { 
  honey: boolean;
} // -> ✔️
```

</td>
</tr>

<tr v-click>
<td>

errors

</td>
<td>

```ts
interface Bird { wings: 2; }
interface Owl extends Bird { nocturnal: true; }
const owl: Owl = { wings: 2 };
// -> Property 'nocturnal' is missing in type
// '{ wings: 2; }' but required in type
// 'Owl'. ✔️
```

</td>
<td>

```ts
type Bird = { wings: 2; };
type Owl = Bird & { nocturnal: true };
const owl: Owl = { wings: 2 };
// -> Property 'nocturnal' is missing in type
// '{ wings: 2; }' but required in type
// '{ nocturnal: true; }'. ❌
```

</td>
</tr>
</tbody>
</table>

---
layout: default
---

<Header title="2. Complex types"/>

Differences between `interface` and `type`:

<table>
<thead>
<tr>
<th>diff</th>
<th>interface</th>
<th>type</th>
</tr>
</thead>
<tbody>

<tr>
<td>

merging

</td>
<td>

```ts
interface Vue {
  readonly $el: Element;
  readonly $options: ComponentOptions<Vue>;
  // ...
  $destroy(): void;
}
interface Vue {
  $cookies: VueCookies;
} // -> ✔️
```

</td>
<td>

```ts
type Vue = {
  readonly $el: Element;
  readonly $options: ComponentOptions<Vue>;
  // ...
  $destroy(): void;
}
type Vue = {
  $cookies: VueCookies;
} // -> ❌ Duplicate identifier 'Vue'.
```

</td>
</tr>

</tbody>
</table>

<div v-click class="mt-4">There are also some differences related to generics which we will cover later.</div>
<div v-click class="flex mt-4">
<span class="text-green-500 mr-2">Good practice:</span> 
<div class="-mt-5">

Always use `interface` unless you need features from `type`.

</div>
</div>

<!-- clicks: 2

We can mix interfaces and types though. There is nothing wrong with "extending" type or creating union of interfaces. -->

---
layout: default
---

<Header title="2. Complex types"/>

<div class="mb-2 -mt-2">Property modifiers</div>

<div class="grid grid-cols-3 gap-4">
<div>
<div v-click="1" class="mb-4">
<div class="text-sm mb-2">optional modifier</div>

```ts
interface Opt {
  a?: string;
}
const x1: Opt = { };
const x2: Opt = { a: 'string' };
```

</div>
<div  v-click="3">
<div class="text-sm mb-2 -mt-2">assignability</div>

```ts
interface Person {
  name: string;
}
interface ReadonlyPerson {
  readonly name: string;
}
let wr: Person = {
  name: 'Person McPersonface'
};
let rd: ReadonlyPerson = wr;
console.log(rd.age); // prints '42'
wr.age++;
console.log(rd.age); // prints '43'
```
</div>
</div>
<div class="col-span-2">

<div v-click="2" class="mb-4">
<div class="text-sm mb-2">readonly modifier</div>

```ts
interface Home {
  readonly resident: {
    name: string;
    age: number
  };
}
const foo: Home = {
  resident: {
    name: 'Victor',
    age: 36
  }
};
foo.resident = {
  name: 'Victor',
  age: 42,
}; // -> Cannot assign to 'resident' because it is a read-only property.
foo.resident.age++; // -> OK
```
</div>
<div v-click="4">
<div class="text-sm mb-2 -mt-2">works on arrays and tuples too</div>

```ts
let readonlyArr: readonly string[] = [];
let readonlyPair: readonly [string, number] = ['a', 2];
```
</div>


</div>
</div>

---
layout: default
---

<Header title="2. Complex types"/>

<div class="mb-2 -mt-2">index signatures</div>

<div class="grid grid-cols-2 gap-2">
<div>

<div v-click="1">
<div class="text-sm mb-2">often we don't want to name keys</div>

```ts
interface StringDictionary {
  [index: string]: string;
}
const myDict: StringDictionary = { a: 'foo', b: 'bar' };
```
</div>
<div v-click="3" class="mt-2">
<div class="text-sm mb-2">modifiers work on index signatures</div>

```ts
interface ReadonlyStringArray {
  readonly [n: number]: string;
}
```
</div>
<div v-click="4" class="mt-2">
<div class="text-sm mb-2">you can put multiple indexed signatures</div>

```ts
interface Foo {
  [n: string]: string;
  [n: number]: number; // -> 'number' index type 'number'
  // is not assignable to 'string' index type 'string'.
}
```
</div>
<div v-click="6" class="mt-2">
<div class="text-sm mb-2">symbol and string do not have intersection</div>

```ts
interface F { [n: string]: string; [n: symbol]: symbol; }
```
</div>
</div>
<div>
<div v-click="2">
<div class="text-sm mb-2">you can add named keys, but types must match!</div>

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // OK
  name: string; // OK
  valid: boolean; // -> Property 'valid' of type 
  // 'boolean' is not assignable to 'string' index type
  // 'string | number'.
}
```
</div>
<div v-click="5" class="mt-2">
<div class="text-sm mb-2">in JS you can access numeric properties with string syntax...</div>


```ts
interface Foo2 {
  [n: string]: string | number; [n: number]: number;
}
const foo: Foo2 = {
    a: 'foo', // OK
    0: 1, // OK
    1: 'a', // Error
    '2': 'a', // Error!
}
const a = foo[0]; // 'a';
const b = foo['0']; // 'a';
```
</div>
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/2-complex-types.ts
</h2>














---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  3. Classes
</h2>

---
layout: default
---

<Header title="3. Classes"/>

<div class="grid grid-cols-2 gap-4">
<div>

<div class="text-sm mb-2">we can declare and initialize fields</div>

```ts
class Point {
  x = -1;
  y: number;
}
 
const pt = new Point();
pt.x = 0;
pt.y = 0;
```
</div>
<div v-click>
<div class="text-sm mb-2">strictPropertyInitialization</div>

```ts
class BadGreeter {
  name: string; // -> Property 'name' has no initializer
  // and is not definitely assigned in the constructor.
}
class OKGreeter {
  // Not initialized, but no error
  name!: string;
}
```
</div>
<div v-click>
<div class="text-sm mb-2 -mt-2">we can use modifiers</div>

```ts
class Greeter {
  readonly name: string = 'world';

  constructor(name: string) {
    this.name = name;
  }
 
  err() {
    this.name = 'not ok'; // -> Cannot assign to 'name'
    // because it is a read-only property.
  }
}
```
</div>
<div v-click>
<div class="text-sm mb-2 -mt-2">getters and setters</div>

```ts
class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }
 
  set size(value: string | number | boolean) {
    let num = Number(value);
    this._size = num;
  }
}
```
</div>
</div>

<!-- clicks: 1

The strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor.

clicks: 2

There are just two differences between class constructor signatures and function signatures:

Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later

Constructors can’t have return type annotations - the class instance type is always what’s returned

clicks: 3

TypeScript has some special inference rules for accessors:

If get exists but no set, the property is automatically readonly

If the type of the setter parameter is not specified, it is inferred from the return type of the getter

Getters and setters must have the same Member Visibility
-->

---
layout: default
---

<Header title="3. Classes"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm mb-2">we can implement interface(s)</div>

```ts
interface Checkable {
  check(name: string): boolean;
}
 
class NameChecker implements Checkable {
  check(name) { // -> s: any;
    return name.toLowerCase() === "ok";
  }
}
```
</div>
<div v-click="2" class="row-span-2">
<div class="text-sm mb-2">extend from base class</div>

```ts
class Base {
  greet() {
    console.log('Hello, world!');
  }
}

class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d = new Derived();
d.greet();
d.greet('reader');
```
</div>
<div v-click="1">
<div class="text-sm mb-2 -mt-2">`implements` only type-checks, doesn't change the type!</div>

```ts
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10; // -> Property 'y' does not exist on type 'C'.
```
</div>
</div>

---
layout: default
---

<Header title="3. Classes"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm mb-2 -mt-2">type-only field declarations</div>

```ts
interface Animal {
  dateOfBirth: any;
}
 
interface Dog extends Animal {
  breed: any;
}
 
class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}
 
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}
```
</div>
<div>
<div v-click>
<div class="text-sm mb-2 -mt-2">member visibility - protected</div>

```ts
class Greeter {
  public greet() {
    console.log(`Hello, ${this.getName()}`);
  }
  protected getName() { return 'name'; }
}
class SpecialGreeter extends Greeter {
  public howdy() {
    console.log(`Howdy, ${this.getName()}`);
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName(); // -> Error
```
</div>
<div v-click class="mt-4">
<div class="text-sm mb-2 -mt-2">subclass can change visibility</div>

```ts
class Base {
  protected m = 10;
}
class Derived extends Base {
  m = 15;
}
const d = new Derived(); console.log(d.m); // OK
```
</div>
</div>
</div>

<!--clicks: 0

In JavaScript class fields are initialized after the parent class constructor completes, overwriting any value set by the parent class.

This can be a problem when you only want to re-declare a more accurate type for an inherited field.

To handle these cases, you can write declare to indicate to TypeScript that there should be no runtime effect for this field declaration.
-->

---
layout: default
---

<Header title="3. Classes"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm mb-2 -mt-2">member visibility - private</div>

```ts
class Base {
  private x = 0;
}
const b = new Base();
console.log(b.x); // -> Property 'x' is private and only
// accessible within class 'Base'.
```
</div>
<div v-click="4" class="mt-4">
<div class="text-sm mb-2 -mt-2">static fields - limitations on name</div>

```ts
class S {
  static name = 'foo'; // -> Static property 'name'
  // conflicts with built-in property 'Function.name' of
  // constructor function 'S'.
}
```
</div>
<div v-click="5" class="mt-4">
<div class="text-sm mb-2 -mt-2">no static classes - they're not needed</div>

```ts
class MyStaticClass {
  static doSomething() {}
}
const MyStaticObject = {
  dosomething() {},
};
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm mb-2 -mt-2">private just on type level</div>

```ts
class MySafe {
  private secretKey = 12345;
}
const s = new MySafe();
console.log(s.secretKey); // -> Property 'secretKey' is
// private and only accessible within class 'MySafe'.
console.log(s['secretKey']); // OK
```
</div>
<div v-click="2" class="mt-4">
<div class="text-sm mb-2 -mt-2">"private" vs "#"</div>

```ts
class MySafe {
  #secretKey = 12345;
}
```
</div>
<div v-click="3" class="mt-4">
<div class="text-sm mb-2 -mt-2">static fields</div>

```ts
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
```
</div>
</div>
</div>

---
layout: default
---

<Header title="3. Classes"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm mb-2 -mt-2">"this" can give a headache</div>

```ts
class MyClass {
  name = 'MyClass';
  getName() { return this.name; }
}
const c = new MyClass();
const getName = c.getName;
console.log(getName()); // runtime error
```
</div>
<div v-click="2" class="mt-4">
<div class="text-sm mb-2 -mt-2">"this" argument removed during compilation</div>

```ts
class MyClass {
  name = 'MyClass';
  getName(this: MyClass) { return this.name; }
}
const c = new MyClass();
const getName = c.getName;
console.log(getName()); // The 'this' context of type
// 'void' is not assignable to method's 'this' of type
// 'MyClass'.
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm mb-2 -mt-2">solution - arrow function?</div>

```ts
class MyClass {
  name = 'MyClass';
  getName = () => { return this.name; };
}
const c = new MyClass();
const getName = c.getName;
console.log(getName()); // MyClass
```
</div>
<div v-click="3" class="mt-4">
<div class="text-sm mb-2 -mt-2">can be used as any other type, in paremeters, returns, etc.</div>

```ts
class Box {
  val: string = '';
  sameAs(b: this) { return b.val === this.val; }
}
```
</div>
<div v-click="4" class="mt-4">
<div class="text-sm mb-2 -mt-2">shorthand for class fields in constructor</div>

```ts
class Params {
  constructor(readonly x: number, private y: number) {}
}
const a = new Params(1, 2);
console.log(a.x);
console.log(a.y); // -> Property 'y' is private ...
```
</div>
</div>
</div>

---
layout: default
---

<Header title="3. Classes"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm mb-2 -mt-2">class expression</div>

```ts
const someClass = class {
  content: string;
  constructor(value: string) {
    this.content = value;
  }
};
const m = new someClass('Hello, world');
```
</div>
<div v-click="2" class="mt-4">
<div class="text-sm mb-2 -mt-2">we have to implement abstract methods</div>

```ts
class Derived extends Base {} // Non-abstract class
// 'Derived' does not implement inherited abstract member
// 'getName' from class 'Base'.
```
</div>
<div v-click="4" class="mt-4">
<div class="text-sm mb-2 -mt-2">solution - construct signature</div>

```ts
function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);
greet(Base); // -> Cannot assign an abstract constructor
// type to a non-abstract constructor type.
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm mb-2 -mt-2">abstract class</div>

```ts
abstract class Base {
  abstract getName(): string;
  printName() {
    console.log(`Hello, ${this.getName()}`);
  }
}
const b = new Base(); // -> Cannot create an instance of
// an abstract class.
```
</div>
<div v-click="3" class="mt-4">
<div class="text-sm mb-2 -mt-2">use abstract class with constructor</div>

```ts
function greet(ctor: typeof Base) {
  const instance = new ctor(); // -> Cannot create an
  // instance of an abstract class.
  instance.printName();
}
greet(Base);
```
</div>
<div v-click="5" class="mt-4">
<div class="text-sm mb-2 -mt-2">structural typing - again</div>

```ts
class Person { name: string; }
class Employee { name: string; salary: number; }
const p: Person = new Employee(); // OK
```
</div>
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/3-classes.ts
</h2>















---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  4. Assertions, Narrowing
</h2>

---
layout: default
---

<Header title="4. Assertions, Narrowing"/>

<div class="grid grid-cols-1 gap-2">
<div>
<div class="mb-2">Type assertions:</div>

```ts
const input = document.querySelector('.input'); // input: Element | undefined;
if (input) { // input: Element;
  input.value = 'test'; // -> Property 'value' does not exist on type 'Element'.
}
```
</div>
<div v-click>
<div class="mb-2">But we know it is input element!</div>

```ts
const input = document.querySelector('.input') as HTMLInputElement; // input: HTMLInputElement;
input.value = 'test'; // -> OK
```
</div>
<div v-click>
<div class="mb-2">"!" as shortcut for assertion of removing "undefined" and "null":</div>

```ts
const input = document.querySelector('input'); // input: Element | undefined;
if (input) { // input: Element;
  const tagName1 = input.tagName;
}
const tagName2 = (document.querySelector('input') as Element).tagName;
const tagName3 = document.querySelector('input')!.tagName;
```
</div>
<div v-click>
<div class="mb-2">to allow "impossible" coercions, we can assert to `unknown` first:</div>



```ts
const str = ('hello' as unknown) as number;
```
</div>
</div>

<!-- clicks: 3
TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercion like

const str = ('hello' as unknown) as number;

Sometimes this rule can be too conservative and will disallow more complex coercion that might be valid. If this happens, you can use two assertions, first to any or unknown, then to the desired type. Brackets are optional.
-->

---
layout: default
---

<Header title="4. Assertions, Narrowing"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="mb-2">Type narrowing - "typeof"</div>

```ts
function getId(id: number | string) {
  if (typeof id === 'string') { // id: string;
    console.log(id.toUpperCase()); 
  } else { // id: number;
    console.log(id); 
  }
}
```
</div>
<div v-click>
<div class="mb-2">Type narrowing - "truthiness"</div>

```ts
function getUsersOnlineMessage(numUsersOnline?: number) {
  if (numUsersOnline) { // numUsersOnline: number;
    return `There are ${numUsersOnline} online now!`;
  }
  return 'Nobody is here. :(';
}
```
</div>
<div v-click>
<div class="mb-2">Type narrowing - "equality"</div>

```ts
function foo(x: string | number, y: string | boolean) {
  if (x === y) { // x: string, y: string;
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}
```
</div>
<div v-click>
<div class="mb-2">Type narrowing - "instanceof"</div>

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) { // x: Date;
    console.log(x.toUTCString());
  } else { // x: string;
    console.log(x.toUpperCase());
  }
}
```
</div>
</div>
<!-- clicks: 0

typeof: "string", "number", "boolean", "bigint", "symbol", "undefined", "object", "function" 

clicks: 1

This analysis of code is not only based on programming constructs, but also uses control flow analysis, to narrow types as it encounters type guards and assignments.

clicks: 3

For all variables constructible using "new" keyword (so for classes) we can use instanceof operator.
-->

---
layout: default
---

<Header title="4. Assertions, Narrowing"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm mb-2 -mt-2">Type narrowing - "in"</div>

```ts
interface Fish { swim(): void };
interface Bird { fly(): void };
function move(animal: Fish | Bird) {
  if ('swim' in animal) { // animal: Fish;
    return animal.swim();
  }
  return animal.fly(); // animal: Bird;
}
```

<div v-click="2">
<div class="text-sm my-2">Type predicates also work on `this`</div>

```ts
class BoxedNumber {
  constructor(public value?: number) {}
  hasValue(): this is { value: number } {
    return this.value !== undefined;
  }
}
const box = new BoxedNumber(2);
if (box.hasValue()) {
  box.value; // box.value: number;
}
```
</div>
</div>
<div v-click="1">
<div class="text-sm mb-2 -mt-2"><div class="text-green-500">Custom type narrowing - type predicates!</div></div>

```ts
interface Fish {
  swim(): void
};
interface Bird {
  fly(): void
};
function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}
function move(animal: Fish | Bird) {
  if (isFish(animal)) { // animal: Fish;
    return animal.swim();
  }
  return animal.fly(); // animal: Bird;
}
```
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/4-assertions-narrowing.ts
</h2>














---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  5. Generics
</h2>

---
layout: default
---

<Header title="5. Generics"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm mb-2 -mt-2">TS has generic types:</div> 

```ts
function identity<T>(x: T) {
  return x;
}
const identity = <T>(x: T) => x;
```
<div v-click="2">
<div class="text-sm my-2">We can put generics on classes...</div> 

```ts
class Additive<T> {
  zero!: T;
  add!: (x: T, y: T) => T;
}

const num = new Additive<number>();
num.zero = 0;
num.add = (x, y) => x + y;

const str = new Additive<string>();
str.zero = '';
str.add = (x, y) => x + y;
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm mb-2 -mt-2">We've already seen and used generics!</div> 

```ts
const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [4, 5, 6];
```
</div>
<div v-click="3">

<div class="text-sm my-2">... and on type and interface too!</div>

```ts
interface Array<T> {
  length: number;
  // ...
  push(...items: T[]): number;
  pop(): T | undefined;
}

const arr: number[] = [1, 2, 3];
arr.push(4, 5, 6);
arr.pop();
console.log(arr.length);

type Ref<T> = { value: T };
const strRef: Ref<string> = { value: 'str' };
```
</div>
</div>
</div>

<!-- clicks: 0

Second way will not work in .tsx files. Workaround: `<T, >` or `<T extends unknown>` --> 

---
layout: default
---

<Header title="5. Generics"/>

<div class="grid grid-cols-1 gap-2">
<div>
<div class="text-sm mb-2 -mt-2">We can have multiple generics:</div>

```ts
function map<T, U>(arr: T[], callbackfn: (value: T, index: number) => U): U[] {
  const res: U[] = [];
  arr.forEach((elm, i) => res.push(callbackfn(elm, i)));
  return res;
}
const arr1 = ['a', 'aa', 'aaa']; // arr1: string[];
const arr2 = map<string, number>(arr1, (i) => i.length); // arr2: number[];
```

</div>
<div v-click>
<div class="text-sm mb-2 -mt-2">and reuse generics inside interfaces or types:</div>

```ts
interface Array<T> {
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initial: U): U;
}
```

</div>

<div v-click>
<div class="text-sm mb-2 -mt-2">provide defaults...</div>

```ts
type Maybe<T = number> = T | undefined;
const maybeNumber: Maybe = 5;
const maybeString: Maybe<string> = undefined;
```

</div>
<div v-click>

<div class="text-sm mb-2 -mt-2">type parameters in static members</div>

```ts
class Box<Type> {
  static defaultValue: Type; // -> Static members cannot reference class type parameters.
}
```
</div>
</div>

<!-- clicks: 0

It's worth mentioning that thanks to typescript type inference we don't need to explicitly provide types for generics! -->

---
layout: default
---

<Header title="5. Generics"/>

<div class="grid grid-cols-2 gap-2">
<div class="col-span-2">
<div class="mb-2">... and put constraints (extends)</div>

```ts
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T) {
  return arg.length;
}

const arrayLength = getLength([1, 2, 3, 4]);
const strLength = getLength('Schneider');
getLength({}); // -> Property 'length' is missing in type '{}' but required in type 'Lengthwise'.
  
```

</div>
<div v-click>
<div class="mb-2">Factory pattern (used in mixins)</div>

```ts
class Animal {
  numLegs: number = 4;
}
class Bee extends Animal {
  fly() {};
}
class Tiger extends Animal {
  roar() {};
}
```

</div>
<div v-after>
<div class="mb-2">&nbsp;</div>

```ts
type Constructor<T> = {
  new(): T;
}
function create<T extends Animal>(c: Constructor<T>): T {
  return new c();
}
create(Tiger).roar();
create(Bee).fly();
```

</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/5-generics.ts
</h2>















---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  6. Types Manipulation
</h2>

---
layout: default
---

<Header title="6. Types Manipulation"/>

<div class="mb-2 -mt-2">We have already seen one way of defining types from other types - generics. But there is more!</div>
<div v-click="1">

- `keyof` operator

<div class="grid grid-cols-2 gap-4">
<div>

```ts
type Point = { x: number; y: number };
type P = keyof Point; // 'x' | 'y';
```
</div>
<div  v-click="2">

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number;
```
</div>
<div  v-click="3">

```ts
type Flags = { [k: string]: boolean };
type M = keyof Flags; // ?
```
</div>
</div>

</div>
<div v-click="4">

- `typeof` operator

<div class="grid grid-cols-2 gap-4">
<div>

```ts
let s = "hello";
let n: typeof s; // n: string;
```
</div>
<div>

```ts
let f = () => ({ x: 10, y: 3 });
type P = typeof f; // () => { x: number, y: number }
```
</div>
</div>
</div>
<div v-click="5">

- indexed access types

<div class="grid grid-cols-2 gap-4">
<div>

```ts
type P = { age: number; name: string; alive: boolean };
type Age = P['age']; // number;
```
</div>
<div v-click="6">

```ts
type I1 = P['age' | 'name']; // string | number;
type I2 = P[keyof P]; // string | number | boolean;
```
</div>
<div v-click="6">

```ts
const array = [ 1, true ];
type T = (typeof array)[number]; // number | boolean
```
</div>
<div v-click="7">

```ts
type I1 = P['alve']; // -> Property 'alve' does not
// exist on type 'P'.
```
</div>
</div>
</div>

<!-- clicks: 6

The indexing type is itself a type, so we can use unions, keyof, etc.

clicks: 7

Of course the indexed access is type checked -->

---
layout: default
---

<Header title="6. Types Manipulation"/>
<div class="-mt-2">

- conditional types
</div>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm mb-2">"extends" keyword</div>

```ts
interface Animal { live(): void; }
interface Dog extends Animal { woof(): void; }
type A = Dog extends Animal ? number : string; // number
type B = Date extends Animal ? number : string; // string
```
</div>
<div v-click="1">
<div class="text-sm mb-2">use with generics</div>

```ts
type NotNullable<T> =
  T extends null | undefined ? never : T
type Payload = number | string | null | undefined;
type Value = NotNullable<Payload>; // number | string
```
</div>
<div>

<div class="mb-4" v-click="2">
<div class="text-sm mb-2 -mt-2">"infer" keyword</div>

```ts
type Flatten1<T> = T extends any[] ? T[number] : T;
type Str = Flatten1<string[]>; // string
type Flatten2<T> = T extends Array<infer P> ? P : never;
type Str = Flatten2<string[]>; // string
```
</div>
<div v-click="4">
<div class="text-sm mb-2 -mt-2">distributive conditional types</div>

```ts
type ToArr1<T> = T extends any ? T[] : never;
type A = ToArr1<string | number>; // string[] | number[]
type ToArr2<T> = [T] extends any ? T[] : never;
type B = ToArr2<string | number>; // (string | number)[]
type ToArr3<T> = T[];
type C = ToArr3<string | number>; // (string | number)[]

```
</div>
</div>
<div v-click="3">
<div class="text-sm mb-2 -mt-2">we can produce really useful types</div>

```ts
type Return<T> =
  T extends (...args: any) => infer R
    ? R
    : never;
type A = Return<() => number>; // number
type B = Return<(a: string) => string>; // string
type C = Return<(a: number) => string[]>; // string[]
type D = Return<string>; // never
```
</div>
</div>

---
layout: default
---

<Header title="6. Types Manipulation"/>
<div class="-mt-2">

- template literal types
</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm mb-2">based on string literals</div>

```ts
type World = 'world'; // 'world';
type Greeting = `hello ${World}`; // 'hello world';
```

</div>
<div v-click>
<div class="text-sm mb-2">distribution</div>

```ts
type H = 'A' | 'B' | 'C' | 'D' | ...;
type V = '1' | '2' | '3' | '4' | ...;
type Chess = `${H}${V}`; //'A1' | 'B1' |...| 'A2' |...
```
</div>
<div class="col-span-2" v-click>
<div class="text-sm mb-2 -mt-4">based on string literals</div>

```ts
type EventsListener<T> = {
  on<K extends string & keyof T>(eventName: `${K}Changed`, callback: (newValue: T[K]) => void): void;
};
function makeWatchedObject<T>(obj: T): T & EventsListener<T> { throw 'not implemented'; }
const person = makeWatchedObject({ name: 'Saoirse', age: 26 });
person.on('notExistingChanged', () => {}); // Argument of type '"notExistingChanged"' is not assignable to
// parameter of type '"nameChanged" | "ageChanged"'.
person.on('nameChanged', newName => { // newName: string;
  console.log(`First letter of new name is: ${newName[0]}`);
});
person.on('ageChanged', newAge => { // newAge: number;
  if (newAge < 0) {
    console.warn('warning! negative age');
  }
  newAge.slice(1); // Property 'slice' does not exist on type 'number'.
});
```
</div>
</div>

---
layout: default
---

<Header title="6. Types Manipulation"/>
<div class="-mt-2">

- mapped types
</div>

<div class="grid grid-cols-2 gap-4">
<div>

<div class="text-sm">"in" keyword</div>

```ts
type OptionsFlags<T> = {
  [_ in keyof T]: boolean;
};
type AppHandlers = {
  darkMode: () => void;
  customLocale: () => void;
}
type AppOptions = OptionsFlags<AppHandlers>;
// { darkMode: boolean; customLocale: boolean; }
```
</div>
<div v-click>

<div class="text-sm">"-" modifier</div>

```ts
type Writable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = Writable<LockedAccount>;
// { id: string; name: string; }
```
</div>
<div v-click>

<div class="text-sm -mt-2">"+" modifier</div>

```ts
type Optional<T> = {
  [Key in keyof T]+?: T[Key]
};
type AccountDetails = {
  id: string;
  name: string;
};
type OptionalAccountDetails = Optional<AccountDetails>;
// { id?: string; name?: string; }
```
</div>
<div v-click>

<div class="text-sm -mt-2">key remapping - "as" keyword</div>

```ts
type Getters<T> = {
    [K in keyof T as `get_${K}`]: () => T[K]
};
type Person = {
  name: string;
  age: number;
}
type PersonGetters = Getters<Person>;
// { get_name: () => string; get_age: () => number; }
```
</div>
</div>

---
layout: default
---

<Header title="6. Types Manipulation"/>
<div class="-mt-2">

- mapped types
</div>
<div class="grid grid-cols-1 gap-2">
<div>

<div class="text-sm">mapped types work well with other features regarding types manipulation</div>

```ts
type FilterNotSensitive<T, K extends keyof T> = T[K] extends { sensitive: true } ? K : never;
type ExtractSensitiveKeys<T> = {
  [K in keyof T as FilterNotSensitive<T, K>]: T[K];
};
type DBFields = {
  id: { type: number; };
  name: { type: string; sensitive: true };
  location: { type: string; sensitive: true };
  gender: { type: string; };
};
type SensitiveKeys = ExtractSensitiveKeys<DBFields>;
// {
//   name: { type: string; sensitive: true };
//   location: { type: string; sensitive: true };
// }
```
</div>
</div>

---
layout: default
---

<Header title="6. Types Manipulation"/>

<div class="mb-2">Utility types</div>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-4 -mb-2">

`Partial<T>`:

</div>

```ts
interface Todo {
  title: string;
  description: string;
}
const payload: Partial<Todo> = {
  description: 'throw out trash'
};
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Required<T>`:

</div>

```ts
interface Props {
  a?: number;
  b?: string;
}
const obj1: Props = { a: 5 }; // OK
const obj2: Required<Props> = { a: 5, b: 'a' }; // OK
const obj3: Required<Props> = { a: 5 }; // Error
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Readonly<T>`:

</div>

```ts
interface Todo {
  title: string;
}
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
todo.title = "Hello"; // Error
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Record<K, T>`:

</div>

```ts
type AppHandlers = {
  darkMode: () => void;
  customLocale: () => void;
}
const opts: Record<keyof AppHandlers, boolean> = {
  darkMode: true,
  customLocale: false,
};
```
</div>
</div>

---
layout: default
---

<Header title="6. Types Manipulation"/>

<div class="mb-2">Utility types</div>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-4 -mb-2">

`Pick<T, K>`:

</div>

```ts
interface Todo {
  title: string;
  description: string;
  done: boolean;
}
type TodoPreview = Pick<Todo, 'title' | 'done'>;
const todo: TodoPreview = { title: "TS", done: false };

```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Omit<T, K>`:

</div>

```ts
interface Todo {
  title: string;
  description: string;
  done: boolean;
}
type TodoPreview = Omit<Todo, 'description'>;
const todo: TodoPreview = { title: "TS", done: false };
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Extract<T, K>`:

</div>

```ts
type T1 = Extract<'a' | 'b' | 'c', 'a' | 'b'>;
// 'a' | 'b'
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'b' | 'x'>;
// 'a' | 'b'
type T3 = Extract<0 | 'a' | 'b' | '1', number>;
// 0
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Exclude<T, K>`:

</div>

```ts
type AB1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;
// 'c'
type AB2 = Exclude<'a' | 'b' | 'c', 'a' | 'b' | 'x'>;
// 'c'
type Z = Exclude<0 | 'a' | 'b' | '1', number>;
// 'a' | 'b' | '1'
```
</div>
</div>

---
layout: default
---

<Header title="6. Types Manipulation"/>

<div class="mb-2">Utility types</div>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-4 -mb-2">

`Parameters<T>`:

</div>

```ts
type T0 = Parameters<() => string>;
// []
type T1 = Parameters<(a: number, b: string ) => string>;
// [a: number, b: string]
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`ReturnType<T>`:

</div>

```ts
type T0 = ReturnType<() => string>;
// string
type T1 = ReturnType<(s: string) => void>;
// void
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`ConstructorParameters<T, K>`:

</div>

```ts
class Reference {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}
type T0 = ConstructorParameters<typeof Reference>;
// [id: string]
type T1 = ConstructorParameters<ErrorConstructor>;
// [message?: string]
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`InstanceType<T, K>`:

</div>

```ts
function factory<T extends new () => any>(
  c: T
): InstanceType<T> {
    return new c();
}

class A {
}
let a = factory(A);
// A;
```
</div>
</div>

<!-- ConstructorParameters: let's go back to exercise 3 about classes. Can we now write now the typesafe version of `logShapeInfo`? -->

---
layout: default
---

<Header title="6. Types Manipulation"/>

<div class="mb-2">Utility types</div>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-4 -mb-2">

`Uppercase<T>`:

</div>

```ts
type Greeting = 'Hello, world';
// 'Hello, world'
type ShoutyGreeting = Uppercase<Greeting>;
// 'HELLO, WORLD'
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Lowercase<T>`:

</div>

```ts
type Greeting = 'Hello, world';
// 'Hello, world'
type QuietGreeting = Lowercase<Greeting>;
// 'hello, world'
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Capitalize<T>`:

</div>

```ts
type LowercaseGreeting = 'hello, world';
// 'hello, world'
type Greeting = Capitalize<LowercaseGreeting>;
// 'Hello, world'
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`Uncapitalize<T>`:

</div>

```ts
type UppercaseGreeting = 'HELLO, WORLD';
// 'HELLO, WORLD'
type Greeting = Uncapitalize<UppercaseGreeting>;
// 'hELLO, WORLD'
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

`NonNullable<T>`:

</div>

```ts
type T0 = NonNullable<string[] | null | undefined>;
// string[]
```
</div>
<div v-click>
<div>List of all utility types:</div>
<a href="https://www.typescriptlang.org/docs/handbook/utility-types.html" class="text-xs">https://www.typescriptlang.org/docs/handbook/utility-types.html</a>
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/6-types-manipulation.ts
</h2>



---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  7. More on functions
</h2>

---
layout: default
---

<Header title="7. More on functions"/>

<div class="grid grid-cols-2 gap-4 -mt-2">
<div>
<div>
<div class="text-sm -mt-4 -mb-2">

call signatures

</div>

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(`${fn.description} returned ${fn(6)}`);
}
```
</div>
<div v-click="2">
<div class="text-sm -mt-2 -mb-2">

we can combine both

</div>

```ts
interface DateConstructor {
  new (): Date;
  (): string;
}
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm -mt-4 -mb-2">

construct signatures

</div>

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor('hello');
}
```
</div>
<div v-click="3">
<div class="text-sm -mt-2 -mb-2">

sometimes we have to specify type arguments

</div>

```ts
function concat<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
const a1 = concat([1, 2, 3], ['a']); // -> Type 'string'
// is not assignable to type 'number'.
const a2 = concat<string | number>([1, 2, 3], ['a']);
```
</div>
</div>
<div v-click="4" class="col-span-2 -mt-14">
<div class="text-sm -mb-2 mt-2">

optional parameters in callbacks

</div>

```ts
function forEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 3], (a) => console.log(a)); // a: any;
myForEach([1, 2, 3], (a, i) => console.log(a, i)); // a: any; i: number | undefined;
```
</div>
</div>

---
layout: default
---

<Header title="7. More on functions"/>
<div class="-mt-2 -mb-2">Guidlines on writing good generic functions</div>

<div class="grid grid-cols-2 gap-4 -mt-2">
<div>
<div>
<div class="text-xs text-green-500 mt-4 mb-2">
If possible, use the type parameter itself rather than constraining it
</div>

```ts
function firstElement1<T extends any[]>(arr: T) {
  return arr[0];
}
function firstElement2<T>(arr: T[]) {
  return arr[0];
}
const a = firstElement1([1, 2, 3]); // a: any ❌
const b = firstElement2([1, 2, 3]); // b: number ✔️
```

</div>
<div v-click="2">
<div class="text-xs text-green-500 mt-2 mb-2">
If a type param appears in one place, reconsider if you really need it
</div>

```ts
function len1<T extends { length: number }>(item: T) {
  console.log(item.length);
}
function len2(item: { length: number }) {
  console.log(item.length);
}
len1([1, 2, 3]);
len1('12345');  // works, but len1 is overcomplicated ❌
len2([1, 2, 3]);
len2('12345'); // ✔️
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-xs text-green-500 mt-4 mb-2">
Always use as few type parameters as possible
</div>

```ts
function filter1<T, F extends (arg: T) => boolean>(
  arr: T[],
  func: F
): T[] {
  return arr.filter(func);
}

function filter2<T>(
  arr: T[],
  func: (arg: T) => boolean
): T[] {
  return arr.filter(func);
}
const arr = [1, 2, 3, 4];
filter1<number>(arr, (a) => a % 2 === 0); // -> Expected
// 2 type arguments, but got 1. ❌
filter2<number>(arr, (a) => a % 2 === 0); // ✔️
```
</div>
</div>
</div>

---
layout: default
---

<Header title="7. More on functions"/>

<div class="grid grid-cols-2 gap-4 -mt-2">
<div>
<div>
<div class="text-sm -mt-4 -mb-2">

function overloading

</div>

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number,
  y?: number
): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3); // No overload expects 2
// arguments, but overloads do exist that expect either
// 1 or 3 arguments.
```
</div>
<div v-click="2">
<div class="text-sm -mt-2 -mb-2">

types in implementation should match the signature

</div>

```ts
function fn(x: boolean): void;
function fn(x: string): void; // This overload signature
// is not compatible with its implementation signature.
function fn(x: boolean) {}
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm -mt-4 -mb-2">

if possible, use unions rather than overloads

</div>

```ts
function len1(s: string): number;
function len1(arr: any[]): number;
function len1(x: any) {
  return x.length;
}
len1(''); // OK
len1([0]); // OK
len1(Math.random() > 0.5 ? 'hello' : [0]); // Error!
function len2(x: any[] | string) {
  return x.length;
}
len2(Math.random() > 0.5 ? 'hello' : [0]); // OK
```
</div>
<div v-click="3">
<div class="text-sm -mt-2 -mb-2">

implementation is not a signature

</div>

```ts
function fn(x: string): void;
function fn() {}
fn(); // Expected 1 arguments, but got 0.
```
</div>
<div v-click="4">
<div class="text-sm -mt-2 -mb-2">

parameter destructuring

</div>

```ts
function sum({ a, b }) { return a + b; }
function sum({ a, b } : { a: number; b: number }) { }
```
</div>
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/7-more-on-functions.ts
</h2>


















---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  8. Mixins
</h2>

---
layout: default
---

<Header title="8. Mixins"/>

<div class="grid grid-cols-2 gap-4 -mt-2">
<div>
<div>
<div class="text-sm -mt-4 -mb-2">

Let's start with Sprite

</div>

```ts
class Sprite {
  name = '';
  x = 0;
  y = 0;
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  constructor(name: string) {
    this.name = name;
  }
}
```
</div>
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

and create Scale mixin

</div>

```ts
type AnyClassConstructor = new (...args: any[]) => {};
function Scale<T extends AnyClassConstructor>(Base: T) {
  return class Scaling extends Base {
    scale = 1;
    setScale(scale: number) {
      this.scale = scale;
    }
  };
}
const EightBitSprite = Scale(Sprite);
const flappySprite = new EightBitSprite('Bird');
flappySprite.setScale(0.8);
console.log(flappySprite.scale);
```
</div>
<div v-click class="col-span-2 -mt-12">
<div class="text-sm -mb-2">

generic constructor

</div>

```ts
type ConstrainedClassConstructor<T = {}> = new (...args: any[]) => T;
type Positionable = ConstrainedClassConstructor<{  setPos: (x: number, y: number) => void }>;
function Jumpable<T extends Positionable>(Base: T) {
  return class Jumpable extends Base {
    jump() { this.setPos(0, 20); }
  };
}
```
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/8-mixins.ts
</h2>













---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  9. Decorators
</h2>

<!--
Do not become too emotionally attached to what we will discuss here, because all aspects regarding decorators may change.

They are stage 2 proposal (since 2017) for JavaScript, so you can expect some changes after this feature will be adopted in JavaScript.

In order to use decorators in our typescript code we need to set compiler option to "experimentalDecorators": true
-->

---
layout: default
---

<Header title="9. Decorators"/>
Decorators have three primary capabilities:

<div v-click>

- They can replace the value that is being decorated with a matching value that has the same semantics. (e.g. a decorator can replace a method with another method, a class with another class, and so on).
</div>
<div v-click>

- They can provide access to the value that is being decorated via accessor functions which they can then choose to share.
</div>
<div v-click>

- They can initialize the value that is being decorated, running additional code after the value has been fully defined. In cases where the value is a member of class, then initialization occurs once per instance.
</div>
<div v-click>

Long story short, decorators can be used to do metaprogramming and add functionality to a value, without fundamentally changing its external behavior.

</div>
<div v-click>

<span class="text-green-500">In TypeScript</span> decorator can be attached to a class declaration, method, accessor, property, or parameter.
</div>

---
layout: default
---

<Header title="9. Decorators"/>
<div class="grid grid-cols-2 gap-4">
<div>
<div>

<div class="text-sm -mb-2 -mt-6">

decorators are essentialy functions...

</div>

```ts
function Prop(target) {
  // do something with 'target' ...
}
```
</div>
<div v-click>

<div class="text-sm -mb-2 -mt-2">

... or, if customization is a concern, functions factory

</div>

```ts
function Component(name: string) {
  return function (target) {
    // do something with 'name' and 'target' ...
  };
}
```
</div>
<div v-click>

<div class="text-sm -mb-2 -mt-2">

that can be used to annonate classes, methods, accessors, properties, or parameters

</div>

```ts
@Component('name')
class App extends Vue {
  @Prop
  name!: string;
}
```
</div>
</div>
<div v-click>

<div class="text-sm -mb-2 -mt-6">

composition - order of declaration and execution

</div>

```ts
function first() {
  console.log('first(): factory evaluated');  // 1
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) { console.log('first(): called'); };      // 4
}
 
function second() {
  console.log('second(): factory evaluated'); // 2
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) { console.log('second(): called'); };     // 3
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}
```
</div>
</div>

---
layout: default
---

<Header title="9. Decorators"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-4">Decorators execute only once, when a class definition is first evaluated at runtime:</div>

```ts
function f(Base: any) {
  console.log('apply decorator'); 
  return Base;
} // logs, even though we don't have any instance of A
@f class A {}
```
<div v-click="1">

```ts
evaluate:  Instance Method
evaluate:  Instance Method Parameter
call:  Instance Method Parameter
call:  Instance Method
evaluate:  Instance Property
call:  Instance Property
evaluate:  Static Property
call:  Static Property
evaluate:  Static Method
evaluate:  Static Method Parameter
call:  Static Method Parameter
call:  Static Method
evaluate:  Class Decorator
evaluate:  Constructor Parameter
call:  Constructor Parameter
call:  Class Decorator
```
</div>

</div>

<div v-click="1">
<div class="text-sm -mt-4">The evaluation order of different types of decorators is well-defined:</div>

```ts
function f(key: string): any {
  console.log('evaluate: ', key);
  return function () {
    console.log('call: ', key);
  };
}
@f('Class Decorator')
class C {
  @f('Static Property')
  static prop?: number;

  @f('Static Method')
  static method(@f('Static Method Parameter') foo) {}

  constructor(@f('Constructor Parameter') foo) {}

  @f('Instance Method')
  method(@f('Instance Method Parameter') foo) {}

  @f('Instance Property')
  prop?: number;
}
```
</div>
</div>

<!--
The evaluation order of different types of decorators is well-defined:
1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
3. Parameter Decorators are applied for the constructor.
4. Class Decorators are applied for the class.
-->

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Class decorators</div>
<div class="grid grid-cols-2 gap-4">
<div class="col-span-2 -mb-5">
<div class="text-sm my-2">Type declaration</div>

```ts
type Constructor = new (...args: any[]) => {};
type ClassDecorator = <T extends Constructor>(target: T) => T | void;
```
</div>
<div v-click>
<div class="text-sm my-2">It could be suitable for extending class with new properties...</div>

```ts
function Serializable<T extends Constructor>(Base: T) {
  return class extends Base {
    toString() {
      return JSON.stringify(this);
    }
  };
}
 
@Serializable
class Foo {
  public foo = 'foo';
  public bar = 24;
}

console.log(new Foo().toString());
// -> "{"foo":"foo","bar":24}"
```
</div>
<div v-click>
<div class="text-sm my-2">... but decorators do not change type of the returned class!</div>

```ts
type Constructor = new (...args: any[]) => {};
function Serializable<T extends Constructor>(Base: T) {
  return class extends Base {
    serialize() {
      return JSON.stringify(this);
    }
  };
}
 
@Serializable
class Foo {
  public foo = 'foo';
  public bar = 24;
}

console.log(new Foo().serialize());
// Property 'serialize' does not exist on type 'Foo'.
```
</div>
</div>

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Class decorators - `Component`</div>
<div class="grid grid-cols-2 gap-4">
<div>

```ts
type VClass<V> = new (...args: any[]) => V & Vue;
function Comp<V extends Vue>(opt: ComponentOptions<V>) {
  return function<VC extends VClass<V>>(Comp: VC): VC {
    const p = Comp.prototype;
    const data: any = {};
    opt.name = Comp.name; // name
    Object.getOwnPropertyNames(p).forEach((i) => {
      const de = Object.getOwnPropertyDescriptor(p, i)!;
      if (de.get || de.set) { // computed
        opt.computed[i] = { get: de.get, set: de.set};
      } else if (typeof de.value === 'function') {
        opt.methods[i] = de.value; // methods
      } else { data[i] = de.value; }
    });
    opt.data = function(this: Vue) {
      Object.getOwnPropertyNames(data).forEach((i) => {
        Object.defineProperty(this, i, {
          get: () => data[i],
          set: value => { data[i] = value },
        });
      });
    };
    return Vue.extend(opt);
  }
}
```
</div>
<div v-click>

```ts
@Comp({
  components: {
    OtherComponent,
  }
})
export default class Counter extends Vue {
  count = 0;
  increment() {
    this.count++;
  }
  get label() {
    return `Count: ${this.count}`;
  }
}
// export default Vue.extend({
//   name: 'Counter',
//   components: { OtherComponent },
//   data() { return { count: 0 } },
//   computed: {
//     label() { return `Count: ${this.count}`; }
//   },
//   methods:  { increment() { this.count++; } }
// });
```
</div>
</div>

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Method decorators</div>
<div class="grid grid-cols-1 gap-4">
<div class="-mb-5">
<div class="text-sm my-2">Type declaration</div>

```ts
type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) =>
  TypedPropertyDescriptor<T> | void;
```
</div>
<div v-click>
<div class="text-sm my-2">Just like with class, you can alter the method behavior</div>

```ts
function Logger(target: unknown, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
  const originalMethod = descriptor.value!;
  descriptor.value = function (...args) {
    console.log('params: ', ...args);
    const result = originalMethod.call(this, ...args);
    console.log('result: ', result);
    return result;
  }
}
class C {
  @Logger
  add(x: number, y:number) { return x + y; }
}
const c = new C();
c.add(1, 2);
// -> params: 1, 2
// -> result: 3
```
</div>
<div>
</div>
</div>

<!--
```
interface TypedPropertyDescriptor<T> {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean; // Method
  value?: T; // Method
  get?: () => T; // Accessor
  set?: (value: T) => void; // Accessor
}
```
-->

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Method decorators - `Watch`</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div>

```ts
function Comp<V extends Vue>(opt: ComponentOptions<V>) {
  return function<VC extends VClass<V>>(Comp: VC): VC {
    // ... 
    Comp.__methodDecorators__.forEach(fn => fn(opt));
    return Vue.extend(opt);
  }
}
```
</div>
<div v-click="2" class="mt-4">

```ts
@Comp()
export default class Answer extends Vue {
  question = '';
  answer = '';
  @Watch('question')
  answer() {
    this.answer = 'Answer';
  }
}
// export default Vue.extend({
//   name: 'Answer ',
//   data() { return { answer: '', question: '' } },
//   watch: { question: [{ handler: 'answer' }] },
//   methods:  { answer() { this.answer = 'Answer' } }
// });
```
</div>
</div>
<div v-click="1">

```ts
function Watch(name: string, opts: WatchOptions = {}) {
  return function(Comp: Vue, key: string) {
    Comp.__methodDecorators__.push((options) => {
      const watch = options.watch;
      if (
        typeof watch[path] === 'object'
        && !Array.isArray(watch[path])
      ) {
        watch[path] = [watch[path]];
      } else if (typeof watch[path] === 'undefined') {
        watch[path] = [];
      }
      watch[path].push({ handler: key, ...opts });
    });
  }
}
```
</div>
</div>

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Accessor decorators</div>
<div class="grid grid-cols-1 gap-4">
<div class="-mb-5">
<div class="text-sm my-2">Type declaration</div>

```ts
type AccessorDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) =>
  TypedPropertyDescriptor<T> | void;
```
</div>
<div v-click>
<div class="text-sm my-2">Just like with class, you can alter the method behavior</div>

```ts
function immutable(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.set!;
  descriptor.set = function (value: any) {
    return original.call(this, { ...value })
  }
}
class C {
  private _point = { x: 0, y: 0 };
  @immutable
  set point(value: { x: number, y: number }) { this._point = value; }
  get point() { return this._point; }
}
const c = new C();
const point = { x: 1, y: 1 }
c.point = point;
console.log(c.point === point); // -> false
```
</div>
<div>
</div>
</div>

<!--
```
interface TypedPropertyDescriptor<T> {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean; // Method
  value?: T; // Method
  get?: () => T; // Accessor
  set?: (value: T) => void; // Accessor
}
```
-->

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Parameter Decorators</div>
<div class="grid grid-cols-1 gap-4">
<div class="-mb-5">
<div class="text-sm my-2">Type declaration</div>

```ts
type ParameterDecorator = (target: Object, methodName: string | symbol, parameterIndex: number) => void;
```
</div>
<div v-click>
<div class="text-sm my-2">Parameter decorator itself can't do much. But it can save information about parameters to be used in other decorators:</div>

```ts
function NotNull(target: unknown, methodName: string, parameterIndex: number) {
  Validator.registerNotNull(target, methodName, parameterIndex);
}
function Validate(target: unknown, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!Validator.performValidation(target, methodName, args)) {
      console.log(`Validation failed for method: ${methodName}`); return;
    }
    return originalMethod.call(this, ...args);
  }
}
class Task {
  @Validate
  run(@NotNull name: string): void {
    console.log("running task, name: " + name);
  }
}
```
</div>
<div>
</div>
</div>

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Property Decorators</div>
<div class="grid grid-cols-1 gap-4">
<div class="-mb-5">
<div class="text-sm my-2">Type declaration</div>

```ts
type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
```
</div>
<div v-click>
<div class="text-sm my-2">Note the return type - the returned value is ignored, so we cannot modify the property in the decorator!</div>

```ts
function Prop(options: PropOptions) {
  return function(Comp: Vue, key: string) {
    Comp.__propertyDecorators__.push((options) => {
      options.props[key] = options;
    });
  }
}

@Comp()
export default class Hello extends Vue {
  @Prop({ type: String })
  greeting!: string;
}
// export default Vue.extend({
//   name: 'Hello ',
//   props: { greeting: { type: String } },
// });
```
</div>
<div>
</div>
</div>

---
layout: default
---

<Header title="9. Decorators"/>
<div class="-mt-2">Metadata</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm my-2">Is there a way to avoid this type annotation duplication?</div>

```ts
function Prop(options: PropOptions) {
  return function(Comp: Vue, key: string) {
    Comp.__propertyDecorators__.push((options) => {
      options.props[key] = options;
    });
  }
}

@Comp()
export default class Hello extends Vue {
  @Prop({ type: String })
  greeting!: string;
}
```
</div>
<div v-click="2">
<div class="text-sm my-2">`emitDecoratorMetadata` option adds the following information during compilation:</div>

- `design:type`
- `design:paramtypes`
- `design:returntype`
</div>
</div>
<div v-click="1">
<div class="text-sm my-2">Yes, with reflect-metadata</div>

```ts
import 'reflect-metadata';
function Prop(options: PropOptions) {
  return function(Comp: Vue, key: string) {
    Comp.__propertyDecorators__.push((options) => {
      const type = Reflect
        .getMetadata('design:type', Comp, key);
      options.props[key] = {
        type,
        ...options
      };
    });
  }
}

@Comp()
export default class Hello extends Vue {
  @Prop()
  greeting!: string;
}
```
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/9-decorators.ts
</h2>



---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  10.  Modules and namespaces
</h2>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Modules - way of organizing the code</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm my-2">`export` keyword</div>

```ts
// @filename: ZipCodeValidator.ts
export const regex = /^[0-9]+$/;
export class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && regex.test(s);
  }
}
```
</div>
<div v-click="2">
<div class="text-sm my-2">export statements</div>

```ts
// @filename: ZipCodeValidator.ts
export const regex = /^[0-9]+$/;
class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && regex.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm my-2">`import` keyword</div>

```ts
// @filename: main.ts
import { ZipCodeValidator } from './ZipCodeValidator';
let myValidator = new ZipCodeValidator();
```
</div>
<div v-click="3">
<div class="text-sm my-2">we can also rename imports</div>

```ts
// @filename: main.ts
import { mainValidator as v } from './ZipCodeValidator';
let myValidator = new v();
```
</div>
<div v-click="4">
<div class="text-sm my-2">`*` for importing whole module</div>

```ts
// @filename: main.ts
import * as validator from './ZipCodeValidator';
let myValidator = new validator.ZipCodeValidator();
```
</div>
<div v-click="5">
<div class="text-sm my-2">importing for side effects only</div>

```ts
// @filename: main.ts
import './my-module';
```
</div>
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Modules - way of organizing the code</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm my-2">we can also export types</div>

```ts
// @filename: test.ts
export const x = /^[0-9]+$/;
export interface Validator {
  isAcceptable(s: string): boolean;
}
export type Res = 404 | 500;
```
</div>
<div v-click="2">
<div class="text-sm my-2">re-exporting shorthand - `export ... from ...`</div>

```ts
// @filename: test2.ts
export { Validator } from './test';
// equivalent to:
// import { Validator } from './test';
// export { Validator }
export * from './test';
// equivalent to:
// import { x, Validator, Res } from './test';
// export { x, Validator, Res }
export * as mod from './test';
// equivalent to:
// import * as mod from './test';
// export mod;

```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm my-2">and import them</div>

```ts
// @filename: main.ts
import { Validator } from './test';
import type { Validator, Res } from './test';
import { x, type Validator, type Res } from './test';
```
</div>
<div v-click="3">
<div class="text-sm my-2">`export default` keyword</div>

```ts
// @filename: validator.ts
export default class ZipCodeValidator {
  static numberRegexp = /^[0-9]+$/;
  isAcceptable(s: string) {
    return ZipCodeValidator.numberRegexp.test(s);
  }
}
// @filename: main.ts
import myValidator from './validator';
let valid = new myValidator();
```
</div>
<div v-click="4">
<div class="text-sm my-2">There can be one default export in a file.</div>

</div>
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Modules resolution</div>
<div class="text-sm -mt-2 -mb-2">

There are two module resolution strategies, that you can control with `moduleResolution` option:

</div>
<div v-click>

- classic

<div class="grid grid-cols-2 gap-4">
<div class="text-sm my-2">
Relative imports are resolved relative to the imported file.

```ts
//@file /root/src/A.ts
import { b } from './moduleB';
```
<div class="text-sm my-2">results in the following lookups:</div>

```bash
/root/src/moduleB.ts
/root/src/moduleB.d.ts
```
</div>
<div class="text-sm my-2">
In non-relative imports compiler walks up the directory tree.

```ts
//@file /root/src/A.ts
import { b } from 'moduleB';
```
<div class="text-sm my-2">results in the following lookups:</div>

```bash
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts
```
</div>
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Modules resolution</div>
<div class="text-sm -mt-2 -mb-2">

There are two module resolution strategies, that you can control with `moduleResolution` option:

</div>

- node (tries to mimick node.js module resoluton, hence name)

<div class="grid grid-cols-2 gap-4">
<div class="text-sm my-2">
Relative imports are resolved relative to the imported file.

```ts
//@file /root/src/A.ts
import { b } from './moduleB';
```
<div class="text-sm my-2">results in the following lookups:</div>

```bash
/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json
(if it specifies a "types" property)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts
```
</div>
<div class="text-sm my-2">
In non-relative imports compiler walks up the directory tree.

```ts
//@file /root/src/A.ts
import { b } from 'moduleB';
```
<div class="text-sm my-2">results in the following lookups:</div>

```bash
/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json
(if it specifies a "types" property)
/root/src/node_modules/@types/moduleB.d.ts
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts
/root/node_modules/moduleB.ts
...
/node_modules/moduleB.ts
...
```
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Modules resolution</div>
<div class="text-sm -mt-2">

There is `baseUrl` option that allows you to write relative imports as absolute relatively to the path defined in that option.
For example, if `baseUrl: '.'` then with files: `src/views/example/components/hello.ts` and `src/utils/sort.ts`

</div>
<div class="grid grid-cols-2 gap-4 -mt-1">
<div class="text-sm">
<div class="-mt-5 -mb-3">

we can replace the following import in `hello.ts`:

</div>

```ts
import sort from '../../../utils/sort';
```
</div>
<div class="text-sm">with

```ts
import sort from 'src/utils/sort';
```
</div>
</div>
<div class="text-sm mt-2" v-click>
<div class="-mt-4 -mb-3">

We can also provide custom path mappings with `paths` option. All paths all resolved relative to the `baseUrl`. Typical setup:

</div>

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"],
  },
}
```

</div>
<div>

```ts
import App from '@/views/components/App';
// resolved to <root>/src/views/components/App.ts
import router from '@/router';
// resolved to <root>/src/router.ts
import store from '@/store';
// resolved to <root>/src/store/index.ts
```

</div>
</div>
</div>

<div class="text-sm mt-2" v-click>
<div class="-mt-4 -mb-3">

There is also `rootDirs` option, that makes the compiler creating "virtual" directory from provided roots:

</div>
<div class="grid grid-cols-2 gap-4 mt-2">
<div>

```json
{
  "rootDirs": ["src/views", "generated"]
}
```

<div>Both files will be in the same directory in the output so we can use relative imports -></div>
</div>
<div>

```json
src
 └── views
     └── view1.ts (imports './template1')
     └── view2.ts
generated
  └── template1.ts (imports './view2')
```

</div>
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Namespaces</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm my-2">`namespace` keyword</div>

```ts
namespace Validation {
  export interface Validator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  export class LettersValidator implements Validator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  export class ZipCodeValidator implements Validator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
let strings = ['Hello', '98052', '101'];
let xs: Record<string, Validation.Validator> = {};
xs["ZIP"] = new Validation.ZipCodeValidator();
xs["Letters"] = new Validation.LettersValidator();

```
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm my-2">spread over multiple files with reference tags</div>

```ts
// @filename: Validation.ts
namespace Validation {
  export interface Validator {
    isAcceptable(s: string): boolean;
  }
}
```
```ts
// @filename: LettersValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
  const re = /^[A-Za-z]+$/;
  export class LettersValidator implements Validator {
    isAcceptable(s: string) { return re.test(s); }
  }
}
```
```ts
/// <reference path="Validation.ts" />
/// <reference path="LettersValidator.ts" />
let strings = ['Hello', '98052', '101'];
let xs: Record<string, Validation.Validator> = {};
xs["ZIP"] = new Validation.ZipCodeValidator();
xs["Letters"] = new Validation.LettersValidator();
```
</div>
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
<div class="-mt-2">Namespaces</div>
<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm my-2">You can put aliases for namespaces</div>

```ts
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square();
// Same as 'new Shapes.Polygons.Square()'

```
</div>
</div>
</div>

---
layout: default
---

<Header title="10.  Modules and namespaces"/>
  
- Modules provide for better code reuse, stronger isolation and better tooling support for bundling It is also worth noting that, for Node.js applications, modules are the default. Starting with ECMAScript 2015, modules are native part of the language, and should be supported by all compliant engine implementations.
- Namespaces are simply named JavaScript objects in the global namespace. This makes namespaces a very simple construct to use. Unlike modules, they can span multiple files, and can be concatenated using outFile. 

It's usually better to use modules over namespaces in modern code, especially for new projects. However there is one very good use case for namespaces - globally exposed type declaration files.
<div v-click>

Needless Namespacing

<div class="grid grid-cols-2 gap-4">
<div>

```ts
export namespace Shapes {
  export class Triangle {  /* ... */ }
  export class Square { /* ... */ }
}
```
</div>
<div>

```ts
import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?
```
</div>
</div>
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/10-modules-and-namespaces.ts
</h2>



---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  11. Declaration files
</h2>

---
layout: default
---

<Header title="11. Declaration files"/>

Declaration files are files with `.d.ts` extension, that contain only type declarations, without any implementation.

```ts
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }
  export interface Event {
    x: number;
    y: number;
  }
  export interface Base extends Selectors {
    event: Event;
  }
}
declare var d3: D3.Base;
```

---
layout: default
---

<Header title="11. Declaration files"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-6 -mb-2">

With `declaration` option, type declaration file is automatically created and emitted by the compiler along with executable JavaScript.

</div>

```ts
//@file index.ts
function d((timestamp: number): Date;
function d((m: number, d: number, y: number): Date;
function d((mOrTimestamp: number, d?: number, y?: number
): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else { return new Date(mOrTimestamp); }
}
```
```ts
//@file index.js
function d((mOrTimestamp, d, y) {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else { return new Date(mOrTimestamp); }
}
```
```ts
//@file index.d.ts
declare function d(timestamp: number): Date;
declare function d(m: number, d: number, y: number): Date
```
</div>
<div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

If type definitions file is provided in `"types"` field in package.json is automatically picked up by typescript module resolution algorithm.

</div>

```json
{
  "name": "package-name",
  "version": "1.0.0",
  "types": "./index.d.ts",
  "typesVersions": {
    ">=3.2": { "*": ["ts3.2/*"] },
    ">=3.1": { "*": ["ts3.1/*"] }
  }
}
```
</div>
<div v-click>
<div class="text-sm -mt-4 -mb-2">

You can also write type definitions manually and publish them separately. It's not that uncommon, there are a lot of libraries written in pure javascript with separate type definition files.
Usually you can recognize type definition packages by the name, which starts with `@types`.

</div>

```json
{
  "@types/express": "^4.17.13",
}
```
</div>
</div>
</div>

---
layout: default
---

<Header title="11. Declaration files"/>

<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm -mt-6 -mb-2">

module libraries

</div>

```ts
import * as path from 'path';
import { readFile } from 'fs';
```
</div>
<div>
<div class="text-sm -mt-2 -mb-2">

"function" module

</div>

```ts
import assert from 'assert';
assert(7 > 5);
```
</div>
<div>
<div class="text-sm -mt-2 -mb-2">

"class" module

</div>

```ts
import Vue from 'vue';
new Vue({
  render: (h) => h(App),
}).$mount('#app');
```
</div>
<div>
<div class="text-sm -mt-2 -mb-2">

"plugin" module

</div>

```ts
import jest from 'jest';
import '@testing-library/jest-dom';
```
</div>
</div>
<div>
<div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

global library

</div>

```ts
$(() => { console.log("hello!"); });

// Web
window.createGreeting = function (s) {
  return "Hello, " + s;
};
// Node
global.createGreeting = function (s) {
  return "Hello, " + s;
};
// Potentially any runtime
globalThis.createGreeting = function (s) {
  return "Hello, " + s;
};
```
</div>
<div v-click>
<div class="text-sm -mt-2 -mb-2">

UMD libraries

</div>

```ts
// in module
import moment from 'moment';
console.log(moment.format());
```
```ts
// in browser
console.log(window.moment.format());
```
</div>
</div>
</div>
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="-mt-6 -mb-2">

module libraries

</div>

```ts
// You can define functions that can be consumed by the module
export function isPrime(x: number): boolean;
export function isEven(x: number): boolean;
export as namespace mathLib;
// You can declare types that are available via importing the module
export interface Scientific {
  mantissa: number;
  exponent: number;
}
// You can declare properties of the module using const, let, or var
export const PI: number;
```
<div v-click>
<div class="text-sm -mt-2 -mb-2">

we can consume it in another module:

</div>

```ts
import { isPrime, type Scientific } from 'math-lib';
const x: Scientific = { mantissa: 1.24, exponent: 12 };
isPrime(2);
mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module
```
</div>
<div v-click>
<div class="text-sm -mt-2 -mb-2">

or using global variable in script:

</div>

```ts
mathLib.isPrime(2); // OK, not used in a module
```
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="-mt-6 -mb-2">

module "function"

</div>

```ts
export as namespace isPrime;
export = IsPrime;
declare function IsPrime(x: number): boolean;
declare namespace IsPrime {
  export interface Scientific {
    mantissa: number;
    exponent: number;
  }
}
```

<div class="grid grid-cols-2 gap-4">
<div v-click>
<div class="text-sm -mt-2 -mb-2">

It can be consumed in another module:

</div>

```ts
import IsPrime from 'math-lib';
IsPrime(2);
const x: IsPrime.Scientific = {
  mantissa: 1.24, exponent: 12
};
```
</div>
<div v-click>
<div class="text-sm -mt-2 -mb-2">

or using global variable in script:

</div>

```ts
isPrime.IsPrime(2);
```
</div>
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="-mt-6 -mb-2">

module "class"

</div>

```ts
export as namespace mathLib;
export = MathLib;
declare class MathLib {
  locale = 'en-EN';
  constructor(customLocale?: string);
  isPrime(x: number): boolean;
  isEven(x: number): boolean;
}
declare namespace MathLib {
  export interface Scientific {
    mantissa: number;
    exponent: number;
  }
}
```

<div class="grid grid-cols-2 gap-4">
<div v-click>
<div class="text-sm -mt-2 -mb-2">

It can be consumed in another module:

</div>

```ts
import MathLib from 'math-lib';
const mathLib = new MathLib();
const x: MathLib.Scientific = {
  mantissa: 1.24, exponent: 12
};
mathLib.isPrime(2);
```
</div>
<div v-click>
<div class="text-sm -mt-2 -mb-2">

or using global variable in script:

</div>

```ts
const lib = new mathLib.MathLib();
lib.isPrime(2);
```
</div>
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="-mt-6 -mb-2">

module "plugin"

</div>

```ts
import { greeter } from 'super-greeter'; // Normal Greeter API
greeter(2);
greeter('Hello world');
import 'hyper-super-greeter'; // Now we extend the object with a new function at runtime
greeter.hyperGreet();
```

<div class="grid grid-cols-2 gap-4">
<div v-click>
<div class="text-sm -mt-2 -mb-2">

The definition for “super-greeter”:

</div>

```ts
export interface GreeterFunction {
  (name: string): void
  (time: number): void
}
export const greeter: GreeterFunction;
```
</div>
<div v-click>
<div class="text-sm -mt-2 -mb-2">

The definition for our plugin "hyper-super-greeter"

</div>

```ts
import { greeter } from 'super-greeter';
export module 'super-greeter' {
  export interface GreeterFunction {
    hyperGreet(): void;
  }
}
```
</div>
</div>
<div v-click>

It uses the fact, that typescript merges the declaration for the modules. so with `export module some_existing_module` we can extend that module!

</div>
<div v-click>

Declaration merging gives us also one more good use case - module augmenting.
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="grid grid-cols-2 gap-4">
<div>
<div class="-mt-6 -mb-2">

Module augmentation - `declare module`

</div>

```ts
// our code
export interface Vue {
  readonly $el: Element;
  // ...
  $emit(event: string, ...args: any[]): this;
}
```
```ts
// our code
declare module 'vue/types/vue' {
  export interface Vue {
    $customProperty: number;
  }
}
Vue.prototype.$customProperty = 5;
```
```ts
// component extending class implementing interface above
@Component
export default class Component extends Vue {
  handler() {
    this.$emit('change', this.$customProperty);
    // we can use `$customProperty` without errors!
  }
}
```
</div>
<div>
<div v-click>
<div class="-mt-6 -mb-2">

Global augmentation - `declare global`

</div>

```ts
export class Observable<T> {
  // ...
}
declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}
Array.prototype.toObservable = function () {
  // ...
};
```
</div>
<div v-click>
<div class="-mt-2 -mb-2">

Wildcard module declarations

</div>

```ts
import App from './App.vue ';
// -> module not found './App.vue' ts(2307)
```

```ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```
</div>
</div>
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="-mt-6 -mb-2">

ambient namespaces in non-module code are globally exposed

</div>

```ts
declare namespace api {
  export interface User {
    name: string;
    surname: string;
    user_id: string;
  }
  // ...
}
```

<div v-click>
<div class="text-sm -mt-2 -mb-2">

We can use them in the code without any imports

</div>

```ts
class AuthModule {
  private user: api.User | null = null;

  async authenticate() {
    const { data } = await axios.get<api.User>('/user');
    this.user = data;
  }
}
```
</div>

---
layout: default
---

<Header title="11. Declaration files"/>
<div class="-mt-6 -mb-2">

global module

</div>

```ts
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }
  export interface Event {
    x: number;
    y: number;
  }
  export interface Base extends Selectors {
    event: Event;
  }
}
declare var d3: D3.Base; // "declare const" also works if it's read-only
```

<div v-click>
<div class="text-sm -mt-2 -mb-2">

It can be consumed without any imports:

</div>

```ts
d3.select('p');
```
</div>

---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  exercises/11-declaration-files.ts
</h2>















---
layout: center-image
---

<h2 class="text-primary flex content-center text-xl font-semibold">
  12. Build tools
</h2>

---
layout: default
---

<Header title="12. Build tools"/>

We have covered the language specifics, ways to organize and consume the types, but we did not say a word about how to actually build our code.

In order to have the compiler available we need to install npm package called `typescript`. Then we can compile our code using CLI tool called `tsc`.

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-6 -mb-2">

Emit JS for just the index.ts with the compiler defaults

</div>

```bash
tsc index.ts
```
</div>
<div>
<div class="text-sm -mt-6 -mb-2">

Emit JS for any .ts files in src, with the default settings

</div>

```bash
tsc src/*.ts
```
</div>
<div>
<div class="text-sm -mt-6 -mb-2">

Emit JS for app.ts and util.ts files in src, with custom settings

</div>

```bash
tsc app.ts util.ts --target esnext --outfile index.js
```
</div>
<div>
<div class="text-sm -mt-6 -mb-2">

Compile with look through the fs for `tsconfig.json`

</div>

```bash
tsc
```
</div>
<div>
<div class="text-sm -mt-6 -mb-2">

Emit files referenced in with the compiler settings from tsconfig.production.json

</div>

```bash
tsc --project tsconfig.production.json
```
</div>
</div>

---
layout: default
---

<Header title="12. Build tools"/>

The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.

<div class="grid grid-cols-2 gap-4">
<div>
<div>
<div class="text-sm -mt-6 -mb-2">

We can specify list of input files with `files` field:

</div>

```json
{
  "compilerOptions": { ... },
  "files": [ "index.ts", "core.ts" ]
}
```
</div>
<div v-click="3">
<div class="text-sm -mt-2 -mb-2">

There is also `references` field, that allows you to refer to other configuration files in other projects.
Then when importing something from that project it uses that project's configuration file.
We won't cover it in these workshops though.

If you're interested you can read more about it here:
<a href="https://www.typescriptlang.org/docs/handbook/project-references.html">https://www.typescriptlang.org/docs/handbook/project-references.html</a>
</div>
</div>
</div>
<div>
<div v-click="1">
<div class="text-sm -mt-6 -mb-2">

or using the `include` and `exclude` properties

</div>

```json
{
  "compilerOptions": { ... },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```
</div>
<div v-click="2">
<div class="text-sm -mt-3 -mb-2">

We can extend other configurations with `extends`

</div>

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "compilerOptions": { ... },
  "include": [
    "src/**/*.ts",
    "src/**/*.vue"
  ],
}
```
</div>
</div>
</div>

---
layout: default
---

<Header title="12. Build tools"/>

in `compilerOptions` you can provide more than 100 options for the compiler.

<div class="grid grid-cols-2 gap-4">
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`allowUnreachableCode` - `true | false | undefined`

</div>
<div class="text-sm">
Raises errors (or warning) for unreachable code.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`noImplicitAny` - `true | false`

</div>
<div class="text-sm">
Raises an error whenever typescript infers any.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`strictNullChecks` - `true | false`

</div>
<div class="text-sm ">
Controls if undefined and null values should be ignored.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`noUnusedLocals` - `true | false`

</div>
<div class="text-sm ">
Report errors on unused local variables.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`noUnusedParameters` - `true | false`

</div>
<div class="text-sm ">
Report errors on unused parameters in functions.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`noUncheckedIndexedAccess` -  `true | false`

</div>
<div class="text-sm ">
It will add undefined to any un-declared field in the type that uses index signatures.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`alwaysStrict` - `true | false`

</div>
<div class="text-sm ">
Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`strict` - `true | false`

</div>
<div class="text-sm ">
The strict flag enables a wide range of type checking (including, but no limited to noImplicitAny, strictNullChecks) behavior that results in stronger guarantees of program correctness.
</div>
</div>
</div>

---
layout: default
---

<Header title="12. Build tools"/>

in `compilerOptions` you can provide more than 100 options for the compiler.

<div class="grid grid-cols-2 gap-4">
<div>
<div class="text-sm -mt-6 -mb-2">

`allowJs` - `true | false`

</div>
<div class="text-sm ">
Allows to import js code in the ts files.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`baseUrl` - `string`

</div>
<div class="text-sm ">
Sets the project base url.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`paths` - JSON

</div>
<div class="text-sm ">
Sets the project paths, that can be used in imports.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`module` - `esnext | es2022 | umd | ... | commonjs`

</div>
<div class="text-sm ">
Sets the module system for the program. 
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`moduleResolution` - `node | node12 | classic`

</div>
<div class="text-sm ">
Specify the module resolution strategy.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`types` - `string[]`

</div>
<div class="text-sm ">
Includes listed type definitions in the global scope.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`declaration` - `true | false`

</div>
<div class="text-sm ">
Generate .d.ts files for your project. 
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`noEmitOnError` - `true | false`

</div>
<div class="text-sm ">
Do not emit code if any errors were reported.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`experimentalDecorators` - `true | false`

</div>
<div class="text-sm ">
Enables experimental support for decorators.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`target` -  `esnext | es2022 | ... | es2015 | es3`

</div>
<div class="text-sm ">
Sets the compilation target. For older, some features might be downleveled.
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`esModuleInterop` - `true | false`

</div>
<div class="text-sm ">
Allows to safely import node modules with ES-module syntax. <a href="https://www.typescriptlang.org/tsconfig#esModuleInterop">More details</a>
</div>
</div>
<div v-click>
<div class="text-sm -mt-6 -mb-2">

`isolatedModules` - `true | false`

</div>
<div class="text-sm ">
Reports error if you write certain code that can’t be correctly interpreted by a single-file transpilation process
</div>
</div>
</div>


---
layout: center-image
---

<h2 class="text-primary text-xl font-semibold">
  All tsconfig options
</h2>

https://www.typescriptlang.org/tsconfig

---
layout: default
---

<Header title="12. Build tools"/>

While you can use TypeScript compiler to produce JavaScript code from TypeScript code, it’s also common to use other transpilers to do this.

The most common are:

- Babel - mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript, but includes its own typescript transpiler
- ESBuild (used in Vite) - very fast compiler, **that does not perform typechecking**:
  
![esbuild](https://github.com/evanw/esbuild/raw/master/images/benchmark.svg)

Most of these alternative transpilers compile file by file, so it's recommended to set previously mentioned `isolatedModules` option in typescript config file















---
layout: default
---

<Header title="Bonus #1: TypeScript is unsound"/>

<div class="grid grid-cols-1 gap-4">
<div>

```ts
const xs = [0, 1, 2];  // xs: number[];
const x = xs[3];  // x: number;
```

</div>
<div>

```ts
function messUpTheArray(arr: Array<string | number>): void {
    arr.push(3);
}

const strings = ['foo', 'bar']; // strings: string[];
messUpTheArray(strings);

const s = strings[2]; // s: string;
console.log(s.toLowerCase()); // -> s.toLowerCase is not a function
```

There are JS type systems in which code above throws an error, for example Flow.

<a href="https://effectivetypescript.com/2021/05/06/unsoundness/">https://effectivetypescript.com/2021/05/06/unsoundness/</a>

<a href="https://www.typescriptlang.org/docs/handbook/type-compatibility.html">https://www.typescriptlang.org/docs/handbook/type-compatibility.html</a>

<a href="https://github.com/JSMonk/hegel">https://github.com/JSMonk/hegel</a>

</div>
</div>

<!-- Language is "sound" if the static type of every symbol is guaranteed to be compatible with its runtime value.

noUncheckedIndexedAccess
-->
---
layout: default
---

<Header title="Bonus #2: TypeScript in browsers?"/>
<div class="mb-2">
<div>There is a proposal for TC39 to include type annotation syntax in browsers.</div>

<a href="https://devblogs.microsoft.com/typescript/a-proposal-for-type-syntax-in-javascript/">https://devblogs.microsoft.com/typescript/a-proposal-for-type-syntax-in-javascript/</a>

<a href="https://github.com/giltayar/proposal-types-as-comments/">https://github.com/giltayar/proposal-types-as-comments/</a>

<div>If it will become included in the standard most typescript applications could be running in the browser without compilation step!</div>
</div>

---
layout: default
---

<Header title="Bonus #3: Type checking at runtime"/>
<div class="mb-2">
<div>Adds type checking at run time!</div>

<a href="https://github.com/fabiandev/ts-runtime">https://github.com/fabiandev/ts-runtime</a>

</div>

```ts
let num: number;
num = "Hello World!";
```

compiled into:

```ts
let _numType = t.number(), num;
num = _numType.assert("Hello World!")
```

- has some limitations
- affects performance (because before execution type assertions are checked)

---
layout: default
---

<Header title="Bonus #4: TypeScript type system is really powerful..."/>
<div class="grid grid-cols-2 gap-4">
<div>
<img src="https://camo.githubusercontent.com/165bf4623e8b080105ed987525c0936912d1b71dee9432c87e46d7a26e66175e/68747470733a2f2f666330312e6769746875622e696f2f5479706547616d652e676966"/>
</div>
<div class="mb-2">
<h2>TypeScript is turing complete!</h2>

<a class="text-xs" href="https://github.com/microsoft/TypeScript/issues/14833">https://github.com/microsoft/TypeScript/issues/14833</a>

<a class="text-xs" href="https://gist.github.com/hediet/63f4844acf5ac330804801084f87a6d4">https://gist.github.com/hediet/63f4844acf5ac330804801084f87a6d4</a>

<a class="text-xs" href="https://github.com/fc01/TypeGame">https://github.com/fc01/TypeGame</a>

</div>
</div>

---
layout: default
---

<Header title="Bonus #5: ... but not powerful enough!"/>

<div class="grid grid-cols-2 gap-4 text-sm">
<div>
<img src="/assets/lambda_cube.png" class="bg-light-50 rounded"/>
</div>
<div>
<div v-click class="text-green-500">

- z-axis ($\nearrow$): types that can bind types, corresponding to type operators.
  
  Example: type manipulation techniques
</div>
<div v-click class="text-green-500 -mt-4">

- y-axis ($\uparrow$): terms that can bind types, corresponding to polymorphism.

  Example: overloading, overriding
</div>
<div v-click class="text-red-500 -mt-4">

- x-axis ($\rightarrow$): types that can bind terms, corresponding to dependent types.

  Example: not present in typescript!

  `type BoundedInt(n) = { i:Int | i<=n }`
</div>
</div>
</div>
<div class="text-sm -mt-3" v-click>

If types can depend on the value, we can write types like "that variable is always smaller than 10", or "that function always returns 2", or "this program works according to specification".
This means we can introduce the "formal correctness" of a program.
There are some languages that offer the third option, like Coq (which is $\lambda C$ in the graph). They are using types to express the proof, that program works correctly (according to the specification).
</div>

<!--
Topics not covered:

Symbol + iterators + generators + enums + triple dash directives
-->