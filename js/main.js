import { showCloseUploadPopup } from './buttons.js';
import { formSubmit } from './form.js';
import { getData } from './server.js';
import { showAlert, postponeExecution } from './util.js';
import { sortChange, renderPictures, showFilterSection } from './thumbnail.js';

import './big-picture.js';
import './keydown-logic.js';
import './users-photo.js';

const RERENDER_DELAY = 500;

getData()
  .then((picturesArray) => {
    renderPictures(picturesArray);
    showFilterSection();
    sortChange(postponeExecution(() => renderPictures(picturesArray),RERENDER_DELAY));
  })
  .catch(() => showAlert('Данные не загружены, попробуйте еще раз'));

formSubmit(showCloseUploadPopup);
