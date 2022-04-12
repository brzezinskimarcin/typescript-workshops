/*
  1 - Basics
  Replace all any occurrences with correct types or remove the annotation if types can be inferred.
*/

/* Code */

// --- 1

const a: any = 5;
const b: any = ['http://localhost', 8000].join(':');
const c: any = 100n;

// --- 2

function multiply(a: any, b: any): any {
  return a * b;
}

function isZero(a: any): any {
  return a === 0;
}

const isNotZero: any = (x: any) => !isZero(x);

function filteredMultiplication(arr: any, filter: any, reducer: any) {
  return arr.filter(filter).reduce(reducer, 1);
}

filteredMultiplication([0, 4, 0, 2], isNotZero, multiply);

function sumAll(...numbers: any) {
  return numbers.reduce((a: any, b: any) => a + b, 0);
}
sumAll(1, 2, 3, 4, 5);

// --- 3

window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.button);
};

// --- 4

function formatValue(value: any): any {
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(', ')}]`;
  }

  if (typeof value === 'string') {
    return value.normalize();
  }

  if (typeof value === 'number') {
    return Intl.NumberFormat('en-US').format(value);
  }

  return '';
}

function prettyPrint(value: any): any {
  console.log(formatValue(value).normalize());
}

// --- 5

function timeout(ms: any): Promise<any> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout elapsed")), ms)
  )
}

async function fetchTodos(): Promise<any> {
  const delay: any = 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        'design a prototype',
        'provide feedback',
        'survey users'
      ])
    }, delay);
  });
}

async function fetchTodosWithTimeout(): Promise<any> {
  const todos: any = await Promise.race([
    fetchTodos(),
    timeout(3000)
  ]);
  return todos.map((todo: any, index: any) => `${index}. ${todo.toUpperCase()}`);
}

// --- 6 BONUS question: why there are no type errors in lines below?

function operateOnTwoNumbers(a: number, b: number, func: (a: number, b: number) => void) {
  func(a, b);
}

function sum(a: number, b: number) {
  return a + b;
}
operateOnTwoNumbers(2, 4, sum);

function identity(a: number): number {
  return a;
}
operateOnTwoNumbers(1, 2, identity);

// ignore this
export {};