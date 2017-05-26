'use strict';


/**
 * Klickar upp och klickar ner boxen för att skriva en kommentar och för att läsa kommentarerna
 */

let modell = document.getElementsByClassName('model');
let btn = document.querySelectorAll('.addComment');
let span = document.getElementsByClassName('close');
let nrOfImages = btn.length;

//går igenom alla bildernas knappar addComment och visar boxen för att kommentera om man klickar på den aktuella knappen.
//om man klickar på krysser så visas inte boxen.

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

//när man klickar på fönstret utanför boxen så stängs boxen ner

window.addEventListener('click', function () {
    for (let j = 0; j < nrOfImages; j++) {
        if (event.target === modell[j]) {
            modell[j].style.display = 'none';
        }
    }

});

//Klickar upp boxen för att läsa kommentar, och klicka ner boxen

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

//när man klickar på fönstret utanför boxen så stängs boxen ner

window.addEventListener('click', function () {
    for (let i = 0; i < button.length; i++) {
        if (event.target === modellComments[i]) {
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
               feedback[a].textContent = 'You have ' + (30-textarea[j].value.length) + ' charachters to write';
           });
        }
    }
}

/**
 *
 * @constructor - sätter kommentarsfältet till tomt och nedräkningen återställs
 */

function Clear() {
    for(let i = 0; i < nrOfImages; i++) {
        for(let j = 0; j < textarea.length; j++) {
           textarea[j].value = '';
           for (let a = 0; a < feedback.length; a++) {
               feedback[a].textContent =  'You have ' + (30-textarea[j].value.length) + ' charachters to write';
           }
        }
    }
}






