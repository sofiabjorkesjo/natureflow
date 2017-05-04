'use strict';

let textArea = document.querySelector('.messageComment');

//räknar ner hur många tecken man har kvar att skriva i en kommentar

function textCounter(counter, textarea, maxlimit) {
    console.log('ghghghg');
    let countfield = document.getElementById(textarea);
    if (counter.value.length > maxlimit) {
        counter.value = counter.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.value = maxlimit -counter.value.length;
    }
}

textArea.addEventListener('keyup', function (event) {
    textCounter(this, 'counter', 30);
});