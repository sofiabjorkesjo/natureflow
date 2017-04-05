



window.onload = function () {

    let uploadPicture = document.getElementById('uploadPicture');
    let imageDiv = document.getElementById('imageDiv');
    
    uploadPicture.addEventListener('change', function () {
        let file = uploadPicture.files[0];
        let imageType = /image.*/;

        if (file.type.match(imageType)) {
            let reader = new FileReader();

            reader.onload = function (e) {
                imageDiv.innerHTML = "";

                let img = new Image();
                img.src = reader.result;

                imageDiv.appendChild(img);
            };

            reader.readAsDataURL(file);
        } else {
            imageDiv.innerHTML = "File not supported";
        }
    });
}
