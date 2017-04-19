'use strict';

let modal = document.getElementById('myModal');
let btn = document.querySelectorAll('.addComment');
console.log(btn.length);
let span = document.getElementsByClassName('close')[0];


for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        modal.style.display = 'block';
    };

}


span.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

//funkar inte med class, måste loopa igenom alla .
