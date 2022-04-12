/*
  4 - Assertions and narrowing
*/


interface User {
  name: string;
  age: number;
  occupation: string;
  type: 'user';
}
  
interface Admin {
  name: string;
  age: number;
  role: string;
  type: 'admin';
}

type Person = User | Admin;

// --- 1
// Write predicates isUser nad isAdmin that will narrow type Person to the correct one.

// --- 2
// Write deserialize function, that will parse the person data in JSON format and return the object with appropiate type.



// --- 3
// Write function retrieveAdmins that will return parsed admins from array of strings representing persons


// --- 4
// Create class DateCache that can contain null or date
// It should contain notEmpty() method, that works as type guard.
// it should contain setDate(date: Date | null) method, that sets the date (if null is passed, the function should do nothing)
// it should contain cloneCache(cache: DateCache) method, that clones the passed DateCache (only if that cache is not empty)


export {};