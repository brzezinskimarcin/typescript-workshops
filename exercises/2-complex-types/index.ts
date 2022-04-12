/*
  2 - Complex types
*/

// --- 1
// Given the data, define the type "User" and use it accordingly.

interface User {
  // TODO
}

const users = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut'
  }
];

export function logUser(user) {
  console.log(` - ${user.name}, ${user.age}`);
}

users.forEach(logUser);

// --- 2
// We introduce another type called 'Admin' to represent the administrators of the system.
// To make it easier to differentiate between User and Admin, create new type UserWithType,
// that except from properties above also contains property 'type' set to 'user'. Add the
// same field with 'admin' to Admin type.
// Let's define type Person, that should accept any person, no matter if its user or admin.

interface Admin {
  name: string;
  age: number;
  role: string;
}

type Person = unknown;

export const persons = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
    type: 'user',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
    type: 'admin',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
    type: 'user',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
    type: 'admin',
  }
];

export function logPerson(user) {
  console.log(` - ${user.name}, ${user.age}`);
}

// --- 3
// Now, after introducing Person type we would like to extend logPerson function.
// Except from printing name and age, it should also print 'occupation' or 'role', depending on the user type.

export function logPerson2(user) {
  // TODO
}


// --- 4
// We would like to add `online` property to both Admin and UserWithType.
// If it's true, it means the user is online.
// If it's false or is not present at all, user is offline.
// It shouldn't be possible to write to this property.

export function filterPersons(persons: Person[]): Person[] {
  return persons.filter((user) => user.isOnline);
}

// @ts-expect-error line below should return error
persons[0].isOnline = true;

// --- 5
// Let's define type coords, that can contain two values: latitude and longitude
type Coords = unknown;
const coords: Coords[] = [
  [21.754398, 4.111630],
  [21.427503, -5.386895],
  [24.981079, 51.252460],
  [40.712776, 5.211630],
]

// --- 6
// Now let's define type SolarEclipseMap, that returns true for latitudes in which solar eclipse can be observed.
// Then define convertCoordsToSolarEclipseMap, that will convert coords array to SolarEclipseMap object.
// At the end implement observedCoords function that should filter our these elements, in which solar eclipse cannot be observed.
// observedCoords function should reuse convertCoordsToSolarEclipseMap function and filter our depending on value in that map.
interface SolarEclipseMap {
  // TODO
};
const example: SolarEclipseMap = {
  21.754398: true,
  21.427503: true,
  24.981079: true,
  40.712776: false,
};
function convertCoordsToSolarEclipseMap(coords: Coords[], minLat: number, maxLat: number): SolarEclipseMap {
  // TODO
}
const solarEclipse = convertCoordsToSolarEclipseMap(coords, 20, 24);
function observedCoords(coords: Coords[], minLat: number, maxLat: number): Coords[] {
  // TODO
}

export {};
