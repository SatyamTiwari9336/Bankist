function isPalindromeNumber(num) {
  const str = num.toString();
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}

// Example usage:
console.log(isPalindromeNumber(121)); // true
console.log(isPalindromeNumber(123)); // false
