'use strict';

let router = require('express').Router();
let User = require('../models/User');
let Image = require('../models/Image');
let bcrypt = require('bcrypt-nodejs');
let http = require('http');
let fs = require('fs');
let Comment = require('../models/Comment');

//hämtar startsidan & hittar alla användare som finns registrerade

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

    // kollar om användaren finns registrerad
    .post(function (req, res) {
        let checkUser = User.find({'username': req.body.username});
        checkUser.exec().then(function (data) {
            bcrypt.compare(req.body.password, data[0].password, function (error, result) {
                if (result) {
                    req.session.user = data[0];
                    res.redirect('/images');
                } else {
                    req.session.flash = {
                        type: 'fail',
                        message:'Wrong username or password.'
                    };
                    res.redirect('/');
                }
            });
        })
            .catch(function (err) {
                if (err) {
                    req.session.flash = {
                        type: 'fail',
                        message:'Wrong username or password.'
                    };
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

        //hittar en användare

        User.findOne({username: req.body.username}).then(function (data) {
            if (data) {
                req.session.flash = {
                    type: 'fail',
                    message: 'This username already exist. Please try another one.'
                };
                res.redirect('/sign-up');
            } else {
                userObject.save()
                    .then(function () {
                        res.redirect('/')
                    })
                    .catch(function (err) {
                        if (err) {
                           req.session.flash = {
                               type: 'fail',
                               message: err.message + '. The password must be of minimum lenghh six charachters, and the username four charachters.'
                           };
                        }
                        res.redirect('/sign-up');
                    });
            }
        });

    });

//hämar sidan för att ha loggad ut o sätter användaren till undefind

router.route('/logged-out')
    .get(function (req, res) {
        req.session.destroy();
        res.locals.user = undefined;
        res.render('basic/logged-out');
    });

//hämtar sidan för att ladda upp en bild

router.route('/upload')
    .get(function (req, res) {
        if (req.session.user) {
            res.render('basic/upload');
        } else {
            res.redirect('/403');
        }
    })

    //sparar bilden på servern och databasen när den laddas upp

    .post(function (req, res) {
        if (req.session.user) {
            let image = req.files.imgFile;
            if (image){
                 let imageName = req.session.user.username + '_' + (Math.random() * 1000000000) + '_' + req.files.imgFile.name;
                 image.mv('public/images/' + imageName, function(error) {
                      if (error) {

                        console.log('error här');
                        return console.log(error);
                      }
                  let image = new Image({
                    path: imageName,
                    owner: req.session.user.username,
                    date: Date.now()
                });

                image.save(function(error) {
                    if (error) return console.log("error :(");
                    res.redirect('/images');
                });
            })
            } else {
                //Inget flash meddelande, fixa.

                req.session.flash = {
                    type: 'fail',
                    Message: 'You must select a photo to upload.'
                };
                console.log('feeel');
                res.redirect('/upload');
            }

        } else {
            res.redirect('/403');
        }
    });

//hittar och visar alla bilder

router.route('/images')
    .get(function (req, res) {
        if (req.session.user) {
            // Image.find({owner: req.session.user.username}, function (error, data) {
            Image.find({}, function (error, images) {
                if (error) return console.log("error");
                images.sort(function (a, b) {
                    return b.date - a.date;
                });

                Comment.find({}, function(error, comments) {
                    let images2 = [];
                    for (let i = 0; i < images.length; i++) {
                        images2[i] = {};
                        images2[i].path = images[i].path;
                        images2[i].owner = images[i].owner;
                        images2[i].date = images[i].date;

                        images2[i].id = images[i]._id;

                        images2[i].comments = [];
                        // Add comments
                        // console.log(comments);
                        for (let j = 0; j < comments.length; j++) {
                            if (images[i]._id == comments[j].imageId) {
                                console.log("comment!");
                                images2[i].comments.push(comments[j]);
                            }
                        }
                    }

                    res.render('basic/images', {images: images2});
                });
            })
        } else {
            res.redirect('/403');
        }
    })

    //postar kommentarer till bilderna.


    .post(function (req, res) {
        if (req.session.user) {
            console.log(req.body.imageId);
            let comment = new Comment({
                text: req.body.comment,
                owner: req.session.user.username,
                date: Date.now(),
                imageId: req.body.imageId
            });
            comment.save()
                .then(function () {
                    res.redirect('/images');
                })
                .catch(function (err) {
                    if (err) {
                        console.log(err);
                        console.log('error comments');
                    }
                })
        }
    });

router.route('/profile')
    .get(function (req, res) {
        if(req.session.user) {
             Image.find({owner: req.session.user.username}, function (error, data) {
                if (error) return console.log('error');
                 data.sort(function (a, b) {
                     return b.date - a.date;
                 });
                 res.render('basic/profile', {images: data});
             })
        } else {
            res.redirect('/403');
        }
    });


router.route('/403')
    .get(function (req, res) {
        res.render('error/403');
    });

module.exports = router;