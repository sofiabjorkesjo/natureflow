'use strict';

let modal = document.getElementsByClassName('modal');
let btn = document.querySelectorAll('.addComment');
console.log(btn.length);
let span = document.getElementsByClassName('close');

let nrOfImages = btn.length;


for (let i = 0; i < nrOfImages; i++) {
    btn[i].addEventListener('click', function () {
        modal[i].style.display = 'block';
    });
    span[i].addEventListener('click', function () {
        modal[i].style.display = 'none';
    });
}

window.addEventListener('click', function () {
    for (let j = 0; j < nrOfImages; j++) {
        if (event.target === modal[j]) {
            modal[j].style.display = 'none';
        }
    }

});



//Klickar upp boxen för att skriva kommentar, och klicka ner boxen


