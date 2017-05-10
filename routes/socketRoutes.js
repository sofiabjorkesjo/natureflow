'use strict';

module.exports = function (io) {

    let router = require('express').Router();
    let User = require('../models/User');
    let Image = require('../models/Image');
    let Comment = require('../models/Comment');
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
                Image.find({}, function (error, images) {
                    let allImages = {
                        imgs: images.map(function (images) {
                            return {
                                path: images.path,
                                owner: images.owner,
                                date: images.date,
                                //imageId: images.imageId
                            };
                        })
                    };
                    console.log('hejhejkekeee');
                    console.log(allImages);
                    if (error) return console.log("error");
                    io.emit('images', allImages);
                    res.render('basic/index', {context, allImages});
                })
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


    //hittar och visar alla bilder

    router.route('/images')
        .get(function getImages (req, res) {
            if (req.session.user) {
                // Image.find({owner: req.session.user.username}, function (error, data) {
                Image.find({}, function Test (error, images) {
                    // console.log(images);
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
                                    // console.log("comment!");
                                    let comment = {};
                                    comment.text = comments[j].text;
                                    comment.owner = comments[j].owner;
                                    //comment.date = new Date(comments[j].date).toLocaleString();
                                    comment.date = new Date(comments[j].date).toLocaleDateString() + " " + new Date(comments[j].date).toLocaleTimeString();
                                    images2[i].comments.push(comment);
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
                io.emit('hej', 'hej');
                console.log('test comment');
                console.log(req.body.imageId);
                let comment = new Comment({
                    text: req.body.comment,
                    owner: req.session.user.username,
                    date: Date.now(),
                    imageId: req.body.imageId
                });
                console.log(comment);

                comment.save()
                    .then(function () {
                        io.emit("comment", comment);

                        res.redirect('/images');
                    })
                    .catch(function (err) {
                        if (err) {
                            console.log(err);
                            console.log('error comments');
                            req.session.flash = {
                                type: 'fail',
                                message: err.message + ' The comment must be max 30 characters and minumum 1 charachters'
                            };
                            res.redirect('/images');
                        }
                        res.redirect('/images');

                    })
            }
        });

    return router;

};