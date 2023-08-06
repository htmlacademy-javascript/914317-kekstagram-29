
const ALERT_SHOW_TIME = 5000;

const isEscKey = (evt) => evt.key === 'Escape';

const getRandomBoolean = () => Math.random() < 0.5;

const showAlert = (message) => {

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getRandomNumber = (min, max) => {

  const lowValue = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxValue = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (maxValue - lowValue + 1) + lowValue;

  return Math.floor(result);

};

const createId = (min, max) => {

  const previousValues = [];

  return function () {

    let idNumber = getRandomNumber(min, max);

    while (previousValues.includes(idNumber)) {
      idNumber = getRandomNumber(min, max);
    }

    previousValues.push(idNumber);
    return idNumber;

  };
};

const removeChildElements = (parentElement, className = '', fullName = '') => {

  if (fullName === '') {
    const allObjects = parentElement.querySelectorAll(`.${className}`);
    allObjects.forEach((obj) => {
      obj.parentNode.removeChild(obj);
    }
    );
  } else {
    const allObjects = parentElement.querySelectorAll(`${fullName}`);
    allObjects.forEach((obj) => {
      obj.parentNode.removeChild(obj);
    }
    );
  }

};

//переименовал debounce на postponeExecution по просьбе предыдущего проверяющего.
//комментарий: Имя функции «debounce» не начинается с глагола Файл: js/util.js, строка 77, позиция 7.
const postponeExecution = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  createId
  , isEscKey
  , showAlert
  , removeChildElements
  , getRandomBoolean
  , postponeExecution
};
