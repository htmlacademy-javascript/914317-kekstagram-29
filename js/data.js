import { createId } from './util.js';

const PHOTO_DESCRIPTIONS = [
  'Невероятно',
  'Всегда хотел это увидеть',
  'Просто хорошее фото',
  'Фотография с отпуска',
  'Хороший день',
];

const USER_NAMES = [
  'Артем',
  'Никита',
  'Сергей',
  'Вадим',
  'Дима',
  'Кирилл',
  'Яна',
  'Лена',
  'Олеся',
];

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_COUNT = 25;
const generateRandomId = createId(1,PHOTO_COUNT);
const generateRandomUrlId = createId(1,PHOTO_COUNT);

function createUrllink () {
  return `photos/${generateRandomUrlId()}.jpg`;
}

function createAvatarLink() {
  const generateRandomAvatarId = createId(1,6);
  return `img/avatar-${generateRandomAvatarId()}.svg`;
}

function createDescription(){
  const generateRandomPhotoDescId = createId(0,4);
  return PHOTO_DESCRIPTIONS[generateRandomPhotoDescId()];
}

function createLikes(){
  const generateRandomLikes = createId(15,200);
  return generateRandomLikes();
}

function createName(){
  const generateRandomNameId = createId(0,8);
  return USER_NAMES[generateRandomNameId()];
}

function createUserComment(){
  const generateRandomUserCommentId = createId(0,5);
  return USER_COMMENTS[generateRandomUserCommentId()];
}

function createPhotoDescription (){
  return {
    id: generateRandomId(),
    url: createUrllink(generateRandomUrlId),
    description: createDescription(),
    likes: createLikes(),
    comments: createCommentsArray(),
  };
}

function createCommentsArray(){

  const commentsArray = [];

  const generateCommentsNumber = createId(0,30);
  const commentsCount = generateCommentsNumber();

  const generateUserId = createId(500,999);

  for (let i = 0; i <= commentsCount; i++){
    commentsArray.push(createComment(generateUserId));
  }

  return commentsArray;
}

function createComment(generateUserId){
  return{
    id: generateUserId(),
    avatar: createAvatarLink(),
    message: createUserComment(),
    name: createName(),
  };
}

const photoDescriptionsArray = () => Array.from({length: PHOTO_COUNT},createPhotoDescription);

export {photoDescriptionsArray};
