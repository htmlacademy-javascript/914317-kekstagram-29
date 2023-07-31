import {сloseErrorPopup, сloseSuccessPopup} from './buttons.js';

const body = document.querySelector('body');
const successTemplate = body.querySelector('#success').content.querySelector('.success');
const errorTemplate = body.querySelector('#error').content.querySelector('.error');

const closeSuccessSection = (evt) =>{
  evt.preventDefault();
  сloseSuccessPopup();
};

const showSuccessSection = () =>{
  const successPopup = body.querySelector('.success');
  successPopup.classList.toggle('hidden');
};

const createSuccessMsgFromTemplate = () => {
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');
  successElement.classList.add('hidden');

  successElement.classList.add('hidden');
  successButton.addEventListener('click', closeSuccessSection);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(successElement);
  body.appendChild(docFragment);
};

const closeErrorMessage = (evt) =>{
  evt.preventDefault();
  сloseErrorPopup();
};

const showErrorSection = () =>{
  const errorPopup = body.querySelector('.error');
  errorPopup.classList.toggle('hidden');
};

const createErrorMsgFromTemplate = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  errorElement.classList.add('hidden');
  errorButton.addEventListener('click', closeErrorMessage);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(errorElement);
  body.appendChild(docFragment);
};


export { createSuccessMsgFromTemplate, createErrorMsgFromTemplate, showErrorSection, showSuccessSection };

