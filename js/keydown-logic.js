import { showCloseUploadPopup, openCloseThumbnailPopup, сloseErrorPopup, сloseSuccessPopup } from './buttons.js';
import { removeChildElements, isEscKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');

document.addEventListener('keydown', (evt) => {

  if (isEscKey(evt)) {
    const errorPopup = document.querySelector('.error');
    const successPopup = document.querySelector('.success');

    //Если открыта форма просмотра миниатюры
    if (!bigPicture.classList.contains('hidden')) {
      openCloseThumbnailPopup();
      removeChildElements(bigPicture, 'social__comment');
    } else {
      //Если открыто уведомление ошибки
      if (!errorPopup.classList.contains('hidden')) {
        сloseErrorPopup();
      } else {
        //Если открыто уведомление успешной загрузки
        if (!successPopup.classList.contains('hidden')) {
          сloseSuccessPopup();
          //Если открыта форма редактирования изображения
        } else {
          showCloseUploadPopup();
        }
      }
    }
  }
});
