import { renderPictures } from './thumbnail.js';
import { addClickOnThumbnail } from './bigPicture.js';
import { showAlert } from './util.js';

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) =>{
    if (response.ok) {
      return response.json();
    } else{
      showAlert('Данные не загружены, попробуйте еще раз');
    }
  })
  .then((picturesArray) => {
    renderPictures(picturesArray);
    addClickOnThumbnail(picturesArray);
  })
  .catch(() => showAlert('Данные не загружены, попробуйте еще раз'));
