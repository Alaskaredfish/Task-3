// Import login model
User = require('./userModel');
// Initialise bcrypt
let bcrypt = require('bcrypt');
const e = require('express');
const { ROLE } = require('./data')
const { authUser, authRole } = require('./authenticate_authorise/basicAuth')

// Handle user registration
exports.register = async function (req, res) {
    try {
        var user = new User();
        user.username = req.body.username ? req.body.username : user.username;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.role = req.body.role;
        user.save();
        res.status(201).send();
    } catch {
        res.status(500).send('Registration failed');
    }
};

// Handle view registered user, only admin are authorized to view
exports.view = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

/*
// Handle user login
exports.login = async function (req, res) {
    const query = {username: req.body.username};
    try {
        const user = await User.findOne(query);
        if (user == null){
            res.status(400).send('Cannot find user') 
        }
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send('sucess')
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
}
*/
