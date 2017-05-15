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

            comment.date = new Date(comment.date);
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

//hämtar bilderna i realtid

socket.on('image', function (image) {
    console.log(image.path);
    let path = image.path;
    let wrapper = document.querySelector('#wrapper');
    let imageDiv = document.createElement('div');
    imageDiv.setAttribute('class', 'images');
    let p = document.createElement('p');
    p.setAttribute('id', 'publishedBy');
    p.textContent = 'Published by' + image.owner;
    imageDiv.appendChild(p);
    let imageDiv2 = document.createElement('div');
    imageDiv2.setAttribute('class', 'imageDiv');
    let link = document.createElement('img');
    link.setAttribute('src', '/images/' + path);
    let a = document.createElement('a');
    a.setAttribute('href', '/images/' + path);
    a.setAttribute('data-lightbox', 'image1');
    a.appendChild(link);
    imageDiv2.appendChild(a);
    imageDiv.appendChild(imageDiv2);


    let addComment = document.createElement('button');
    addComment.setAttribute('class', 'addComment');
    addComment.textContent = 'Add comment';
    imageDiv.appendChild(addComment);
    let comments = document.createElement('button');
    comments.setAttribute('class', 'comments');
    comments.textContent = 'Comments';
    let span = document.createElement('span');
    span.setAttribute('class', 'commentNumber');
    span.textContent = '(' + comments.length +')';
    comments.appendChild(span);
    imageDiv.appendChild(comments);

    wrapper.insertBefore(imageDiv, wrapper.childNodes[3]);

    //skapar kommentarsfältet

    let model = document.createElement('div');
    //model.setAttribute('style', )
    model.setAttribute('class', 'model');
    let modelcontent = document.createElement('div');
    modelcontent.setAttribute('class', 'modal-content');
    let close = document.createElement('span');
    close.setAttribute('class', 'close');
    close.textContent = 'X';
    modelcontent.appendChild(close);
    let form = document.createElement('form');
    form.setAttribute('action', '/images');
    form.setAttribute('method', 'post');
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'imageId');
    input.setAttribute('class', 'imageidtest');
    input.setAttribute('value', image.imageId);
    form.appendChild(input);
    let textArea = document.createElement('textarea');
    textArea.setAttribute('rows', '6');
    textArea.setAttribute('cols', '50');
    textArea.setAttribute('name', 'comment');
    textArea.setAttribute()
    model.appendChild(modelcontent);




});


