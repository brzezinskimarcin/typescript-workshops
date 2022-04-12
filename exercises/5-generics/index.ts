/*
  5 - Generics
*/

// Look at the code below:

import { EmployeeRepository } from './repository';

const employeeIdInputEl = document.getElementById('employeeIdInput') as HTMLInputElement;
const findEmployeeButtonEl = document.getElementById('findEmployeeButton')!;
const searchResultsEl = document.getElementById('searchResults')!;

const repository = new EmployeeRepository();

findEmployeeButtonEl.addEventListener('click', () => {
  const supervisorName = getSupervisorName(employeeIdInputEl.value);
  if (supervisorName) {
    searchResultsEl.innerText = `Supervisor name: ${supervisorName}`;
  } else {
    searchResultsEl.innerText = 'Supervisor name: could not find';
  }
});

// so much nesting
function getSupervisorName(enteredId?: string) {
  if (enteredId) {
    const employee = repository.findById(parseInt(enteredId));
    if (employee && employee.supervisorId) {
      const supervisor = repository.findById(employee.supervisorId);
      if (supervisor) {
        return supervisor.name;
      }
    }
  }
}

// --- 1
// There is a repeating pattern of checking for existence of some fields.
// We could create an abstraction that hides the implementation of this.
// In maybe.ts define a generic class Maybe, which will hold the value or null.
// It should implement the following methods:
//   static some<T>(value: T): Maybe<T>
//   static none<T>(): Maybe<T>
//   static fromValue<T>(value: T): Maybe<T>
//   getOrElse(defaultValue: T): T


// --- 2
// Now update Employee interface marking supervisorId as Maybe.
// Then update the repository and findById method in repository.ts
// Now, it should return Maybe<Employee>


// --- 3
// Now we have the type Maybe, but we cannot do much with it.
// Let's define map utility function, that you can perform on that type.
// If the value it present, it should map that value.
//   map<R>(f: (wrapped: T) => R): Maybe<R>


// --- 4
// Now, you can remove the most inner if in getSupervisorName by using map we just defined!


// --- 5
// Unfortunately, map is not enough. Look at this code:
//   const employee = repository.findById(parseInt(enteredId));
//   if (employee && employee.supervisorId) {
//     const supervisor = repository.findById(employee.supervisorId);
//     // ...
//   }
// trying converting it with map:
//   const employee: Maybe<Employee> = repository.findById(parseInt(enteredId));
//   const supervisor: Maybe<Maybe<Employee>> = employee.map(e => repository.findById(e.supervisorId));
// We should define flatMap, that works just like map but it also flattens the result so that we don’t end up with nested Maybes.
//   flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R>
// Can map be express in terms of flatMap? Or vice versa?


// --- 6
// Now we can rewrite getSupervisorName and remove all nested ifs. It can be just chain of some functions.



// --- Just some additional information about what we just achieved:
// Purely functional languages (like Haskell) do not allow to write imperative code.
// They are not capable of expressing an execution order of computations.
// Instead, they express programs as functions, probably composed of other functions.
// They cannot have any side effects, there is no mutable state.
// The same combination of input arguments should always produce the same result.

// Therefore, it's not possible to write something like:
//   const a = 2; // first define variable a;
//   const b = 2; // then define variable b;
//   const sum = a + b; // then calculate sum of a and b;

// Instead pure functional version would look something like:
//   ((a, b) => a + b)(2, 2)

// Most languages introduce "let ... in" keyword, that makes this more readable:
//   let
//     sum = (a, b) => a + b
//     in
//     sum(2, 2)

// Expressing some logic in terms of functions and their compositions can become painful with some more complicated case.
// That's why functional programming languages introduce a concept of Monad.
// The formal definition of a monad is that it’s a container type that has two operations:
//   return - which creates an instance of the type from a regular value (some and none in our case)
//   bind - which lets you combine monadic values (flatMap in our case)
// There are also some monadic laws that every monad has to follow but let’s not dive into it.

// So, guess what, Maybe is a monad! And look how it improved the readability of our code.
// Functional languages implement much more types of monads, for example Either (very useful in error handling).
// They also allow us to introduce state to functional programs.
//   return could just return the state
//   bind could apply changes to that internal state (just like we were doing with Maybe).

// You can read more on monads here: https://en.wikibooks.org/wiki/Haskell/Understanding_monads