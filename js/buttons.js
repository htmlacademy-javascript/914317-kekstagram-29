import { isEscKey, removeChildElements } from './util.js';

const body = document.querySelector('body');

const form = body.querySelector('.img-upload__form');
const textarea = form.querySelector('textarea[name="description"]');
const hashInput = form.querySelector('input[name="hashtags"]');

const imgUploadOverlay = body.querySelector('.img-upload__overlay');
const imgUploadInput = form.querySelector('.img-upload__input');

const bigPicture = body.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

const clearUploadInputValue = () => {
  if (!imgUploadOverlay.classList.contains('hidden')) {
    imgUploadInput.value = '';
  }
};

//--->ФОРМА РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЯ
//показать-закрыть форму
const showCloseUploadPopup = (evt) => {

  if (isEscKey(evt)) {
    if (document.activeElement !== textarea && document.activeElement !== hashInput) {
      clearUploadInputValue();
      imgUploadOverlay.classList.toggle('hidden');
      body.classList.toggle('modal-open');
    }
  } else {
    clearUploadInputValue();
    imgUploadOverlay.classList.toggle('hidden');
    body.classList.toggle('modal-open');
  }

};
//---<

//--->ОСНОВНАЯ СТРАНИЦА
//показать-закрыть окно просмотра миниатюры
const openCloseThumbnailPopup = () => {
  bigPicture.classList.toggle('hidden');
  body.classList.toggle('modal-open');
  socialCommentCount.firstChild.textContent = 0;
};
//---<


//--->ШАБЛОН: ОШИБКА ВЫГРУЗКИ
//закрыть окно уведомления
const сloseErrorPopup = () => {
  removeChildElements(body, 'error');
};
//---<

//--->ШАБЛОН: УДАЧНАЯ ЗАГРУЗКА
//закрыть окно уведомления
const сloseSuccessPopup = () => {
  clearUploadInputValue();
  removeChildElements(body, 'success');
};
//---<


export {
  showCloseUploadPopup
  , openCloseThumbnailPopup
  , сloseErrorPopup
  , сloseSuccessPopup
};
