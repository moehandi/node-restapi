/**
 * Created by moehandi on 17/12/16.
 */
var User = require('../models/UserModel');

exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'User Created Successfully' });
    });
};

exports.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};

exports.getUsersById = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);

        res.json(user);
    });
};

exports.putUsersById = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {

        if(err) res.send(err);

        user.name = req.body.name;
        user.desc = req.body.desc;
        user.priority = req.body.priority;

        user.save(function (err) {
            if (err) res.send(err);

            res.json(user)
        });
    }) ;
};

exports.deleteUsersById = function (req, res) {
    User.findByIdAndRemove(req.params.user_id, function (err, user) {
        if(err) res.send(err);

        res.json({message: 'User Deleted.'});
    });
};
