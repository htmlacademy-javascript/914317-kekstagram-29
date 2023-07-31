import { showAlert } from './util.js';

const loadFromServer = () => fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      showAlert('Данные не загружены, попробуйте еще раз');
    }
  });

const getData = () => loadFromServer();

export { getData };

