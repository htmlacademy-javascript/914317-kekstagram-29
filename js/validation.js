import { checkStringLength } from './functions.js';

const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('.img-upload__form');
const textarea = form.querySelector('textarea[name="description"]');
const hashInput = form.querySelector('input[name="hashtags"]');

const VALIDATING_MESSAGE = {
  hashInvalid: 'Хэш-тэги невалидны',
  hashCountInvalid: 'Превышено количество хэш-тегов',
  hashRepeat: 'Хэш-теги повторяются',
  incorrectCommentLength: 'В комментарии больше 140 символов',
};

const uploadDescriptionValidation = {
  isValid: true,
  validMessage: '',
};

const uploadHashtagValidation = {
  isValid: true,
  validMessage: '',
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
});

//валидация введенного текста - точка входа
function validateUploadtext() {
  iSValidDescription(textarea.value);
  iSValidHashtag(hashInput.value);

  if (uploadDescriptionValidation.isValid === true && uploadHashtagValidation.isValid === true) {
    return true;
  } else {
    return false;
  }
}

//валидация введенного текста - сообщение пользователю
function getValidateMessage() {

  let errorString = '';
  if (uploadDescriptionValidation.isValid === false) {
    errorString = uploadDescriptionValidation.validMessage;
  }

  if (uploadHashtagValidation.isValid === false) {
    if (errorString === '') {
      errorString = uploadHashtagValidation.validMessage;
    } else {
      errorString = `${errorString} или ${uploadHashtagValidation.validMessage}`;
    }
  }
  return errorString;

}

//валидация введенного текста - валидация поля "Комментарий"
function iSValidDescription(value) {
  const isOk = checkStringLength(value, 10);
  uploadDescriptionValidation.isValid = isOk;
  uploadDescriptionValidation.validMessage = isOk === true ? '' : VALIDATING_MESSAGE['incorrectCommentLength'];
}

//валидация введенного текста - валидация поля "хэш-теги"
function iSValidHashtag(value) {
  const stringArray = value.split(' ');

  if (stringArray.length === 1 && stringArray[0] === '') {

    uploadHashtagValidation.isValid = true;

  } else if (stringArray.length > 5 || findDuplicateValue(stringArray)) {

    uploadHashtagValidation.isValid = false;
    uploadHashtagValidation.validMessage = `${VALIDATING_MESSAGE['hashCountInvalid']} или ${VALIDATING_MESSAGE['hashRepeat']}`;

  } else {

    const hashTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
    let isOk;

    for (let i = 0; i < stringArray.length; i++) {
      isOk = hashTemplate.test(stringArray[i]);
      if (!isOk) {
        break;
      }
    }
    uploadHashtagValidation.isValid = isOk;
    uploadHashtagValidation.validMessage = isOk === true ? '' : VALIDATING_MESSAGE['hashInvalid'];

  }
}

//поиск дублей в хэш-тегах
function findDuplicateValue(array) {
  const findDuplicates = () => array.filter((item, index) => array.indexOf(item) !== index);
  const duplicates = findDuplicates(array);
  return duplicates.length > 0;
}

pristine.addValidator(hashInput, validateUploadtext, getValidateMessage);
pristine.addValidator(textarea, validateUploadtext, getValidateMessage);

export { pristine };
