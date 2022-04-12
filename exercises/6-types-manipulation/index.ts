/*
  6 - Types manipulation
  Implement the following utility types.
*/

// --- 1 Pick
type MyPick<T, K> = unknown;

type test1 = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

// --- 2 Parameters
type MyParameters<T> = unknown;

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: {a: 'A'}): void => {};
const baz = (): void => {};

type test2 = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, {a: 'A'}]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

// --- 3 Exclude
type MyExclude<T, U> = unknown;

type test3 = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, Exclude<"a" | "b" | "c", "a" | "b">>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>,
];

// --- 4 PromiseAll
declare function PromiseAll(values: unknown): unknown;

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type test4 = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>
];

// --- 5 Flip
// No need to support nested objects and values which cannot become object keys such as arrays.
type Flip<T> = unknown;

type test5 = [
  Expect<Equal<{a: 'pi'}, Flip<{pi: 'a'}>>>,
  Expect<NotEqual<{b: 'pi'}, Flip<{pi: 'a'}>>>,
  Expect<Equal<{3.14: 'pi', true: 'bool'}, Flip<{pi: 3.14, bool: true}>>>,
  Expect<Equal<{val2: 'prop2', val: 'prop'}, Flip<{prop: 'val', prop2: 'val2'}>>>,
];

// --- 6 Get
type Get<T, K> = unknown;

type Data = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    included: true,
  },
  hello: 'world'
};
type test6 = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar', count: 6 }>>,
  Expect<Equal<Get<Data, 'no.existed'>, never>>,
];

// --- 7 Get
type FlipArguments<T> = unknown;
type test7 = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>
]

// --- BONUS C-printf parser
type ControlsMap = {
  c: 'char',
  s: 'string',
  d: 'dec',
  o: 'oct',
  h: 'hex',
  f: 'float',
  p: 'pointer',
}
type ParsePrintFormat = unknown;
declare function printf(...args: any): string;

printf('this is a %s and it is %d %wyears old, right?%b %D %i %f', 'Hackle', 20, true, new Date());
type test8 = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>
];




// ignore this
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
export {}