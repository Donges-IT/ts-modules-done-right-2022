export default class MyCustomClass {

    constructor() {
        console.log("Hello World from",this.constructor.name);
    }
}

console.log("MyCustomClass laoded")