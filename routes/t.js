var express = require('express')
var router = express.Router()
var pool = require('../connections/ConnPool');

router.get('/list', (req, res, next) => {
    res.send([
        {
            id:1,
            name:'English'
        },
        {
            id:2,
            name:'Chemistry'
        },
        {
            id:3,
            name:'Biology'
        },
        {
            id:4,
            name:'Math'
        },

    ])

})


router.get('/user', (req, res, next) => {
    console.log('request',req.query)
    pool.query('select * from Account where username = ?',['cotgiotroi'], (err, rows, fields) => {
        let strRes = 'get info of user username = ' + req.query.username
        if(err){
            strRes = strRes +"\n" + err
            res.send(strRes)
        } else {
            res.send(rows[0])
        }
    })
})



router.post('/post', (req, res, next) => {
    console.log('here',req.query)
    res.send(req.query)
})


module.exports = router