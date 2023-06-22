const express = require('express');
const app = express();
const conn = require('./config/db');
const ejs = require('ejs');

app.set("view engine", "ejs");
app.set("views", "src");

app.use(express.json());

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
            res.status(200).json({
                "data": result
            })
        }
    })
})

//all bug fixed, Status: OK!
app.post('/req-absensi-rpl3', function (req, res) {
    const param = req.body;
    const name = param.nama;
    const absen = param.absen;
    const date = new Date();

    const queryStr = "INSERT INTO rpl3 (nama, absen, created_ad) VALUES (?, ?, ?)";
    const values = [name, absen, date];
    
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
            res.status(200).json( {
                "success": true,
                "message": "Sip Kesimpen",
                "data" : result
            });
        }
    })
})

//all bug fixed, Status: OK!
app.get('/cari-data-absensi-rpl3', function(req, res){
    const param = req.query;
    const absen = param.absen;

    const queryStr = `SELECT * FROM rpl3 WHERE absen = ${absen}`;
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
            console.log(result)
            res.status(200).json({
                "success": true,
                "Message": "berhasil memuat data",
                "data": result
            });
        }
    })
})

//a few bug fixed, Status: Warning!
app.post('/update-absensi-rpl3', function (req, res) {
    const param = req.body;
    const id = param.id;
    const nama = param.nama;
    const absen = param.absen;
    const date = new Date();

    const queryStr = `UPDATE rpl3 SET nama = ?, absen = ? WHERE id = ? AND deleted_ad IS NULL`;
    const values = [nama, absen, id];
    
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
app.listen(8000);