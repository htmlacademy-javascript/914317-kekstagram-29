import { showCloseUploadPopup } from './buttons.js';
import { formSubmit } from './form.js';
import { createSuccessMsgFromTemplate, createErrorMsgFromTemplate } from './templates.js';
import { getData } from './server.js';
import { showAlert, debounce } from './util.js';
import { sortChange, renderPictures } from './thumbnail.js';

import './bigPicture.js';
import './keydown-logic.js';
import './users-photo.js';

const RERENDER_DELAY = 500;

getData()
  .then((picturesArray) => {
    renderPictures(picturesArray);
    sortChange(debounce(() => renderPictures(picturesArray),RERENDER_DELAY));
  })
  .catch(() => showAlert('Данные не загружены, попробуйте еще раз'));

createSuccessMsgFromTemplate();
createErrorMsgFromTemplate();
formSubmit(showCloseUploadPopup);
