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
