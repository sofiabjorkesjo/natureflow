'use strict';

//när jag klickar på knappen newInput så klickar man på knappen fileInput. Detta för att få texten på input till engelska.

let newInput = document.getElementById('upload');
let fileInput = document.getElementById('uploadPicture');

newInput.addEventListener('click', function () {
    fileInput.click();
});

