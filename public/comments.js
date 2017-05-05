'use strict';

let modell = document.getElementsByClassName('model');
let btn = document.querySelectorAll('.addComment');
console.log(btn.length);
let span = document.getElementsByClassName('close');



let nrOfImages = btn.length;


for (let i = 0; i < nrOfImages; i++) {
    btn[i].addEventListener('click', function () {
        modell[i].style.display = 'block';
        Clear();
    });
    span[i].addEventListener('click', function () {
        modell[i].style.display = 'none';
        Clear();
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
        console.log('sss');
        modellComments[i].style.display = 'none';


    });
}

window.addEventListener('click', function () {
    for (let i = 0; i < button.length; i++) {
        if (event.target === modellComments[i]) {
            console.log('sssjjjjj');
            modellComments[i].style.display = 'none';
          //  Clear();
        }
    }
});

//räknar ner antal tecken i en kommentat

let textarea = document.querySelectorAll('.messageComment');
let feedback = document.querySelectorAll('.feedback');
for(let i = 0; i < nrOfImages; i++) {
    for(let j = 0; j < textarea.length; j++) {
        for (let a = 0; a < feedback.length; a++) {
           textarea[j].addEventListener('keyup', function () {
               if(textarea[j].value.length > 30) {
                   return false;
               }
               feedback[a].textContent = 'kvar:' +(30-textarea[j].value.length);
           });
        }
    }
}

//sätter kommentarsfältet till tomt och nedräkningen återställs

function Clear() {
    for(let i = 0; i < nrOfImages; i++) {
        for(let j = 0; j < textarea.length; j++) {
           textarea[j].value = '';
           for (let a = 0; a < feedback.length; a++) {
               feedback[a].textContent = 'kvar:' +(30-textarea[j].value.length);
           }
        }
    }
}






