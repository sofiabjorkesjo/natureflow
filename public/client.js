'use strict';

let socket2 = io();

//hämtar alla bilder som finns uppladdade på databasen

socket2.on('images', function (allImages) {

    //sparar alla bilderna i en array

    let imageArray = [];

    for (let i = 0; i < allImages.imgs.length; i++) {
        imageArray.push(allImages.imgs[i].path);


    }

    //shufflar arrayen med bilder o väljer alltid ut de fyra första.

    imageArray.sort(function () {
        return 0.5 - Math.random()
    });

    let img = document.createElement('img');
    img.setAttribute('class', 'imgSlide');
    img.setAttribute('src', '/images/' + imageArray[0]);
    let img2 = document.createElement('img');
    img2.setAttribute('class', 'imgSlide');
    img2.setAttribute('src', '/images/' + imageArray[1]);
    let img3 = document.createElement('img');
    img3.setAttribute('class', 'imgSlide');
    img3.setAttribute('src', '/images/' + imageArray[2]);
    let img4 = document.createElement('img');
    img3.setAttribute('class', 'imgSlide');
    img3.setAttribute('src', '/images/' + imageArray[3]);


    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('id', 'imgDiv');

    let wrapper = document.querySelector('#wrapper');
    imgDiv.appendChild(img);
    imgDiv.appendChild(img2);
    imgDiv.appendChild(img3);
    imgDiv.appendChild(img4);
    wrapper.appendChild(imgDiv);



//första bilden
    let slideIndex = 1;
    showDivs(slideIndex);

//hämtar nästa bild, antingen framåt eller bakåt beroende på vilken knapp man trycker på
    function plusDivs(n) {
        slideIndex += n;
        showDivs(slideIndex);
    }

    setInterval(function() {
        plusDivs(1);
    }, 10000);



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




});