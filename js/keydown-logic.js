import { showCloseUploadPopup, openCloseThumbnailPopup, сloseErrorPopup, сloseSuccessPopup } from './buttons.js';
import { removeChildElements, isEscKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');

document.addEventListener('keydown', (evt) => {

  if (isEscKey(evt)) {

    //Если открыта форма просмотра миниатюры
    if (!bigPicture.classList.contains('hidden')) {
      openCloseThumbnailPopup();
      removeChildElements(bigPicture, 'social__comment');
    } else {
      //Если открыто уведомление ошибки
      const errorPopup = document.querySelector('.error');
      if (errorPopup !== null) {
        сloseErrorPopup();
      } else {
        //Если открыто уведомление успешной загрузки
        const successPopup = document.querySelector('.success');
        if (successPopup !== null) {
          сloseSuccessPopup();
          //Если открыта форма редактирования
        } else {
          showCloseUploadPopup(evt);
        }
      }
    }
  }
});
