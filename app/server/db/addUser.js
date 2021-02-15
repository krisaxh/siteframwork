//==================================================//
//                                                  //
//   Set desired_username and desired_password      //
//   Afterwords just run the .js script in node.js  //
//                                                  //
//==================================================//
const desired_username = "defaultuser"
const desired_password = "defaultpassword"
//#
const fs = require('fs'),
    crypto = require('crypto')
// Create a backup of database
let date = new Date();  // backup_year_month_day_bytes.json
const backup = './backup_' + date.getFullYear() + '_' + (parseInt(date.getMonth())+1) + '_' + date.getDate() + '_' + fs.statSync('./database.json').size + '.json'
fs.copyFile('./database.json', backup, (e) => { if (e) throw e; })
const password = crypto.pbkdf2Sync(desired_password, 'salt', 5000, 256, 'sha512').toString('hex')
// Write to storage the update database
let db =  require('./database.json')
db.users[desired_username] = {"id": Object.keys(db.users).length, "password": password}
fs.writeFile('./database.json', JSON.stringify(db, null, 4), (e) => { if (e) throw e; })