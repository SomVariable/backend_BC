export class UniqueNumberGenerator {
    constructor(){}
    
    static generateRandomNumber() {
        const cash = []
        const randomNum = Math.floor(Math.random() * 10000000000)

        if(cash.some(e => e === randomNum)){
            this.generateRandomNumber()
        }

        cash.push(randomNum)

        return randomNum
    }
}