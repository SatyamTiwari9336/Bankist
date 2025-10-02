const ispalindrome = function (num) {
  const str = num.toString();
  const reversed = str.split("").reverse().join("");
  console.log(reversed);
  console.log(reversed == str);
};

ispalindrome(112);
ispalindrome(121);

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
