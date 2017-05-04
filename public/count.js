'use strict';

let textArea = document.getElementsByClassName('messageComment');

function textCounter(counter, textarea, maxlimit) {
    let countfield = document.getElementById(textarea);
    if (counter.value.length > maxlimit) {
        counter.value = counter.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.value = maxlimit -counter.value.length;
    }
}


//funkar ej - fixa
textArea.onkeyup = function () {
    textCounter(this, 'counter', 30);
};