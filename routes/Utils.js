
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

function Utils() {

    this.sign = function(req,res){

        let {username,password} = req.query
        const payload = {username: username, password: password};
        let token = jwt.sign(
            payload,
            'secret',
            {expiresIn: 10000000}
        );
        return token
    }

    this.verify = function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'secret', function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    console.log('decoded', decoded)
                    next();
                }
            });

        } else {
            return res.status(403).send({
                errorCode: -1,
                message: 'No token provided.'
            });
        }
    }
}

module.exports = new Utils()