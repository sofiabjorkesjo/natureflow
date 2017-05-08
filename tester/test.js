let chai = require('chai');
let expect = require('chai').expect;
//let file = require('../routes/home');
let app = require('../app');

let assert = require('assert');
let http = require('http');

// describe('get Images', function () {
//     it('should get all the images', function () {
//         chai.request(app)
//             .get('/images')
//             .end((err, res))
//     })
// })

describe('HTTP server test', function () {


    describe('/', function () {
        it('Connected to live server', function (done) {
            http.get('http://46.101.200.103:3000/', function (response) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });
        it('Connected to local server', function (done) {
            http.get('http://localhost:3000/', function (response) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });
    });
});