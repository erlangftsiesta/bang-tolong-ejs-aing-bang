const express = require('express');
const app = express();
const conn = require('./config/db');
const BodyParser = require("body-parser");
const ejs = require('ejs');

app.use(express.static(("dist")));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs");
app.set("views", "src");

//all bug fixed, Status: OK!
app.get('/data-absensi-rpl3', function(req, res){
    const param = req.query;

    const queryStr = `SELECT * FROM rpl3`;

    conn.query(queryStr, (err, result)=> {
        if(err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.render("index", {rpl3: result});
            // res.status(200).json({
            //     "data": result
            // }) 
        }
    })
})

//all bug fixed, Status: OK!
app.post('/req-absensi-rpl3', function (req, res) {
    const param = req.body;
    const nama = param.nama;
    const absen = param.absen;
    const date = new Date();

    const queryStr = `INSERT INTO rpl3 (absen, nama, created_ad) VALUES (?,?,?)`;
    const values = [absen, nama, date];
    
    conn.query(queryStr, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })

        }
        else {
            res.redirect("/data-absensi-rpl3");
            // res.status(200).json( {
            //     "success": true,
            //     "message": "Sip Kesimpen",
            //     "data" : result
            // });
        }
    })
})

//all bug fixed, Status: OK!
app.get('/cari-data-absensi-rpl3', function(req, res){
    const param = req.query;
    const absen = param.absen;

    const queryStr = `SELECT * FROM rpl3 WHERE absen = ?`;
    const values = [absen];

    conn.query(queryStr, values, (err, result)=> {
        if(err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.render("cariData", {rpl3: result});
            // console.log(result)
            // res.status(200).json({
            //     "success": true,
            //     "Message": "berhasil memuat data",
            //     "data": result
            // });
        }
    })
})

//a few bug fixed, Status: Warning!
app.post('/update-absensi-rpl3', function (req, res) {
    const param = req.body;
    const id = param.id;
    const nama = param.nama;
    const absen = param.absen;
    const now = new Date();

    const queryStr = `UPDATE rpl3 SET nama = ?, absen = ? WHERE id = ? AND deleted_ad IS NULL`;
    const values = [nama, absen, id, now];
    
    conn.query(queryStr, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json( {
                "success": true,
                "message": "Sukses Merubah Data",
                "data": result
            });
        }
    });
});

app.post
app.listen(8000);