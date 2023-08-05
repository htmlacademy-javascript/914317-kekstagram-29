import { сloseErrorPopup, сloseSuccessPopup } from './buttons.js';

const body = document.querySelector('body');
const successTemplate = body.querySelector('#success').content.querySelector('.success');
const errorTemplate = body.querySelector('#error').content.querySelector('.error');

const bigPictureOverlay = document.querySelector('.big-picture.overlay');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const closeSuccessSection = (evt) => {
  evt.preventDefault();
  сloseSuccessPopup();
};

const closeErrorMessage = (evt) => {
  evt.preventDefault();
  сloseErrorPopup();
};

//скрываем по клику сообщения об ошибке/успехе загрузки
document.addEventListener('click', (evt) => {

  if (bigPictureOverlay.classList.contains('hidden') || imgUploadOverlay.classList.contains('hidden')) {

    const successPopup = body.querySelector('.success');
    const errorPopup = body.querySelector('.error');

    if (successPopup !== null) {
      if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
        closeSuccessSection(evt);
      }
    } else if (errorPopup !== null) {
      if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
        closeErrorMessage(evt);
      }
    }

  }
}
);

const showSuccessSection = () => {
  const successPopup = body.querySelector('.success');
  successPopup.classList.toggle('hidden');
};

const createSuccessMsgFromTemplate = () => {
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessSection);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(successElement);
  body.appendChild(docFragment);
};

const showErrorSection = () => {
  const errorPopup = body.querySelector('.error');
  errorPopup.classList.toggle('hidden');
};

const createErrorMsgFromTemplate = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  errorButton.addEventListener('click', closeErrorMessage);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(errorElement);
  body.appendChild(docFragment);
};


export { createSuccessMsgFromTemplate, createErrorMsgFromTemplate, showErrorSection, showSuccessSection };

