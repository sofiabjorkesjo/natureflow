'use strict';

let router = require('express').Router();

router.route('/')
    .get(function (req, res) {
        res.render(('home/index'));
});