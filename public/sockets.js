/**
 * Created by Sofia on 2017-05-08.
 */
'use strict';

let socket = io();


//hämtar bilderna i realtid

socket.on('image', function (image) {
    console.log(image);
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
    let span2 = document.createElement('span');
    span2.setAttribute('class', 'commentNumber');
    span2.textContent = '(' + '0' +')';
    comments.appendChild(span2);
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
    wrapper.appendChild(model);


    //klicka upp

    //let newImages = addComment.length;
    //console.log(newImages);
    let test = document.querySelectorAll('.addComment');
    console.log(test.length);
    //FIXA DETTA
    addComment.addEventListener('click', function () {
        console.log('hejhejhej');
        console.log(model);
        console.log(model.length);
        model.style.display = 'block';
    });

    window.addEventListener('click', function () {
        if (event.target === model) {
            model.style.display = 'none';
        }
    });

    close.addEventListener('click', function () {
        model.style.display = 'none';
    });

    //räknar


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
    modelComments.setAttribute('data-id', image._id);
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
    let commentsDiv = document.createElement('div');
    commentsDiv.setAttribute('class', 'commentsDiv');
    let pText = document.createElement('p');
    pText.setAttribute('class', 'testt');
    let owner = document.createElement('span');
    owner.setAttribute('class', 'ownerComment');
    owner.textContent = comments.owner;
    pText.appendChild(owner);
    pText.textContent = comments.text;
    commentsDiv.appendChild(pText);
    let date = document.createElement('p');
    date.setAttribute('class', 'date');
    date.textContent = comments.date;
    commentsDiv.appendChild(date);
    modelCommentsContent.appendChild(commentsDiv);
    modelComments.appendChild(modelCommentsContent);
    wrapper.appendChild(modelComments);

    comments.addEventListener('click', function () {
        console.log('tjo');
        modelComments.style.display = 'block';
    });

    spanCLose.addEventListener('click', function () {
        modelComments.style.display = 'none';
    });

    window.addEventListener('click', function () {
        if (event.target === modelComments) {
            modelComments.style.display = 'none';
        }
    })



});

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



