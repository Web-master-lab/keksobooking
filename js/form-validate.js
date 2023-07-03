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

const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const type = document.querySelector('#type');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form',
  errorTextParent: 'ad-form',
  errorTextClass: 'error__message',
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
});

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

pristine.addValidator(guests, validateRooms, 'Неверное количество гостей');
pristine.addValidator(price, validatePrice, 'Неверная сумма');
