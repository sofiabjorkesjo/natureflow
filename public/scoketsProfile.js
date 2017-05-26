/**
 * Created by Sofia on 2017-05-08.
 */
'use strict';

let socket = io();
let spanData = document.getElementsByClassName('user');

//hämtar bilderna i realtid till ägarens profil

socket.on('image', function (image) {

    //om bildens ägare är samma som namnet som står på profilen

    if (image.owner === spanData[1].textContent) {
    console.log(image);
    let path = image.path;
    let wrapper = document.querySelector('#wrapper');
    let imageDiv = document.createElement('div');
    imageDiv.setAttribute('class', 'images');
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


    let comments = document.createElement('button');
    comments.setAttribute('class', 'comments');
    comments.textContent = 'Comments (';
    let span2 = document.createElement('span');
    span2.setAttribute('class', 'commentsNumber');
    span2.textContent = '0';
    let parantes = document.createTextNode(')');

    comments.appendChild(span2);
    comments.appendChild(parantes);
    imageDiv.appendChild(comments);

    wrapper.insertBefore(imageDiv, wrapper.childNodes[4]);

    //skapar kommentarsfältet

    let model = document.createElement('div');
    model.setAttribute('class', 'model');
    let modelcontent = document.createElement('div');
    modelcontent.setAttribute('class', 'modal-content');
    let close = document.createElement('span');
    close.setAttribute('class', 'close');
    close.textContent = 'X';
    modelcontent.appendChild(close);
    let pTag = document.createElement('p');
    pTag.textContent = 'Write a comment here';
    modelcontent.appendChild(pTag);
    let form = document.createElement('form');
    form.setAttribute('action', '/images');
    form.setAttribute('method', 'post');
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'imageId');
    input.setAttribute('class', 'imageidtest');
    input.setAttribute('value', image._id);
    form.appendChild(input);
    let textArea = document.createElement('textarea');
    textArea.setAttribute('rows', '6');
    textArea.setAttribute('cols', '50');
    textArea.setAttribute('name', 'comment');
    textArea.setAttribute('class', 'messageComment');
    textArea.setAttribute('maxlength', '30');
    form.appendChild(textArea);
    let b = document.createElement('br');
    form.appendChild(b);
    let feedback = document.createElement('span');
    feedback.setAttribute('class', 'feedback');
    feedback.textContent = 'You have 30 charachters to write';
    form.appendChild(feedback);
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Post Comment');
    submit.setAttribute('class', 'postComment');
    form.appendChild(submit);
    modelcontent.appendChild(form);
    model.appendChild(modelcontent);
    wrapper.insertBefore(model, wrapper.childNodes[3]);


    //klickar ner kommentarerna

    close.addEventListener('click', function () {
        model.style.display = 'none';
    });

    window.addEventListener('click', function () {
        if (event.target === model) {
            model.style.display = 'none';
        }
    });

    //räknar hur många tecken man har kvar att skriva på kommentarerna

    textArea.addEventListener('keyup', function () {
        console.log('ejjejejje');
        if(textArea.value.length > 30) {
            return false;
        }
        feedback.textContent = 'You have ' + (30-textArea.value.length) + ' charachters to write';
    });

    //visar kommentarerna

    let modelComments = document.createElement('div');
    modelComments.setAttribute('class', 'modelComments');
    let modelCommentsContent = document.createElement('div');
    modelCommentsContent.setAttribute('class', 'modelComments-content');
    modelCommentsContent.setAttribute('data-id', image._id);
    console.log(image._id);
    let spanCLose = document.createElement('span');
    spanCLose.setAttribute('class', 'closeComments');
    spanCLose.textContent = 'X';
    modelCommentsContent.appendChild(spanCLose);
    let CommentsText = document.createElement('div');
    CommentsText.setAttribute('class', 'CommentsDiv');
    let h2 = document.createElement('h2');
    h2.textContent = 'Comments';
    CommentsText.appendChild(h2);
    modelCommentsContent.appendChild(CommentsText);
    modelComments.appendChild(modelCommentsContent);
    wrapper.insertBefore(modelComments, wrapper.childNodes[3]);

    //klickar upp och klickar ner kommentarerna

    comments.addEventListener('click', function () {
        modelComments.style.display = 'block';
    });

    spanCLose.addEventListener('click', function () {
        modelComments.style.display = 'none';
    });

    window.addEventListener('click', function () {
        if (event.target === modelComments) {
            modelComments.style.display = 'none';
        }
    });
   }
});


//skapar en ny kommentar med socket så att det uppdateras i realtid

socket.on('comment', function (comment) {
    let commentsContent = document.querySelectorAll('.modelComments-content');
    let images = document.querySelectorAll('.images');

    //loopar igenom alla comments-content divar och väljer den som har samma id som kommentaren.
    //Då skapas en ny kommentar till den commments-content.

    for (let i = 0; i < commentsContent.length; i++) {
        console.log(commentsContent.length);
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

            comment.date = new Date(comment.date);
            let dateText = document.createTextNode('Published ' + comment.date.toLocaleDateString() + ' ' + comment.date.toLocaleTimeString());

            date.appendChild(dateText);
            commentDiv.appendChild(date);
            commentsContent[i].appendChild(commentDiv);
        }
    }

    //sätter numret för hur mpnga kommentarer bilderna har.

    for (let i = 0; i < images.length; i++){
        if (commentsContent[i].getAttribute("data-id") === comment.imageId) {
            let commentNumber = images[i].querySelector('.commentsNumber');
            commentNumber.textContent = parseInt(commentNumber.textContent) +  1;
        }
    }
});

