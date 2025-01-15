//forEach(function): calls the argument function on each element in an array
// always returns undefined, it cannot be used to modify the elements in an array

const nums = [1, 3, 5, 7, 9];

nums.forEach((num) => console.log(num));

//map(function): creates and returns a new array with values that are returned by calling the argument funciton on eaech element

console.log(nums.map(num => num *= 2));
console.log(nums);

//find(function): tests each element with the argument function. returns the value of the first element that satisfies tthe argument function
//argument function returns a Boolean type value.

console.log(nums.find(function(num) {
    return num > 10;
}));

console.log(nums.find(num => num > 10));

//findIndex(function): works similar as find(). but it returns the index of the first element that satifies the argument function

console.log(nums.findIndex(num => num > 5));