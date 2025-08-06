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

const names = ["satyam", "shubham", "satyam"];
const uniqueNames = new Set(names);
const setNames = new Set(["tanu", "manu", "tanu"]);
console.log(uniqueNames, setNames);
