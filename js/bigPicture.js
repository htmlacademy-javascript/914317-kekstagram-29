import { openCloseThumbnailPopup } from './buttons.js';
import { returnNumber } from './functions.js';

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

const loadComments = (render) => {
  commentsLoader.addEventListener('click', () => {
    render();
  });
};

const renderComments = (picturesArray) => {
  const newArray = Array.from(picturesArray).slice();
  const photoDesc = findNeededPhotoDesc(newArray);

  let neededCommentsCount = returnCommentsCount();
  neededCommentsCount += 5;

  let countForText = neededCommentsCount;
  if (neededCommentsCount > photoDesc.comments.length){
    countForText = photoDesc.comments.length;
    commentsLoader.classList.add('hidden');
  }

  socialCommentCount.firstChild.textContent = `${countForText} из `;

  photoDesc
    .comments
    .slice(0, neededCommentsCount)
    .forEach((comment) => {
      const firstDomComment = socialComment[0];

      const commentElement = firstDomComment.cloneNode(true);

      const socialPicture = commentElement.querySelector('.social__picture');
      const socialText = commentElement.querySelector('.social__text');

      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;

      socialText.textContent = comment.message;

      docFragment.appendChild(commentElement);
    });
  socialComments.innerHTML = '';
  socialComments.appendChild(docFragment);

};

function findNeededPhotoDesc(newArray) {
  return Object.values(newArray).find(isNeededPhoto);
}

function isNeededPhoto(element) {
  const currentId = document.querySelector('.big-picture_preview').id;
  return element.id === returnNumber(currentId);
}

function returnCommentsCount() {
  return returnNumber(socialCommentCount.firstChild.textContent);
}

//событие: открытие миниатюры
const showBigPicture = (picture, photoDesc, newArray) => {
  picture.addEventListener('click', () => {

    openCloseThumbnailPopup();

    bigPicturePreview.src = photoDesc.url;
    bigPicturePreview.id = photoDesc.id;
    likesCount.textContent = photoDesc.likes;
    commentsCount.textContent = photoDesc.comments.length;
    socialCaption.textContent = photoDesc.description;
    commentsLoader.classList.remove('hidden');
    renderComments(newArray);
  });

};

bigPictureCancel.addEventListener('click', () => {
  openCloseThumbnailPopup();
});

export { showBigPicture, renderComments, loadComments };

