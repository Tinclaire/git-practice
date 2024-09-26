export default class Stack {
    // # -> private. only be accessed within the class
    // without # -> public. writable, enumerable, and configurable outside the class
    #items;

    constructor() {
        this.#items = [];
    }

    // 在 stack 頂部加入元素i
    push(element) {
        this.#items.push(element);
    }

    // 移除並回傳 stack 頂部的元素
    pop() {
        if(this.isEmpty()) {
            return null;
        } else {
            return this.#items.pop();
        }
    }

    // 回傳 stack 頂部的元素，但不移除它
    peek() {
        if(this.isEmpty()) {
            return null;
        } else {
            let lastIndex = this.#items.length - 1;
            return this.#items[lastIndex];
        }
    }

    // 檢查 stack 是否為空
    isEmpty() {
        return this.#items.length === 0 ? true : false;
    }

    // 回傳 stack 中元素的個數
    size() {
        return this.#items.length;
    }

    // 清空 stack
    clear() {
        this.#items = [];
    }

    // 印出 stack 內容
    print() {
        this.#items.forEach( item => {
            console.log(item);
        })
    }
}