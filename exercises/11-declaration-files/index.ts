/*
  11 - Declaration files
*/

// --- 1
// Write declaration file for module 'stats' in local source code (do not create any files inside node_modules).

import {
  getMaxIndex,
  getMaxElement,
  getMinIndex,
  getMinElement,
  getMedianIndex,
  getMedianElement,
  getAverageValue
} from 'stats';

getMaxIndex([1, 2, 3, 4], (a, b) => a - b);
getMaxElement([1, 2, 3, 4], (a, b) => a - b);
getMinIndex([1, 2, 3, 4], (a, b) => a - b);
getMinElement([1, 2, 3, 4], (a, b) => a - b);
getMedianIndex([1, 2, 3, 4], (a, b) => a - b);
getMedianElement([1, 2, 3, 4], (a, b) => a - b);
getAverageValue([1, 2, 3, 4], x => x);


// --- 2
// Someone provided .d.ts file for 'date-wizard' module, but it's empty.
// Fill it with proper declarations.

import DateWizard from 'date-wizard';
DateWizard(new Date(), '{date}.{month}.{year} {hours}:{minutes}');
const dateDetails: DateWizard.DateDetails = DateWizard.dateDetails(new Date());
console.log(DateWizard.utcDateDetails(new Date()));
console.log(DateWizard.utcDateDetails(new Date()));

// --- 3
// We would like to extend library above with function `pad`, that pads the number to 2-length string.
// For example pad(5) should return '05' and pad(10) should return '10'.
// Write a new local plugin module called 'date-wizard-augmentation',
// that will implement such function and augment the DateWizard type definition providing types for pad function.
import './date-wizard-augmentation';
const paddedNumber = DateWizard.pad(5);
console.log(paddedNumber.repeat(3));