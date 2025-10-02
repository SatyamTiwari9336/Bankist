const reversestring = function (str) {
  const reversed = str.split("").reverse().join("");
  console.log(reversed);
};

reversestring("satyam");
// ispalindrome(121);

function reverseNumber(num) {
  let newnum = 0;
  let reverse = 0;
  while (num > 0) {
    newnum = num % 10;
    reverse += newnum.toString();
    num = Math.floor(num / 10);
  }
  const reversenum = Number(reverse);
  console.log(reversenum);
}

reverseNumber(13289);
//print pattern
//hollow square

for (let i = 0; i < 5; i++) {
  let row = "";
  for (let j = 0; j < 5; j++) {
    if (i === 0 || i === 4 || j === 0 || j === 4) {
      row += "*";
    } else {
      row += " ";
    }
  }
  console.log(row);
}
