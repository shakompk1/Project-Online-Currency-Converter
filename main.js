class Convert {
    constructor(firstCurrency, secondCurrency) {
        this.firstCurrency = firstCurrency;
        this.secondCurrency = secondCurrency;
    }
    show(){
        return `${this.name} ${this.age} ${this.sex}`
    }
}
let user = new Convert('Shako',18,'M');
console.log(user.show());