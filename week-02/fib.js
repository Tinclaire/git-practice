function fib(n) {
    if (n > 1) {
        return fib(n-2) + fib(n-1);
    } else if (n === 1) {
        return 1;
    } else {
        return 0;
    }
}

console.log(fib(0));
console.log(fib(1));
console.log(fib(5));
console.log(fib(10));