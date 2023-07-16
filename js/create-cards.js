const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

const createFeatures = (features) => {
  const fragment = document.createDocumentFragment();

  features.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(`popup__feature--${feature}`);
    fragment.appendChild(newFeature);
  });

  return fragment;
};

const createPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.height = 40;
    newPhoto.width = 45;
    newPhoto.src = photo;
    newPhoto.alt = 'Фотография жилья';

    fragment.appendChild(newPhoto);
  });

  return fragment;
};

const createCard = (ad) => {
  const newCard = cardTemplate.cloneNode(true);

  const image = newCard.querySelector('.popup__avatar');
  image.src = ad.author.avatar;

  const title = newCard.querySelector('.popup__title');
  title.textContent = ad.offer.title;

  const address = newCard.querySelector('.popup__text--address');
  address.textContent = ad.offer.address;

  const price = newCard.querySelector('.popup__text--price');
  price.textContent = `${ad.offer.price} ₽/ночь`;

  const type = newCard.querySelector('.popup__type');
  type.textContent = TYPES[ad.offer.type];

  const capacity = newCard.querySelector('.popup__text--capacity');
  capacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;

  const checks = newCard.querySelector('.popup__text--time');
  checks.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const featureList = newCard.querySelector('.popup__features');
  featureList.innerHTML = '';
  if (ad.offer.features) {
    featureList.appendChild(createFeatures(ad.offer.features));
  } else {
    featureList.remove();
  }

  const description = newCard.querySelector('.popup__description');
  if (ad.offer.description) {
    description.textContent = ad.offer.description;
  } else {
    description.remove();
  }

  const gallery = newCard.querySelector('.popup__photos');
  gallery.innerHTML = '';
  if (ad.offer.photos) {
    gallery.appendChild(createPhotos(ad.offer.photos));
  } else {
    gallery.remove();
  }

  return newCard;
};

const createCards = (ads) => {
  const fragment = document.createDocumentFragment();

  ads.forEach((ad) => {
    const newCard = createCard(ad);
    fragment.appendChild(newCard);
  });

  return fragment;
};

export {createCard, createCards};
