/**
 * Created by moehandi on 17/12/16.
 */

var jwtSimple	    = require('jwt-simple');
var moment          = require('moment');
var bcrypt          = require('bcryptjs');

var config          = require('../configs/config');
var User		    = require('../models/UserModel');

function createToken(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    };

    return jwtSimple.encode(payload, config.token_secret); // By Default Algorithm to encode is HS256
}

exports.isAuthenticated = function(req, res, next) {
    // console.log('REQUEST HEADER:\n' + JSON.stringify(req.headers));
    if(!(req.headers && req.headers['authorization'])) {
        return res.status(400).send({ message: 'Unauthorized, No Token Provided!' });
    }
    // var header = req.header['authorization'].split(' ');
    // var token = header[1];
    var token = req.headers['authorization'];
    var payload = jwtSimple.decode(token, config.token_secret);
    var now = moment().unix();

    if (now > payload.exp) {
        return res.status(401).send({ message: 'Token has expired.' });
    }

    User.findById(payload.sub, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User Token no longer Exists.' });
        }

        req.user = user;
        next();
    })
};

exports.login = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            return res.status(401).send({ message: { email: 'Incorrect email' } });
        }

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: { password: 'Incorrect password' } });
            }

            user = user.toObject();
            delete user.password; // remove pass from object to hide password

            var token = createToken(user);
            res.send({ token: token, user: user });
        });
    });
};

exports.signup = function (req, res) {
    if(req.body.email == undefined || req.body.email == "") {
        return res.status(409).send({message:'Email is already taken'});
    }
    User.findOne({email:req.body.email}, function (err, existingUser) {
        if(existingUser) {
            return res.status(409).send({message:'Email is already taken'});
        }

        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            admin: true
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;

                newUser.save(function (err) {
                    if (err) throw err;

                    console.log('User saved successfully');
                    var token = createToken(newUser);
                    res.send({status: 'success', user: newUser, token: token});
                });
            });
        });
    });
};

