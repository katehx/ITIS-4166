//funciton declaration

// function name(parameter list) {//body}

console.log(sum(2, 4));

function sum(a ,b) {
    return a + b;
}

console.log(sum(2, 4));


//funciton expression

// const name = function(parameter list) {/body};

//console.log(sumExp(5, 9));
// cannot call before it is defined

const sumExp = function(a, b) {
    return a + b;
};

console.log(sumExp(5, 9));


//arrow function (ES6)
// const name = (parameter list) => {//body};

const sumArrow = (a, b) => {
    return a + b
};

const sumArrow2 = (a, b) => a + b;

console.log(sumArrow2(2, 19));