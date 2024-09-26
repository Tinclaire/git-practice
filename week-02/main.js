import Stack from './stack.js';

let stack = new Stack();
stack.print();

stack.push(5);
stack.push(8);
stack.print();


console.log(`\n------Start to check pop()------`)
let pop = stack.pop();
console.log(`Pop out value: ${pop}`)
console.log(`rest of stack value...`)
stack.print();
console.log(`---------------END---------------\n`)

console.log(`\n------Start to check pop()------`)
let peek = stack.peek();
console.log(`Peek value: ${peek}`)
console.log(`rest of stack value...`)
stack.print();
console.log(`---------------END---------------\n`)


console.log(`Empty check: ${stack.isEmpty()}`)
console.log(`Length of stack: ${stack.size()}`)

stack.clear()
console.log(`Empty check after clear(): ${stack.isEmpty()}`)


console.log(`\n-----Check pop() and peek() when stack is empty-----`)
pop = stack.pop();
console.log(`Pop out value: ${pop}`)
peek = stack.peek()
console.log(`Peek value: ${peek}`)
console.log(`-------------------------END-------------------------\n`)