import { isEscKey, closePopup } from './util.js';
import { returnNumber, checkStringLength } from './functions.js';

const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const EFFECTS_OPTIONS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
  'none': 'none',
};

const VALIDATING_MESSAGE = {
  hashInvalid: 'Хэш-тэги невалидны',
  hashCountInvalid: 'Превышено количество хэш-тегов',
  hashRepeat: 'Хэш-теги повторяются',
  incorrectCommentLength: 'В комментарии больше 140 символов',
};

const SLIDER_STYLE_OPTIONS = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 100,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1
  }
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');

const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('.image_preview');

const textarea = form.querySelector('textarea[name="description"]');
const hashInput = form.querySelector('input[name="hashtags"]');

const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const inputScale = form.querySelector('input[name="scale"]');

const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('input[name="effect-level"]');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');

let currentEffect;

const uploadDescriptionValidation = {
  isValid: true,
  validMessage: '',
};

const uploadHashtagValidation = {
  isValid: true,
  validMessage: '',
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
});

function showHideEffectLevelContainer(hide) {
  if (hide) {
    effectLevelSlider.classList.add('hidden');
    effectLevelContainer.classList.add('hidden');

  } else if (effectLevelSlider.classList.contains('hidden')) {
    effectLevelSlider.classList.remove('hidden');
    effectLevelContainer.classList.remove('hidden');
  }
}

function onEffectChange(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    if (evt.target.checked) {
      currentEffect = evt.target.value;

      if (evt.target.value === 'none') {
        imgPreview.style.removeProperty('filter');
        effectLevelValue.value = 0;
        showHideEffectLevelContainer(true);

      } else {
        effectLevelSlider.noUiSlider.updateOptions(SLIDER_STYLE_OPTIONS[evt.target.value]);
        showHideEffectLevelContainer(false);
      }
    }
  }
}

form.addEventListener('change', onEffectChange,);

effectLevelSlider.noUiSlider.on('update', () => {

  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  const effectForStyle = EFFECTS_OPTIONS[currentEffect];

  if (effectForStyle === 'grayscale' || effectForStyle === 'sepia' || effectForStyle === 'brightness') {
    imgPreview.style.filter = `${effectForStyle}(${effectLevelSlider.noUiSlider.get()})`;

  } else if (effectForStyle === 'invert') {
    imgPreview.style.filter = `${effectForStyle}(${effectLevelSlider.noUiSlider.get()}%)`;

  } else if (effectForStyle === 'blur') {
    imgPreview.style.filter = `${effectForStyle}(${effectLevelSlider.noUiSlider.get()}px)`;
  }
});

function showUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}


imgUploadInput.addEventListener('change', showUploadForm);

scaleControlSmaller.addEventListener('click', () => {
  let currValue = returnNumber(inputScale.value);

  if (currValue > MIN_SCALE_VALUE) {
    currValue = currValue - 25;
  }

  inputScale.value = `${currValue}%`;
  const scaleTransform = currValue / 100;
  imgPreview.style.transform = `scale(${scaleTransform})`;
});

scaleControlBigger.addEventListener('click', () => {
  let currValue = returnNumber(inputScale.value);

  if (currValue < MAX_SCALE_VALUE) {
    currValue = currValue + 25;
  }

  inputScale.value = `${currValue}%`;
  const scaleTransform = currValue / 100;
  imgPreview.style.transform = `scale(${scaleTransform})`;
});

imgUploadCancel.addEventListener('click', () => {
  closePopup(imgUploadOverlay, body);
  resetForm();
});

//------------------------------------------------------------------
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
});

function validateUploadtext() {
  iSValidDescription(textarea.value);
  iSValidHashtag(hashInput.value);

  if (uploadDescriptionValidation.isValid === true && uploadHashtagValidation.isValid === true){
    return true;
  } else {
    return false;
  }
}

function getValidateMessage() {

  let errorString = '';
  if (uploadDescriptionValidation.isValid === false){
    errorString = uploadDescriptionValidation.validMessage;
  }

  if (uploadHashtagValidation.isValid === false){
    if(errorString === ''){
      errorString = uploadHashtagValidation.validMessage;
    } else {
      errorString = `${errorString} или ${uploadHashtagValidation.validMessage}`;
    }
  }
  return errorString;

}

function iSValidDescription(value) {
  const isOk = checkStringLength(value, 10);
  uploadDescriptionValidation.isValid = isOk;
  uploadDescriptionValidation.validMessage = isOk === true ? '' : VALIDATING_MESSAGE['incorrectCommentLength'];

}


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


function findDuplicateValue(array) {
  const findDuplicates = () => array.filter((item, index) => array.indexOf(item) !== index);
  const duplicates = findDuplicates(array);
  return duplicates.length > 0;
}

pristine.addValidator(hashInput, validateUploadtext, getValidateMessage);
pristine.addValidator(textarea, validateUploadtext, getValidateMessage);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

//-----------------------------------------------------

function resetForm() {
  form.reset();
  pristine.validate();
}

document.addEventListener('keydown', (evt) => {
  if (isEscKey(evt) && document.activeElement !== textarea) {
    closePopup(imgUploadOverlay, body);
    resetForm();
  }
});
