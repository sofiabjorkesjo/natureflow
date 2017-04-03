'use strict';

let img = document.createElement('img');
img.setAttribute('class', 'imgSlide');
img.setAttribute('src', '/slideshow/1.jpg');
let img2 = document.createElement('img');
img2.setAttribute('class', 'imgSlide');
img2.setAttribute('src', '/slideshow/2.jpg');
let img3 = document.createElement('img');
img3.setAttribute('class', 'imgSlide');
img3.setAttribute('src', '/slideshow/3.jpg');

let buttonLeft = document.createElement('button');
buttonLeft.setAttribute('class', 'buttonLeft');
let buttonRight = document.createElement('button');
buttonRight.setAttribute('class', 'buttonRight');

let imgDiv = document.createElement('div');
imgDiv.setAttribute('id', 'imgDiv');

let wrapper = document.getElementById('wrapper');
imgDiv.appendChild(img);
imgDiv.appendChild(img2);
imgDiv.appendChild(img3);
imgDiv.appendChild(buttonLeft);
imgDiv.appendChild(buttonRight);
wrapper.appendChild(imgDiv);

buttonLeft.addEventListener('click', function () {
    plusDivs(-1);
});

buttonRight.addEventListener('click', function () {
    plusDivs(1);
});

//första bilden
let slideIndex = 1;
showDivs(slideIndex);

//hämtar nästa bild, antingen framåt eller bakåt beroende på vilken knapp man trycker på
function plusDivs(n) {
    showDivs(slideIndex += n);
}

//gömmer alla bilderna och sätter display till block ovh visar en bild med det satta slideindex.
//Om slideIndex är högre än numret av element så sätts de till noll.
//Om slideIndex är mindre än 1 så sätts den till numret av element imgSlide.length.

function showDivs(x) {
    let i;
    let imgSlide = document.getElementsByClassName('imgSlide')
    if (x > imgSlide.length) {
        slideIndex = 1;
    }
    if (x < 1) {
        slideIndex = imgSlide.length;
    }

    for (i = 0; i < imgSlide.length; i++) {
        imgSlide[i].style.display = 'none';
    }
    imgSlide[slideIndex-1].style.display = 'block';
}