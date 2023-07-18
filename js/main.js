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

function createUrllink (generateRandomUrlId) {
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

function createPhotoDescription (generateRandomId,generateRandomUrlId){
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

const createPhotoArray = () => {

  const photoArray = [];
  const generateRandomId = createId(1,25);
  const generateRandomUrlId = createId(1,25);

  //формируем массив 25 рандомных объектов-фотографий
  for (let i = 1; i <= 25; i++){
    photoArray.push(createPhotoDescription(generateRandomId,generateRandomUrlId));
  }

  console.log(photoArray);

};
