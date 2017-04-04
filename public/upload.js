



window.onload = function () {

    let test = document.createElement('p');
    test.textContent = 'hejsan';
    let wrapper = document.getElementById('wrapper');
    wrapper.appendChild(test);



    let uploadPicture = document.getElementById('uploadPicture');
    let addPicture = document.getElementById('addPicture');
    
    uploadPicture.addEventListener('change', function () {
        let file = uploadPicture.files[0];
        let imageType = /image.*/;

        if (file.type.match(imageType)) {
            let reader = new FileReader();

            reader.onload = function (e) {
                addPicture.innerHTML = "";

                let img = new Image();
                img.src = reader.result;

                addPicture.appendChild(img);
            };

            reader.readAsDataURL(file);
        } else {
            addPicture.innerHTML = "File not supported";
        }
    });
}
