/*
  7 - More on functions
*/

// Define interface MyArray, that should mimic the native Array.
interface MyArray<T> {
  // TODO
}
Array
declare const test: MyArray<string>;
console.log(test.length);
const a: string | undefined = test.pop();
const b: number = test.push('a', 'aa', 'aaa');
const c: MyArray<string> = test.slice(); // returns the same array
const d: MyArray<string> = test.slice(1); // returns subarray starting from 1 till end
const e: MyArray<string> = test.slice(1, 3); // returns subarray starting from 1 till 3
const f: MyArray<string> = test.splice(1); // removes all elements from array starting from 1
const g: MyArray<string> = test.splice(1, 5); // removes 5 elements from array starting from 1
const h: MyArray<string> = test.splice(1, 5, 'aaaa', 'aaaaa'); // removes 5 elements from array starting from 1 and adds 2 elements: 'aaaa' and 'aaaaa' on the same index we started deleting
const i: MyArray<number> = test.map((item) => item.length); // maps all array items to another value
const j: MyArray<number> = test.map((item, index, array) => array.length + index + item.length); // maps all array items to another value, callback accepts up to 3 parameters (second and third are optional)
const k: MyArray<string> = test.filter((item) => item.startsWith('a')); // filters by the passed predicate
const l: MyArray<string> = test.filter((item, index, array) => index || array.length || item.startsWith('a')); // filters by the passed predicate, callback accepts up to 3 parameters (second and third are optional)
declare const test2: MyArray<string | number>;
declare function isNumber(value: string | number): value is number;
const m: MyArray<number> = test2.filter(isNumber); // if passed predicate is a type predicate, it is able to narrow the type of returned array
const n: number = m.reduce((a, b) => a + b, 0); // reduce takes the initial value passed as the second parameter and performs some operation on it and all the next array items.
const o: number = test.reduce((a, b) => a + b.length, 0); // sum of all strings length

// BONUS. flat flattens the array with the depth provided as the argument. default depth is 1.
declare const test3: MyArray<number | MyArray<number | MyArray<number>>>;
const arr0: MyArray<number | MyArray<number | MyArray<number>>> = test3.flat(0);
const arr1: MyArray<number | MyArray<number>> = test3.flat(1);
const arr1_default: MyArray<number | MyArray<number>> = test3.flat();
const arr2: MyArray<number> = test3.flat(2);
const arr3: MyArray<number> = test3.flat(100);

export {}