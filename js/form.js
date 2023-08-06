import { returnNumber } from './functions.js';
import { pristine } from './validation.js';
import { showCloseUploadPopup } from './buttons.js';
import { createSuccessMsgFromTemplate, createErrorMsgFromTemplate } from './templates.js';

const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP_VALUE = 25;

const EFFECTS_OPTIONS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
  'none': 'none',
};


const SLIDER_STYLE_OPTIONS = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
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

const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('.img-upload__form');

const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('.image_preview');

const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const inputScale = form.querySelector('input[name="scale"]');

const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('input[name="effect-level"]');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');

const imgUploadSubmit = imgUpload.querySelector('button[class="img-upload__submit"]');

let currentEffect;

//показать-скрыть слайдер и его контейнер
const showHideEffectLevelContainer = (hide) => {
  if (hide) {
    effectLevelSlider.classList.add('hidden');
    effectLevelContainer.classList.add('hidden');

  } else if (effectLevelSlider.classList.contains('hidden')) {
    effectLevelSlider.classList.remove('hidden');
    effectLevelContainer.classList.remove('hidden');
  }
};

const disableSubmit = () => {
  imgUploadSubmit.disabled = true;
};

const enableSubmit = () => {
  imgUploadSubmit.disabled = false;
};

//сбросить форму к изначальному состоянию
const resetForm = () => {

  effectLevelSlider.noUiSlider.updateOptions(SLIDER_STYLE_OPTIONS['none']);
  imgPreview.style.removeProperty('filter');
  effectLevelValue.value = 0;
  showHideEffectLevelContainer(true);

  form.reset();
  pristine.validate();
  pristine.reset();

  enableSubmit();

};

//отправка формы
const formSubmit = (onSuccess) => {

  form.addEventListener('submit', (evt) => {

    evt.preventDefault();
    imgUploadSubmit.disabled = true;
    const isValid = pristine.validate();
    if (isValid) {
      disableSubmit();
      pristine.reset();
      const formData = new FormData(evt.target);
      fetch('https://29.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        }

      ).then((response) =>{
        if (response.ok){
          enableSubmit();
          onSuccess(evt);
          createSuccessMsgFromTemplate();
          resetForm();
        } else{
          enableSubmit();
          createErrorMsgFromTemplate();
        }
      })
        .catch(() => createErrorMsgFromTemplate());
    }
  });
};

noUiSlider.create(effectLevelSlider, SLIDER_STYLE_OPTIONS['none']);


//#смена фильтра
const onEffectChange = (evt) => {
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
};

//событие: #смена фильтра
form.addEventListener('change', onEffectChange);

//смена насыщенности эффекта при изменении позиции слайдера
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

//показать форму редактирования изображения
imgUploadInput.addEventListener('change', showCloseUploadPopup);

//событие: закрытие формы редактирования изображения по "крестику"
imgUploadCancel.addEventListener('click', (evt) => {
  showCloseUploadPopup(evt);
  resetForm();
});

//увеличение изображения
scaleControlSmaller.addEventListener('click', () => {
  let currValue = returnNumber(inputScale.value);

  if (currValue > MIN_SCALE_VALUE) {
    currValue = currValue - SCALE_STEP_VALUE;
  }

  inputScale.value = `${currValue}%`;
  const scaleTransform = currValue / 100;
  imgPreview.style.transform = `scale(${scaleTransform})`;
});

//уменьшение изображения
scaleControlBigger.addEventListener('click', () => {
  let currValue = returnNumber(inputScale.value);

  if (currValue < MAX_SCALE_VALUE) {
    currValue = currValue + SCALE_STEP_VALUE;
  }

  inputScale.value = `${currValue}%`;
  const scaleTransform = currValue / 100;
  imgPreview.style.transform = `scale(${scaleTransform})`;
});

export { formSubmit, resetForm };
