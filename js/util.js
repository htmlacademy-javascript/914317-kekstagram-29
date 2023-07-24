function getRandomNumber(min, max) {

  const lowValue = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxValue = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (maxValue - lowValue + 1) + lowValue;

  return Math.floor(result);

}

function createId(min, max) {

  const previousValues = [];

  return function () {

    let idNumber = getRandomNumber(min,max);

    while (previousValues.includes(idNumber)){
      idNumber = getRandomNumber(min,max);
    }

    previousValues.push(idNumber);
    return idNumber;

  };
}

const isEscKey = (evt) => evt.key === 'Escape';

function closePopup(element,body){
  element.classList.add('hidden');
  body.classList.remove('modal-open');
}

function openPopup(element,body){
  element.classList.remove('hidden');
  body.classList.add('modal-open');
}

export {createId, isEscKey, closePopup, openPopup};
