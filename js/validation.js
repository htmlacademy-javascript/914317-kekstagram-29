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

//валидация введенного текста - валидация поля "Комментарий"
const iSValidDescription = (value) => {
  const isOk = checkStringLength(value, 140);
  uploadDescriptionValidation.isValid = isOk;
  uploadDescriptionValidation.validMessage = isOk === true ? '' : VALIDATING_MESSAGE['incorrectCommentLength'];
};

//поиск дублей в хэш-тегах
const findDuplicateValue = (array) => {
  const findDuplicates = () => array.filter((item, index) => array.indexOf(item) !== index);
  const duplicates = findDuplicates(array);
  return duplicates.length > 0;
};

//валидация введенного текста - валидация поля "хэш-теги"
const iSValidHashtag = (value) => {
  const stringArray = value.split(' ');
  const lowerStringArray = [];

  stringArray.forEach((arrayElement) => {
    if (arrayElement !== '') {
      lowerStringArray.push(arrayElement.toLowerCase());
    }
  });

  if (lowerStringArray.length === 0) {

    uploadHashtagValidation.isValid = true;

  } else if (lowerStringArray.length > 5 || findDuplicateValue(lowerStringArray)) {

    uploadHashtagValidation.isValid = false;
    uploadHashtagValidation.validMessage = `${VALIDATING_MESSAGE['hashCountInvalid']} или ${VALIDATING_MESSAGE['hashRepeat']}`;

  } else {

    const hashTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
    let isOk;

    for (let i = 0; i < lowerStringArray.length; i++) {
      isOk = hashTemplate.test(lowerStringArray[i]);
      if (!isOk) {
        break;
      }
    }
    uploadHashtagValidation.isValid = isOk;
    uploadHashtagValidation.validMessage = isOk === true ? '' : VALIDATING_MESSAGE['hashInvalid'];

  }
};


//валидация введенного текста - сообщение пользователю
const getValidateMessage = () => {

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

};

//валидация введенного текста - точка входа
const validateUploadtext = () => {
  iSValidDescription(textarea.value);
  iSValidHashtag(hashInput.value);

  if (uploadDescriptionValidation.isValid === true && uploadHashtagValidation.isValid === true) {
    return true;
  } else {
    return false;
  }
};

const onChange = () => {
  if (pristine.validate()){
    pristine.reset();
  }
};

hashInput.addEventListener('change', onChange);
textarea.addEventListener('input', onChange);

pristine.addValidator(hashInput, validateUploadtext, getValidateMessage);
pristine.addValidator(textarea, validateUploadtext, getValidateMessage);

export { pristine };
