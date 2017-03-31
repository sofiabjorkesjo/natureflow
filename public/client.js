'use strict';

let img = document.createElement('img');
img.setAttribute('class', 'imgSlide');
img.setAttribute('src', '/test/1.jpg');
let img2 = document.createElement('img');
img2.setAttribute('class', 'imgSlide');
img2.setAttribute('src', '/test/2.jpg');
let img3 = document.createElement('img');
img3.setAttribute('class', 'imgSlide');
img3.setAttribute('src', '/test/3.jpg');

let buttonLeft = document.createElement('button');
buttonLeft.setAttribute('class', 'buttonLeft');
let buttonRight = document.createElement('button');
buttonRight.setAttribute('class', 'buttonRight');

let imgDiv = document.createElement('div');

let wrapper = document.getElementById('wrapper');
imgDiv.appendChild(img);
imgDiv.appendChild(img2);
imgDiv.appendChild(img3);
imgDiv.appendChild(buttonLeft);
imgDiv.appendChild(buttonRight);
wrapper.appendChild(imgDiv)

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    let i;
    let imgSlides = document.getElementsByClassName('imgSlide')
    if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = x.length;
    }

    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    x[slideIndex-1].style.display = 'block';
}