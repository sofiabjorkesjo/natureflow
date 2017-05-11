'use strict';

let newInput = document.getElementById('upload');
let fileInput = document.getElementById('uploadPicture');

newInput.addEventListener('click', function () {
    fileInput.click();
});

