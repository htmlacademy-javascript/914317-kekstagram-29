import { showBigPicture, renderComments, loadComments } from './big-picture.js';
import { removeChildElements, getRandomBoolean } from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureSection = document.querySelector('.pictures');

const imgFilters = document.querySelector('.img-filters');
const imgFiltersButtons = imgFilters.querySelectorAll('.img-filters__button');

const comparePictures = (picA, picB) => {

  const filter = document.querySelector('.img-filters__button.img-filters__button--active').id;

  if (filter === 'filter-discussed') {
    if (picA.comments.length > picB.comments.length) {
      return -1;
    }
    if (picA.comments.length < picB.comments.length) {
      return 1;
    }
    return 0;

  } else if (filter === 'filter-random') {
    return getRandomBoolean === true ? 1 : -1;

  } else {
    return 0;
  }

};

//рендер картинок с сервера
const renderPictures = (picturesArray) => {

  const docFragment = document.createDocumentFragment();

  const filter = document.querySelector('.img-filters__button.img-filters__button--active').id;

  let maxCount = 25;
  if (filter === 'filter-random'){
    maxCount = 10;
  }

  const newArray = Array.from(picturesArray).slice();

  picturesArray
    .slice()
    .sort(comparePictures)
    .slice(0, maxCount)
    .forEach((photoDesc) => {

      const pictureElement = pictureTemplate.cloneNode(true);
      const pictureProperty = pictureElement.querySelector('.picture__img');
      pictureProperty.src = photoDesc.url;
      pictureProperty.alt = photoDesc.description;
      pictureElement.querySelector('.picture__likes').textContent = photoDesc.likes;
      pictureElement.querySelector('.picture__comments').textContent = photoDesc.comments.length;

      showBigPicture(pictureElement, photoDesc, newArray);
      docFragment.appendChild(pictureElement);

    });

  loadComments(()=>renderComments(picturesArray));

  removeChildElements(pictureSection, 'picture');
  pictureSection.appendChild(docFragment);
};

const showFilterSection = () => {
  if (imgFilters.classList.contains('img-filters--inactive')) {
    imgFilters.classList.remove('img-filters--inactive');
  }
};

//смена сортировки
const onSortChange = (evt) => {

  if (evt.target.matches('button[class^="img-filters__button"]')) {
    imgFiltersButtons.forEach((button) => {
      if (evt.target.id === button.id) {
        evt.target.classList.add('img-filters__button--active');
      } else {
        button.classList.remove('img-filters__button--active');
      }
    });
  }
};

//событие: #смена фильтра
const sortChange = (render) => {

  imgFiltersButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      onSortChange(evt);
      render();
    });
  });
};

export { renderPictures, showFilterSection, sortChange };
