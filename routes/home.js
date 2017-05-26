'use strict';

let router = require('express').Router();
let User = require('../models/User');
let Image = require('../models/Image');
let bcrypt = require('bcrypt-nodejs');
let http = require('http');
let fs = require('fs');
let Comment = require('../models/Comment');

/**
 * Gör mina routes för de sidor där jag inte använder sockets.
 */

//hämtar sidan för att registrera sig

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
                        console.log(User);
                        let checkUser = User.find({'username': req.body.username});
                        checkUser.exec().then(function (data) {
                            bcrypt.compare(req.body.password, data[0].password, function (error, result) {
                                if (result) {
                                    req.session.user = data[0];
                                    res.redirect('/images');
                                } else {
                                    res.redirect('/');
                                }
                            });
                        })
                    })
                    .catch(function (err) {
                        if (err) {
                            console.log('error rrr rr rr r ');
                            console.log(err);
                           req.session.flash = {
                               type: 'fail',
                               message: err.message + '. The password must be of minimum lenghh six characters, and the username four characters.'
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

//hämtar sidan för den som är inloggads profil

router.route('/profile')
    .get(function (req, res) {
        if(req.session.user) {

            //hittar de bilder vars ägare är samma som den som är inloggads användarnamn

             Image.find({owner: req.session.user.username}, function (error, images) {
                if (error) return console.log('error');
                 images.sort(function (a, b) {
                     return b.date - a.date;
                 });

                 //hittar kommentarerna som är till bilderna

                 Comment.find({}, function(error, comments) {
                     let images2 = [];
                     for (let i = 0; i < images.length; i++) {
                         images2[i] = {};
                         images2[i].path = images[i].path;
                         images2[i].owner = images[i].owner;
                         images2[i].date = images[i].date;
                         images2[i].ownerId = images[i].ownerId;
                         images2[i].id = images[i]._id;
                         images2[i].comments = [];
                         for (let j = 0; j < comments.length; j++) {
                             if (images[i]._id == comments[j].imageId) {
                                 let comment = {};
                                 comment.text = comments[j].text;
                                 comment.owner = comments[j].owner;
                                 comment.date = new Date(comments[j].date).toLocaleDateString() + " " + new Date(comments[j].date).toLocaleTimeString();
                                 images2[i].comments.push(comment);
                             }
                         }
                     }
                     res.render('basic/profile', {images: images2});
                 });
             })
        } else {
            res.redirect('/403');
        }
    })

    .post(function (req, res) {
        if (req.session.user) {

            //hittar och tar bort en bild

            Image.findOneAndRemove({_id: req.body.inputDelete}, function (err) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/profile');
            })
        } else {
            res.redirect('/403');
        }
    });

//hämtar sidan för den användare som man sökt efter på söksidan eller den som är länkad på bilderna

router.route('/profiles/:user')
    .get(function (req, res) {

            //hittar den som har samma användarnamn som det som skrivs in i sökrutan på search-sidan

            User.findOne({username: req.params.user}, function (error, data) {
                if (data) {

                    //hittar de bilder som har samma ownerId som användarens id, och de kommentarer som hör till bilderna

                    Image.find({ownerId: data._id}, function (error, images) {
                        if (error) return console.log('error');
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
                                images2[i].ownerId = images[i].ownerId;
                                images2[i].id = images[i]._id;
                                images2[i].comments = [];
                                for (let j = 0; j < comments.length; j++) {
                                    if (images[i]._id == comments[j].imageId) {
                                        //console.log("comment!");
                                        let comment = {};
                                        comment.text = comments[j].text;
                                        comment.owner = comments[j].owner;
                                        comment.date = new Date(comments[j].date).toLocaleDateString() + " " + new Date(comments[j].date).toLocaleTimeString();
                                        images2[i].comments.push(comment);
                                    }
                                }
                            }
                            res.render('basic/profiles', {images: images2, data: req.params.user});
                        });
                    })
                } else {
                    req.session.flash = {
                        type: 'fail',
                        message: 'Sorry, the user does not exist.'
                    };
                    res.redirect('/search');
                }
            });
    });

//hämtar sidan för att söka efter användare och sökord till bilderna.

router.route('/search')
    .get(function (req, res) {
        if (req.session.user) {
            let test = req.session.user;
            res.render('basic/search');
        } else {
            res.redirect('/403');
        }
    })

    //postar och redirectar till sidan för en användare eller sökord

    .post(function(req, res) {
        let word = req.body.searchWord;
        let user = req.body.searchUser;

        if (word) {
            res.redirect('/search/' + word);
        } else if (user){
            res.redirect('/profiles/' + user);
        } else {
            req.session.flash = {
                type: 'fail',
                message: 'You must write a word in the box'
            };
            res.redirect('/search');
        }
    });

//hämtar sidan för de sökord som man har sökt på söksidan

router.route('/search/:word')
    .get(function (req, res) {
        if (req.session.user) {

            //hittar de bilder som har samma sökord som det som skrivits in i sökrutan

            Image.find({hashtags: req.params.word}, function (error, images) {
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
                        for (let j = 0; j < comments.length; j++) {
                            if (images[i]._id == comments[j].imageId) {
                                let comment = {};
                                comment.text = comments[j].text;
                                comment.owner = comments[j].owner;
                                comment.date = new Date(comments[j].date).toLocaleDateString() + " " + new Date(comments[j].date).toLocaleTimeString();
                                images2[i].comments.push(comment);
                            }
                        }
                    }

                    //om det inte finns någon bild som matchar sökordet så får man flashmeddelande

                    if (images2.length === 0){
                        req.session.flash = {
                            type: 'fail',
                            message: 'There are no matching images'
                        };
                        return res.redirect('/search');
                    }
                    res.render('basic/search', {images: images2, word: req.params.word});
                });
            })
        } else {
            res.redirect('/403');
        }
    });

//Hämtar sidan för 403 fel

router.route('/403')
    .get(function (req, res) {
        res.render('error/403');
    });

module.exports = router;
