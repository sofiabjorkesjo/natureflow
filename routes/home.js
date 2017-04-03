'use strict';

let router = require('express').Router();
let User = require('../models/User');
let bcrypt = require('bcrypt-nodejs');

//hämtar startsidan

router.route('/')
    .get(function (req, res) {
        User.find({}, function (error, data) {
            let context = {
                users: data.map(function (data) {
                    return {
                        username: data.username,
                        password: data.password
                    };
                })
            };
            res.render('basic/index', context);

        });

    })
    .post(function (req, res) {
        let checkUser = User.find({'username': req.body.username});
        checkUser.exec().then(function (data) {
            bcrypt.compare(req.body.password, data[0].password, function (error, result) {
                if (result) {
                    req.session.user = data[0];
                    //req.locals.user = req.session.user;
                    res.redirect('/images');
                } else {
                    console.log('nu funkar det inte');
                    console.log(error);
                    res.redirect('/sign-up')
                }
            });
        })
            .catch(function (err) {
                if (err) {
                    console.log('nu är det ett error');
                    console.log(err);

                    res.redirect('/');
                }
            })
    });

//hämtar sidan för att sign up
//skapar en ny user, kollar om den finns, annars sparar den.

router.route('/sign-up')
    .get(function (req, res) {
            res.render('basic/sign_up');
    })
    .post(function (req, res) {
            let userObject = new User({
                    username: req.body.username,
                    password: req.body.password
            });

            User.findOne({username: req.body.username}).then(function (data) {
                    if (data) {
                            console.log('user finns redan');
                    } else {
                            userObject.save()
                                .then(function () {
                                        console.log(userObject);
                                        res.redirect('/')
                                })
                                .catch(function (err) {
                                        if (err) {
                                                console.log(err);
                                        }
                                        res.redirect('/sign-up');
                                });
                    }
            });

        });

router.route('/logged-out')
    .get(function (req, res) {
        req.session.destroy();
        res.locals.user = undefined;
        res.render('basic/logged-out');
    });

router.route('/images')
    .get(function (req, res) {
        res.render('basic/images');
    });



module.exports = router;