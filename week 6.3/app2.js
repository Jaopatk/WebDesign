var express = require('express')
const req = require('express/lib/request')
var app = express()
var fs = require('fs')
var users = []


//-------------GET Method----------------//
app.get('/getUsers', function (req, res) {
    fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
        if (err) throw err
        console.log(data)
        res.end(data)
    })
})


//GET http:localhost:8081/insertUser/Sue/5555/student/5
app.get('/insertUser/:name/:password/:occu/:id', function (req, res) {
    fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
        if (err) throw err

        users = JSON.parse(data)

        var nuser = {
            ["user" + req.params.id]: {
                "name": req.params.name,
                "password": req.params.password,
                "occupation": req.params.occupation,
                "id": req.params.id
            }
        }
        users["user" + req.params.id] = nuser

        console.log(users)
        res.end(JSON.stringify(users, null, 2))

        //overwrite user.json
        fs.writeFile("./user.json", JSON.stringify(users, null, 2), "utf8", function (err, data) {
            if (err) throw err
        });
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port)
})
