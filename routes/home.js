'use strict';

let router = require('express').Router();
let User = require('../models/User');

router.route('/')
    .get(function (req, res) {
        res.render(('basic/index'));
});

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



module.exports = router;