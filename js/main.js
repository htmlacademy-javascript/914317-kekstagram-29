import {showCloseUploadPopup} from './buttons.js';
import './bigPicture.js';
import {formSubmit} from './form.js';
import './server.js';
import './keydown-logic.js';
import { createSuccessMsgFromTemplate, createErrorMsgFromTemplate } from './templates.js';

createSuccessMsgFromTemplate();
createErrorMsgFromTemplate();
formSubmit(showCloseUploadPopup);
