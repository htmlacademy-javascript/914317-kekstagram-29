
import { openCloseThumbnailPopup} from './buttons.js';

const bigPicture = document.querySelector('.big-picture');
const bigPicturePreview = bigPicture.querySelector('.big-picture_preview');

const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');

const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelectorAll('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');


const docFragment = document.createDocumentFragment();

//событие: добавить клик для открытия миниатюр
function addClickOnThumbnail(picturesArray) {

  const pictures = document.querySelectorAll('.picture');

  for (let i = 0; i < pictures.length; i++) {
    showBigPicture(pictures[i], picturesArray[i]);
  }
}

//событие: открытие миниатюры
function showBigPicture(picture, photoDesc) {
  picture.addEventListener('click', () => {

    openCloseThumbnailPopup();

    bigPicturePreview.src = photoDesc.url;
    likesCount.textContent = photoDesc.likes;
    commentsCount.textContent = photoDesc.comments.length;
    socialCaption.textContent = photoDesc.description;

    photoDesc.comments.forEach((comment) => {
      const firstDomComment = socialComment[0];

      const commentElement = firstDomComment.cloneNode(true);

      const socialPicture = commentElement.querySelector('.social__picture');
      const socialText = commentElement.querySelector('.social__text');

      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;

      socialText.textContent = comment.message;

      docFragment.appendChild(commentElement);

    });

    socialComments.appendChild(docFragment);
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

  });
}

bigPictureCancel.addEventListener('click', () => {
  openCloseThumbnailPopup();
});

export { addClickOnThumbnail };

