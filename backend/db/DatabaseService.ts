import fs from "fs"

class DatabaseService {
    constructor(this, data) {
        this.data = fs.readFileSync('./database.json')
    }
    getItem(this, item) {
        console.log(this.data)
    }
}
