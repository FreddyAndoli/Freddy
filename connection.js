const mysql = require("mysql")
const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Database Connected Successfully!!!");
});

module.exports.con = con;