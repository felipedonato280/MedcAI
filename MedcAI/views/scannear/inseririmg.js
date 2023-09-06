const inputFile = document.querySelector('.picture__input');
const pictureImage = document.querySelector('.picture__image');
const pictureImageTxt = "Procurar";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener('change', function(e){
    const inputTarget = e.target;
    //console.log(inputTarget);
    const file = inputTarget.files[0];
    //console.log(file);
    if (file){
        //pictureImage.innerHTML = 'Imagem selecionada';
        const reader = new FileReader();
        reader.addEventListener('carregando', function(e){
            const readerTarget = e.target;
            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture__img');

            pictureImage.innerHTML = '';
            pictureImage.appendChild(img);
        });
        reader.readAsDataURL(file);
    }else{
        pictureImage.innerHTML = pictureImageTxt;
    }

});