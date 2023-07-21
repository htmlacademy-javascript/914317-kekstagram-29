import { createPhotoDescriptionsArray } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureSection = document.querySelector('.pictures');
const docFragment = document.createDocumentFragment();

const photoDescriptionsArray = createPhotoDescriptionsArray();

photoDescriptionsArray.forEach((photoDesc) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoDesc.url;
  pictureElement.querySelector('.picture__img').alt = photoDesc.description;
  pictureElement.querySelector('.picture__likes').textContent = photoDesc.likes;
  pictureElement.querySelector('.picture__comments').textContent = photoDesc.comments.length;

  docFragment.appendChild(pictureElement);
});

pictureSection.appendChild(docFragment);
