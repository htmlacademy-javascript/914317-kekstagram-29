const body = document.querySelector('body');
const imgUploadOverlay = body.querySelector('.img-upload__overlay');
const bigPicture = body.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

//--->ФОРМА РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЯ
//показать-закрыть форму
function showCloseUploadPopup() {
  imgUploadOverlay.classList.toggle('hidden');
  body.classList.toggle('modal-open');
}
//---<

//--->ОСНОВНАЯ СТРАНИЦА
//показать-закрыть окно просмотра миниатюры
function openCloseThumbnailPopup() {
  bigPicture.classList.toggle('hidden');
  body.classList.toggle('modal-open');
  socialCommentCount.firstChild.textContent = 0;
}

//---<


//--->ШАБЛОН: ОШИБКА ВЫГРУЗКИ
//закрыть окно уведомления
function сloseErrorPopup() {
  const errorPopup = body.querySelector('.error');
  errorPopup.classList.toggle('hidden');
}
//---<

//--->ШАБЛОН: УДАЧНАЯ ЗАГРУЗКА
//закрыть окно уведомления
function сloseSuccessPopup() {
  const successPopup = body.querySelector('.success');
  successPopup.classList.toggle('hidden');
}
//---<


export {
  showCloseUploadPopup
  , openCloseThumbnailPopup
  , сloseErrorPopup
  , сloseSuccessPopup
};
