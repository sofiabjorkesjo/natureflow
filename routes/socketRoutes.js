'use strict';

module.exports = function (io) {

    let router = require('express').Router();
    let User = require('../models/User');
    let Image = require('../models/Image');
    let Comment = require('../models/Comment');
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