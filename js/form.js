import { isEscKey, closePopup } from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const textarea = form.querySelector('textarea[name="description"]');

function showUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function resetForm(){
  form.querySelector('.pristine-error.img-upload__error').textContent = '';
  form.reset();
}

imgUploadInput.addEventListener('change', showUploadForm);

imgUploadCancel.addEventListener('click', () => {
  closePopup(imgUploadOverlay, body);
  resetForm();
});

document.addEventListener('keydown', (evt) => {
  if (isEscKey(evt) && document.activeElement !== textarea) {
    closePopup(imgUploadOverlay, body);
    form.querySelector('.pristine-error.img-upload__error').textContent = '';
    resetForm();
  }
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
});


function validateDescription(value) {
  if (value.length === 0) {
    return true;
  } else {
    return value.length <= 140;
  }
}

pristine.addValidator(textarea, validateDescription, 'В комментарии не должно быть 140 символов');

function validateHashtag(value) {
  const stringArray = value.split(' ');

  if (stringArray.length === 1 && stringArray[0] === '') {
    return true;

  } else if (stringArray.length > 5 || findDuplicateValue(stringArray)) {
    return false;

  } else {

    const hashTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
    let isOk;

    for (let i = 0; i < stringArray.length; i++) {
      isOk = hashTemplate.test(stringArray[i]);
      if (!isOk) {
        break;
      }
    }
    return isOk;
  }
}

function getValidateHashtagMessage() {
  const stringArray = form.querySelector('input[name="hashtags"]').value.split(' ');

  if (stringArray.length > 5) {
    return 'Превышено количество хэш-тегов';
  } else if (findDuplicateValue(stringArray)) {
    return 'Есть повторяющиеся хэш-теги';
  } else {

    const hashTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
    let isOk;

    for (let i = 0; i < stringArray.length; i++) {
      isOk = hashTemplate.test(stringArray[i]);
      if (!isOk) {
        break;
      }
    }
    return 'Хэш-теги невалидны';
  }
}

function findDuplicateValue(array) {
  const findDuplicates = () => array.filter((item, index) => array.indexOf(item) !== index);
  const duplicates = findDuplicates(array);
  return duplicates.length > 0;
}

pristine.addValidator(form.querySelector('input[name="hashtags"]'), validateHashtag, getValidateHashtagMessage);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

