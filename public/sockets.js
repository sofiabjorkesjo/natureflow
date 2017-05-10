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


            let p2 = document.createElement('p');
            p2.textContent = 'hejehejhej';
            console.log(p2);

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




