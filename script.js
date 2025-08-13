'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//⬇️⬇️ THIS IS TO SHOW THE withdraws and deposits of the users
const diplayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// diplayMovements(account1.movements);

//calculating and printing balance⬇️⬇️
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

//summarry balance in out and intrest⬇️⬇️
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const intrests = acc.movements
    .filter(mov => mov >= 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intrests}`;
};
// calcDisplaySummary(account1.movements);

//computing usernames from accounts ⬇️⬇️

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(names => names[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);
// console.log(containerMovements.innerHTML);

//update ui function ⬇️⬇️
const updateUI = function (acc) {
  //Display Movements
  diplayMovements(acc.movements);
  //Display Balanace
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

//Event handlers
//create login event handler ⬇️⬇️
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //to prevent form from submitting immediately on click and to keep output
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    //clear fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});
// emplementing the transfer of money from one account to another
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    recieverAcc !== currentAccount.username &&
    currentAccount.balance > amount
  ) {
    console.log('transfer valid');
    //doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    // console.log(index);
    //delete account
    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

// loan asking feature ⬇️⬇️
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add amount
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
///////////////////////////////////////////////
//////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);
console.log(arr);
// slice does not change the original array
//Splice mutates the original array
// console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
console.log(arr.splice(1, 2));
console.log(arr);
//reverse
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
//reverse also mutates the original array
console.log(arr2);
//concat
const letter = arr.concat(arr2);
console.log(letter);
console.log([...arr, ...arr2]);
//join
console.log(letter.join('-'));

//at method

const arr3 = [23, 24, 25];
console.log(arr3[arr3.length - 1]);
console.log(arr3.at(-1));
console.log(arr3[0]);
console.log('satyam'.at(0));
console.log('satyam'.at(-1));
 
/////////////////////////////////////////////////////////////////////////////////
//for each
//forEach is a higher order function that calls other function
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`movement : ${i + 1} you deposited ${movement}`);
  } else {
    console.log(`movement : ${i + 1} you withdrew ${Math.abs(movement)}`);
  }
}

console.log('------forEach------');
//forEach runs the function for all the elemnts of the passed array one by one
//array.forEach(function(elements,index,wholearray){})
//continue and break do not work in for each loop
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`movement : ${i + 1} you deposited ${mov}`);
  } else {
    console.log(`movement : ${i + 1} you withdrew ${Math.abs(mov)}`);
  }
});


//forEach f0r maps and sets

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const uniqueCurrencies = new Set(['usd', 'GBP', 'EUR', 'USD', 'GBP']);
uniqueCurrencies.forEach(function (value, _, sets) {
  console.log(`${value} ${value}  ${sets}`);
});
///////////////////////////////////////
// Coding Challenge #1

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

const checkDogs = function (dogsjulia, dogskate) {
  const dogsjulia1 = dogsjulia.slice(); //or[...dogsjulia]
  dogsjulia1.splice(dogsjulia1.splice(0, 1));
  dogsjulia1.splice(-1, 2);
  const array = dogsjulia1.concat(dogskate);

  array.forEach(function (el, i) {
    if (el >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${el} years old`);
    } else if (el < 3) {
      console.log(
        `Dog number ${i + 1} is still a puppy, and is ${el} years old🐶`
      );
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 2]);
///////////////////////////////////////////////////////
//MAP method
const eurotoUSd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurotoUSd;
// });
const movementsUSD = movements.map(mov => mov * eurotoUSd); //using arrow functions
//functional programming above both
console.log(movements);
console.log(movementsUSD);

const movementUSDfor = [];
for (const el of movements) {
  movementUSDfor.push(el * 1.1);
} //
console.log(movementUSDfor);
//maps also gives acces to the arguiment index and whole array

const movementsdescriptions = movements.map((mov, i, arr) => {
  return `${mov} was ${mov > 0 ? 'deposited' : 'withdrawn'} at the mov ${i}`;
});
console.log(movementsdescriptions);
//////////////////////////////////////
//filter callback function also gets access to elements ,index,whole array
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawlarray = movements.filter(mov => mov < 0);
console.log(withdrawlarray);

//this pointer in map method
const obj = {
  name: 'satyam',
};

const newarr = [1, 2, 3, 4].map(function () {
  return this.name;
}, obj);
console.log(newarr);

///////////////////////////////////////////////////////////////////////////////
//Reduce method
const balance = movements.reduce(function (acc, cur, index, arr) {
  console.log(`the value of ${acc} in iteration ${index} `);
  return acc + cur;
}, 0); //after , is the value from where acc start with
console.log(balance);

//maximum value using accumulator and reduce method
const max = movements.reduce((acc, mov) => {
  return acc > mov ? acc : mov;
}, movements[0]);
console.log(max);

////////////////////////////////////////////////////////////////////////
// Coding Challenge #2


Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

//solution
const calcAverageHumanAge = function (ages) {
  const humanAgeArray = ages.map(dogAge =>
    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
  );
  const adultdogs = humanAgeArray.filter(function (element) {
    return element > 18;
  });
  const average =
    adultdogs.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / adultdogs.length;
  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//chaining of methods

const euroToUsd = 1.1;

const sumofdollars = movements
  .filter(el => el > 0)
  .map((el, i, arr) => {
    // console.log(arr);
    return el * euroToUsd;
  })
  .reduce((acc, el) => acc + el, 0);

console.log(sumofdollars);

// const obj = { name: 'satytam' };
// const arry = [1, 2, 3, 4, 5, 6];
// arry.map(function (val) {
//   console.log(this);
// }, obj);

const a = movements.find(mov => mov < 0);
console.log(a);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//the find index method
//to delete an element from the array we use splice method which takes the index of element to be deleted array.splice(index_in_array,how_many);

//findLast method is used to find element that is last in array to satisfy this condition
console.log(movements);
const lastel = movements.findLast(mov => mov < 0);
const lastelindex = movements.findLastIndex(mov => mov < 0);
console.log(lastel);
console.log(lastelindex);

//findLastIndex method is used to find index of the last element that satisfies the condition

//some method
//return true if any of the element satisfies the condition
const valuegreaterthan = movements.some(mov => mov > 1500);
console.log(valuegreaterthan);
console.log(movements.includes(3000));
//every method only returns true when all elements are true for the condition
console.log(account4.movements.every(mov => mov > 0)); //all movements are positive
console.log(account1.movements.every(mov => mov > 0)); //all movements are negative

//seperate callback
const deposits = mov => mov > 0;
console.log(movements.some(deposits));
console.log(movements.every(deposits));
console.log(movements.filter(deposits));

// to check if an element in array is also n array
let arr = [1, 2, 3, [2, 3, 4]];
console.log(Array.isArray(arr[3]));
console.log(Array.isArray(arr[2]));

//array flatening
const arr = [[1, 2, 3], [4, 5, 3], 7, 8];
console.log(arr.flat());
const arrDeep = [[1, [3, 2, [3482], 8], 3], [4, [2, 6, 7], 5, 3], [7, 2, 5], 8];
console.log(arrDeep.flat(2));
console.log(arrDeep.flat(3));
const arrnew = [1, 2, 3, [4, 3, [1, 2, 3]]];
console.log(arrnew.flat(5));

const overallbalance = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallbalance);

//flatMap does same thing as map and then flats the results

const overallbalance2 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallbalance);

*/
///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
]; */

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];
//solutions
//1.
const huskyWeight = breeds.find(br => (br.breed = 'Husky')).averageWeight;
console.log(huskyWeight);
//2.
const dogBothActivities = breeds.find(el =>
  el.activities.find(el => el == 'running' && 'fetch')
).breed;
console.log(`dogBothactivities is ${dogBothActivities}`);

//3.
const allActivities = breeds.flatMap(el => el.activities);
console.log(allActivities);
//4.
const uniqueActivities = new Set([...allActivities]);
console.log(uniqueActivities);
