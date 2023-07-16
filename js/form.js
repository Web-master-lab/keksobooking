import { toggleToActive, toggleToDisable, showMessage } from './util.js';
import { createCard } from './create-cards.js';

const CENTER_COORDINATE = {
  lat: 35.681729,
  lng: 139.753927
};

const MAX_VALUE = 100000;

const TYPES = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const ROOMS_LIMITS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const type = document.querySelector('#type');
const title = document.querySelector('#title');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const reset = document.querySelector('.ad-form__reset');
const description = document.querySelector('#description');
const features = document.querySelectorAll('.features__checkbox');
const images = document.querySelector('#images');
const avatar = document.querySelector('#avatar');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  start: 0,
  step: 1,
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

document.addEventListener('load', toggleToDisable);

const map = L.map('map-canvas')
  .on('load', () => {
    toggleToActive();
    address.value = `${CENTER_COORDINATE.lat}, ${CENTER_COORDINATE.lng}`;
  })
  .setView({
    lat: CENTER_COORDINATE.lat,
    lng: CENTER_COORDINATE.lng
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },)
  .addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const mainPinMarker = L.marker(
  {
    lat: CENTER_COORDINATE.lat,
    lng: CENTER_COORDINATE.lng
  },
  {
    draggable: true,
    icon: mainPinIcon
  })
  .addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const regularPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    ads.forEach((ad) => {
      const regularPinMarker = L.marker(
        {
          lat: ad.location.lat,
          lng: ad.location.lng
        },
        {
          icon: regularPinIcon
        }
      );
      regularPinMarker
        .addTo(map)
        .bindPopup(createCard(ad));
    });
  })
  .catch(() => {
    const errorElement = document.createElement('div');
    errorElement.textContent = 'Ошибка загрузки данных с сервера';
    errorElement.classList.add('error__message--fetch');
    document.body.appendChild(errorElement);

    const button = document.createElement('button');
    button.textContent = 'Хорошо';
    button.classList.add('error__button');
    button.classList.add('error__button--fetch');
    errorElement.appendChild(button);

    button.addEventListener('click', () => errorElement.remove());
  });

const clearForm = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100000
    },
    start: 0,
    step: 1,
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return value;
      },
    }
  });

  mainPinMarker.setLatLng({
    lat: CENTER_COORDINATE.lat,
    lng: CENTER_COORDINATE.lng
  });

  address.value = `${CENTER_COORDINATE.lat}, ${CENTER_COORDINATE.lng}`;
  title.value = '';
  price.value = 0;
  rooms.value = 1;
  guests.value = 3;
  type.value = 'flat';
  timein.value = '12:00';
  timeout.value = '12:00';
  description.value = '';
  features.forEach((feature) => {feature.checked = false;});
  images.value = '';
  avatar.value = '';
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);

    fetch('https://25.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData
      }
    ).then(() => {
      showMessage(true);
      clearForm();
    })
      .catch(() => {showMessage(false);});
  }
});

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

type.addEventListener('change', () => {
  price.min = TYPES[type.value];
  price.placeholder = TYPES[type.value];
});

const changeTime = (changedTime, autoChangedTime) => {
  const selectedTime = changedTime.value;
  autoChangedTime.value = selectedTime;
};

timein.addEventListener('change', () => {changeTime(timein, timeout);});
timeout.addEventListener('change', () => {changeTime(timeout, timein);});

const validatePrice = () => {
  const minValue = TYPES[type.value];
  const enteredPrice = Number(price.value);
  return typeof enteredPrice === 'number' && enteredPrice >= minValue && enteredPrice <= MAX_VALUE;
};

const validateRooms = () => {
  const selectedGuests = Number(guests.value);
  const allowedGuests = ROOMS_LIMITS[Number(rooms.value)];
  return allowedGuests.includes(selectedGuests);
};

pristine.addValidator(guests, validateRooms, 'На каждого гостя должна быть 1 комната');
pristine.addValidator(price, validatePrice, 'Неверная цена');
