//let: global scope or block scope

let a = 10; //global scope

if (a > 1) {
    let b = 5; //block scope
    a = a * b;
}

console.log(a);

// console.log(b); //error because block scope

//const: constants whose values cannot be changed

const aa = 10;
// aa = 5; cannot do this

log.console(aa);

//var: globl scope or function scope

var aaa = 10; //global scope

function double() {
    var bbb = a * 2; 
}

console.log(aaa);
double();
//console.log(bbb); // funciton scope - will cause error