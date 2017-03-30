'use strict';

let img = document.createElement('img');
img.setAttribute('class', 'imgSlide');
img.setAttribute('src', '/test/1.jpg')

let wrapper = document.getElementById('wrapper');
wrapper.appendChild(img);