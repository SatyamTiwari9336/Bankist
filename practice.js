const array = [2, 4, 7, 6, 1];
//to get the maximum element in the array
const max = function (array) {
  let currmax = 0;
  for (const cur of array) {
    if (cur > currmax) {
      currmax = cur;
    }
  }
  console.log(`max is ${currmax}`);
};
max(array);
//new comment
//to sort an  array using bubble sort

function bubblesort(arr) {
  for (let j = 0; j < arr.length - 1; j++) {
    for (let i = 0; i < arr.length - j - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
  console.log(arr);
}
bubblesort([1, 24, 3, 864, 99]);
//set made with array and sets

const names = ["satyam", "shubham", "satyam"];
const uniqueNames = new Set(names);
const setNames = new Set(["tanu", "manu", "tanu"]);
console.log(uniqueNames, setNames);
//new map
const newMap = new Map([
  ["satyam", "value"],
  ["shubham", "index"],
  [1, true],
]);

console.log(newMap.has("shubham"));

//to reverse an array
const revarr = array.reverse();
console.log(revarr);

//to reverse an array by DSA
let arr1 = [2, 3, 5, 6, 12, 1, 4, 5, 2];
for (let i = 0; i < arr1.length / 2; i++) {
  [arr1[i], arr1[arr1.length - i - 1]] = [arr1[arr1.length - i - 1], arr1[i]];
}
console.log(arr1);

// find minimum and maximum of array using minimum number of comparisons
let arr2 = [1, 4, 6, -2, 16, 3];
let maxi = 0;
let min = arr2[0];
for (let i = 0; i <= arr2.length - 1; i++) {
  if (arr2[i] > maxi) {
    maxi = arr2[i];
  }
  if (arr2[i] < min) {
    min = arr2[i];
  }
}

console.log(`maximum  is ${maxi}, minimum is  ${min}`);

//find the missing element from a series of number in array
let arr3 = [2, 3, 4, 1, 8, 6, 7];
let sum = 0;
sum = arr3.reduce((acc, el) => acc + el);
let n = arr3.length + 1;
const expectedsum = (n * (n + 1)) / 2;
const missingElement = expectedsum - sum;
console.log(missingElement);

//merging to arrays after sorting
let sorting = function (ar) {
  for (let i = 0; i < ar.length - 1; i++) {
    for (let j = 0; j < ar.length - i - 1; j++) {
      if (ar[j] > ar[j + 1]) {
        [ar[j], ar[j + 1]] = [ar[j + 1], ar[j]];
      }
    }
  }
  return ar;
};
let arr4 = [2, 6, 5, 6];
let arr5 = [2, 6, 89, 0];

let arr6 = arr4.concat(arr5);
console.log(sorting(arr6));

// joining two arrays after sorting in js without concat
let a1 = [1, 2, 5, 5, 5];
let a2 = [1, 4, 6, 8];
let a3 = [];
let i,
  j = 0;

while (i < a1.length && j < a2.length) {
  if (a1[i] < a2[j]) {
    a3.push(a1[i]);
    i++;
  } else {
    a3.push(a2[j]);
    j++;
  }
}

// Add remaining elements from a1
while (i < a1.length) {
  a3.push(a1[i]);
  i++;
}

// Add remaining elements from a2
while (j < a2.length) {
  a3.push(a2[j]);
  j++;
}

console.log(a3); // [1, 1, 2, 4, 5, 5, 5, 6, 8]

//print the pattern
// 1
// 10
// 101
// 1010
//10101
