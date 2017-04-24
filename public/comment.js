'use strict';

let modell = document.getElementsByClassName('model');
let btn = document.querySelectorAll('.addComment');
console.log(btn.length);
let span = document.getElementsByClassName('close');

let nrOfImages = btn.length;


for (let i = 0; i < nrOfImages; i++) {
    btn[i].addEventListener('click', function () {
        modell[i].style.display = 'block';
    });
    span[i].addEventListener('click', function () {
        modell[i].style.display = 'none';
    });
}

window.addEventListener('click', function () {
    for (let j = 0; j < nrOfImages; j++) {
        if (event.target === modell[j]) {
            modell[j].style.display = 'none';
        }
    }

});

//Klickar upp boxen för att skriva kommentar, och klicka ner boxen

let modellComments = document.getElementsByClassName('modelComments');
let button = document.querySelectorAll('.comments');
let closeButton = document.getElementsByClassName('closeComments');

for (let i = 0; i < button.length; i ++) {
    button[i].addEventListener('click', function () {
        modellComments[i].style.display = 'block';
    });
    closeButton[i].addEventListener('click', function () {
        modellComments[i].style.display = 'none';
    });
}

window.addEventListener('click', function () {
    for (let i = 0; i < button.length; i++) {
        if (event.target === modellComments[i]) {
            modellComments[i].style.display = 'none';
        }
    }
});

