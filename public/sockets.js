/**
 * Created by Sofia on 2017-05-08.
 */
'use strict';

let socket = io();

//skapar en ny kommentar med socket så att det uppdateras i realtid
socket.on('comment', function (comment) {
   console.log(comment);

    let commentsContent = document.querySelectorAll('.modelComments-content');
    let images = document.querySelectorAll('.images');

    //loopar igenom alla comments-content divar och väljer den som har samma id som kommentaren.
    //Då skapas en ny kommentar till den commments-content.

    for (let i = 0; i < commentsContent.length; i++) {
        if (commentsContent[i].getAttribute("data-id") === comment.imageId) {
            let commentDiv = document.createElement("div");
            commentDiv.setAttribute("class", "commentsDiv");

            let p = document.createElement("p");
            p.setAttribute("class", 'testt');

            let span = document.createElement('span');
            span.setAttribute('class', 'ownerComment');
            span.textContent = comment.owner;

            p.appendChild(span);
            let text = document.createTextNode(' ' + '"' + comment.text + '"');
            p.appendChild(text);
            commentDiv.appendChild(p);
            let date = document.createElement('p');
            date.setAttribute('class', 'date');

            //skapar datumet

            comment.date = new Date();
            let dateText = document.createTextNode('Published ' + comment.date.toLocaleDateString() + ' ' + comment.date.toLocaleTimeString());

            date.appendChild(dateText);
            commentDiv.appendChild(date);
            commentsContent[i].appendChild(commentDiv);

            //numret med antal bilder uppdateras

            let commentNumber = images[i].querySelector('.commentsNumber');
            commentNumber.textContent = parseInt(commentNumber.textContent) +  1;
        }
    }
});


console.log('hej test');

socket.on('images', function (allImages) {

    let imageArray = [];
    console.log('tjotjo');
    console.log(allImages);
    console.log(allImages.imgs.length);

    for (let i = 0; i < allImages.imgs.length; i++) {
        //console.log(allImages.imgs[i].path);
        console.log(allImages.imgs.length);
        //imageArray = [];
        imageArray.push(allImages.imgs[i].path);


    }
    console.log(imageArray);

});


//
// let img = document.createElement('img');
// img.setAttribute('class', 'imgSlide');
// img.setAttribute('src', '/slideshow/1.jpg');
// let img2 = document.createElement('img');
// img2.setAttribute('class', 'imgSlide');
// img2.setAttribute('src', '/slideshow/2.jpg');
// let img3 = document.createElement('img');
// img3.setAttribute('class', 'imgSlide');
// img3.setAttribute('src', '/slideshow/3.jpg');
//
// let buttonLeft = document.createElement('button');
// buttonLeft.setAttribute('class', 'button');
// buttonLeft.textContent = 'next';
// let buttonRight = document.createElement('button');
// buttonRight.setAttribute('class', 'button');
// buttonRight.textContent = 'next';
//
// let buttonDiv = document.createElement('div');
// buttonDiv.setAttribute('id', 'buttonDiv');
// buttonDiv.appendChild(buttonLeft);
// buttonDiv.appendChild(buttonRight);
//
//
// let imgDiv = document.createElement('div');
// imgDiv.setAttribute('id', 'imgDiv');
//
// let wrapper = document.getElementById('wrapper');
// imgDiv.appendChild(img);
// imgDiv.appendChild(img2);
// imgDiv.appendChild(img3);
//
// wrapper.appendChild(imgDiv);
// wrapper.appendChild(buttonDiv);
//
// buttonLeft.addEventListener('click', function () {
//     plusDivs(-1);
// });
//
// buttonRight.addEventListener('click', function () {
//     plusDivs(1);
// });
//
// //första bilden
// let slideIndex = 1;
// showDivs(slideIndex);
//
// //hämtar nästa bild, antingen framåt eller bakåt beroende på vilken knapp man trycker på
// function plusDivs(n) {
//     showDivs(slideIndex += n);
// }
//
// //gömmer alla bilderna och sätter display till block ovh visar en bild med det satta slideindex.
// //Om slideIndex är högre än numret av element så sätts de till noll.
// //Om slideIndex är mindre än 1 så sätts den till numret av element imgSlide.length.
//
// function showDivs(x) {
//     let i;
//     let imgSlide = document.getElementsByClassName('imgSlide')
//     if (x > imgSlide.length) {
//         slideIndex = 1;
//     }
//     if (x < 1) {
//         slideIndex = imgSlide.length;
//     }
//
//     for (i = 0; i < imgSlide.length; i++) {
//         imgSlide[i].style.display = 'none';
//     }
//     imgSlide[slideIndex-1].style.display = 'block';
// }



