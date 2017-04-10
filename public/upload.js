

//väljer en fil som är av typen image. Om bilden man valt matchar imageType så skapas en ny FileReader som läser in filen.
//En ny bild skapas och src sätts till resultatet som lästs in från FIleReader.
//Bilden appendas till divtaggen.


window.onload = function () {

    let wrapper = document.querySelector('#wrapper');
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
                console.log(img.src);


            };

            reader.readAsDataURL(file);
        } else {
            imageDiv.innerHTML = "File not supported";
        }
    });
}
