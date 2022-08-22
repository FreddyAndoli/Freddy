const express = require("express");
const app = express();
const mysql = require("./connection").con

// setup the server port
const port = process.env.PORT || 3010;
    // configuration
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))

// app.use(express.urlencoded())
// app.use(express.json())
// Routing
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/add", (req, res) => {
    res.render("add")

});
app.get("/search", (req, res) => {
    res.render("search")

});
app.get("/update", (req, res) => {
    res.render("update")

});

app.get("/delete", (req, res) => {
    res.render("delete")

});
app.get("/view", (req, res) => {
    let qry = "select * from incidents ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});



app.get("/addIncidents", (req, res) => {
    // fetching data from form
    const {TT_Number,ALARM_TIME,SITES,SITES_IMPACTED,ALARM,ESCALADE,ROOT_CAUSE,ACTION_DONE,CANCEL_TIME,DURATION,STATUS } = req.query

    // Sanitization XSS...
    let qry = "select * from incidents where TT_Number=?";
    mysql.query(qry, [TT_Number], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into incidents values(?,?,?,?,?,?,?,?,?,?,?)";
                mysql.query(qry2, [TT_Number,ALARM_TIME,SITES,SITES_IMPACTED,ALARM,ESCALADE,ROOT_CAUSE,ACTION_DONE,CANCEL_TIME,DURATION,STATUS], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", {mesg: true })
                    }
                })
            }
        }
    })
});


app.get("/searchIncidents", (req, res) => {
    // fetch data from the form


    const { TT_Number} = req.query;

    let qry = "select * from incidents where TT_Number=?";
    mysql.query(qry, [TT_Number], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updateIncidents", (req, res) => {

    const { TT_Number } = req.query;

    let qry = "select * from incidents where TT_Number=?";
    mysql.query(qry, [TT_Number], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/updateIncidents", (req, res) => {
    // fetch data

    const { phone, name, gender } = req.query;
    let qry = "update incidents set TT_Number=?,ALARM_TIME=?,SITES=?,SITES_IMPACTED=?,ALARM=?,ESCALADE=?,ROOT_CAUSE=?,ACTION_DONE=?,CANCEL_TIME=?,DURATION=?,STATUS=? WHERE TT_Number = ?";

    mysql.query(qry, [TT_Number,ALARM_TIME,SITES,SITES_IMPACTED,ALARM,ESCALADE,ROOT_CAUSE,ACTION_DONE,CANCEL_TIME,DURATION,STATUS], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })

});

app.get("/removeIncidents", (req, res) => {

    // fetch data from the form


    const { TT_Number } = req.query;

    let qry = "delete from incidents where TT_Number=?";
    mysql.query(qry, [TT_Number], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});
// listen to the port
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
});