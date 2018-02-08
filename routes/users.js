var express = require('express');
var jwt = require('jsonwebtoken');
var pool = require('../connections/ConnPool');
var utils = require('./Utils');

var router = express.Router();


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/detail', (req, res, next) => {
    console.log('detail', req.query)
    utils.verify(req, res, next)
}, (req, res) => {
    let info = ['username','fullname', 'lastlocation']
    let {username} = req.query

    pool.query('SELECT ?? FROM ACCOUNTINFO WHERE USERNAME = ?',
        [info, username],
        (err, rows, fields) => {
            if (!err) {
                res.send(rows)
            } else {
                res.send(err)
            }
        })
});

router.post('/login', (req, res) => {
    let {username, password} = req.query
    console.log('login with ', username, password)

    pool.query('SELECT * FROM ACCOUNT WHERE USERNAME = ?', [username], (err, rows, fields) => {
        if (!err) {
            let response = null;

            if (rows.length > 0) {
                let data = rows[0];

                if (password !== data.password) {
                    response = {errorCode: 2, msg: 'password incorrect', data: null}

                } else {
                    data.token = utils.sign(req, res)
                    response = {errorCode: 0, msg: 'login successful', data: data}
                }
            } else {
                response = {errorCode: 1, msg: 'not found', data: null}
            }

            res.send(response)

        } else {
            console.log('err', err)
            res.send(err.message)
        }
    })
})

module.exports = router;
