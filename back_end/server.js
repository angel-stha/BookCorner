const express = require('express');
const mysql = require('mysql');
const bodyparser =require('body-parser');
const cors = require('cors');
var app = express();
var jwt = require("jsonwebtoken");

app.use(cors())
//Configuring express server
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



//MYSQl connection and details
var mysqlConnection = mysql.createConnection({
    host:'books.c1vamkpv4k1c.us-east-1.rds.amazonaws.com',
    port:'3306',
    user:'admin',
    password:'angelshrestha',
    database:'bookcorner',
    insecureAuth: true,
    multipleStatements:true

});
mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed'+JSON.stringify(err,undefined,2));
});
// app.use((req, res, next) => {
//         mysqlConnection.query("SELECT * FROM users where name = '" + req.body.name + "'", (err, rows, fields) => {
//             if (err) throw err;
//             if (rows && rows.length > 0) {
//                 req.user = rows[0];
//                 console.log('vhiya')
//                 console.log(req.user)
//
//             }
//         })
//     }
// )
app.get('/',(req,res)=> {
    res.json("OK")
})
app.use((req,res,next)=> {

    mysqlConnection.query("SELECT * FROM users where name = '" + req.body.name + "'", (err, rows, fields) => {
        if (err) throw err;
        if (rows && rows.length > 0) {
            req.user = rows[0];
            console.log('vhiya')
            console.log(req.user)
            next();
        }
    })
});
app.post("/addbook", function(req, res) {
    console.log(req.body.Title);
    mysqlConnection.query("SELECT * FROM bookcorner.book where bookname = '" + req.body.Title + "' AND author = '" + req.body.Author + "'", (err, rows, fields) => {
        if (err) throw err;
        if (rows && rows.length > 0) {
            if (req.body.pass === rows[0].password) {
                console.log(rows[0])
            } else {
                res.send("Book Already in the Stack please review there")
            }
        } else {
            mysqlConnection.connect(function () {

                    var sql = "INSERT INTO `bookcorner`.`book` (`bookname`, `author`) VALUES ('" + req.body.Title + "','" + req.body.Author + "')";
                    mysqlConnection.query(sql, function (err, result) {
                        if (err) throw err;
                        else console.log("1 book inserted");
                    });
                }
            )
        }
        ;


    })
})
app.post("/login", function(req, res){
    console.log(req.body.name)
    mysqlConnection.query("SELECT * FROM bookcorner.users where name = '" + req.body.name + "'", (err, rows, fields) => {
        if (rows && rows.length > 0){
            if(req.body.pass === rows[0].password){
                res.status(200).json({
                    name: rows[0].name,
                })


            }
            else{
                res.json(err)
            }
        }
        else{
            mysqlConnection.connect(function () {

                    var sql = "INSERT INTO `bookcorner`.`users` (`name`, `password`) VALUES ('"+ req.body.name+ "','" + req.body.password + "')";
                    mysqlConnection.query(sql, function(err, result) {
                        if (err) throw err;
                        else {
                            console.log("Record inserted");
                            res.status(200).json({
                                // email:rows[0].email,
                                name: rows[0].name,
                            })
                    };
                }
            )}
            )};
    })

})
app.get("/getbook",function(req,res){
    mysqlConnection.connect(function() {
        var dataquery =  "SELECT * FROM `bookcorner`.`book`";
        mysqlConnection.query(dataquery, function(err, results, fields) {
            if (!err)
                console.log(results);
            res.send(results);
        });
    });
});
app.post("/addReview",function(req,res){
    console.log(req.body.Review);
    console.log(req.body.Title);
    console.log(req.body.Author);
    mysqlConnection.connect(function() {
        var AddReviewQuery= "INSERT INTO `bookcorner`.`reviewbook`(`bookname`,`review`,`byuser`,`date`,`author`) VALUES('"+req.body.Title+"','"+req.body.Review+"','Angel','"+req.body.Date+"','"+req.body.Author+"')";
        mysqlConnection.query(AddReviewQuery,function(err,add_comment,fields){
            if(!err){
                res.send('Comment Added');
                console.log(add_comment);
            }
        })
    })
})
app.get("/viewReview", function(req, res) {
    var title = req.param("Title");
    console.log(title);
    mysqlConnection.connect(function() {

        var hs =
            "SELECT * FROM `bookcorner`.`reviewbook` WHERE bookname = '" + title +"'";
        mysqlConnection.query(hs, (err, rows, fields) => {
            if (!err)
                res.json(rows);
            console.log(rows);
        });

    });
});
app.post("/getmydata", function(req, res){
    console.log("ok")
    console.log(req.user)

})
app.get("/getusers",function(req,res){
    mysqlConnection.connect(function() {
        var query =  "SELECT * FROM `bookcorner`.`users`";
        mysqlConnection.query(query, function(err, results, fields) {
            if (!err)
                console.log(results);
            res.send(results);
        });
    });
});
const port = 3302;
app.listen(port,()=>console.log(`Listening to the port ${port}`))