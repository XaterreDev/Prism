const mysql = require("mysql")
require('colors')
const Database = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : "prism_bot"
})
Database.connect(function (err){
    if(err) throw err
    console.log("La base de données a été connéctée avec succès".bgGreen)
}) 

module.exports = Database;