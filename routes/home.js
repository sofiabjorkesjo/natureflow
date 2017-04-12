'use strict';

let router = require('express').Router();
let User = require('../models/User');
let Image = require('../models/Image');
let bcrypt = require('bcrypt-nodejs');
let http = require('http');
let fs = require('fs');
let btoa = require('btoa');
let bodyParser = require('body-parser');

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

//hämar sidan för att ha loggad ut

router.route('/logged-out')
    .get(function (req, res) {
        req.session.destroy();
        res.locals.user = undefined;
        res.render('basic/logged-out');
    });

router.route('/upload')
    .get(function (req, res) {

            res.render('basic/upload');


    })
    .post(function (req, res) {
        //if (req.session.user) {
            let image = req.files.imgFile;

            let imageName = req.session.user.username + '_' + (Math.random() * 1000000000) + '_' + req.files.imgFile.name;

            image.mv('public/images/' + imageName, function(error) {
                if (error) return console.log(error);

                console.log("yay");

                let image = new Image({
                    path: imageName,
                    owner: req.session.user.username
                });

                image.save(function(error) {
                    if (error) return console.log("error :(");

                    console.log("yay");

                    res.redirect('/images');
                });
            });

    });


router.route('/images')
    .get(function (req, res) {
        // Image.find({owner: req.session.user.username}, function (error, data) {
        Image.find({}, function (error, data) {
            if (error) return console.log("error");

            res.render("basic/images", {images: data});

    });
    });

router.route('/profile')
    .get(function (req, res) {
        if (req.session.user) {
            res.render('basic/profile');
        } else {
            res.redirect('/403');
        }

    });


router.route('/403')
    .get(function (req, res) {
        res.render('error/403');
    });

module.exports = router;