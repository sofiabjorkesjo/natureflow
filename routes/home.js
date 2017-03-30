'use strict';

let router = require('express').Router();

router.route('/')
    .get(function (req, res) {
        res.render(('basic/index'));
});

router.route('/sign-up')
    .get(function (req, res) {
            res.render('basic/sign_up');
    });

module.exports = router;