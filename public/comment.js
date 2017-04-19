'use strict';

let modal = document.getElementById('myModal');
let btn = document.querySelectorAll('.addComment');
console.log(btn.length);
let span = document.getElementsByClassName('close')[0];


for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        modal.style.display = 'block';
    });
}

span.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function () {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

//Klickar upp boxen för att skriva kommentar, kan klicka ner den också,

