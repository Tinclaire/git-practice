// ary: number array
function sum(ary) {
    let sum = 0;
    ary.forEach(number => {
        sum += number;
    });

    return sum;
}

console.log(sum([1, 5, 3, 2]));

// Way2: with reduce()
function sum2(ary) {
    let sum = ary.reduce((accumulator, current) => {
        return accumulator + current; // The next value of accumulator
    }, 0); // accumulator's initial value. If omit it, array[0] and array[1] will be accumulator and current.
    return sum;
}

// Way3: recursion
function sum3(ary) {
    if (ary.length === 0) {
        return 0;
    } else {
        return ary[0] + sum3(ary.slice(1)); // slice(n, s) retain elements from index n to s-1
    }
}


// n: number
function sumNumber(n) {
    return (1+n)*n/2;
}