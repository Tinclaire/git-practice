// recursion
function fib(n) {
    if (!Number.isInteger(n) || n < 0) {
        return "Invalid input: n must be non-negative integer";
    }

    if (n > 1) {
        return fib(n-2) + fib(n-1);
    } else {
        return n;
    }
}

// iteration
function fib2(n) {
    if (!Number.isInteger(n) || n < 0) {
        return "Invalid input: n must be non-negative integer";
    }
    if (n < 2) {
        return n;
    }

    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

console.log(fib(0));
console.log(fib(1));
console.log(fib(5));
console.log(fib(10));