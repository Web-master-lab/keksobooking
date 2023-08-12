const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapFieldset = mapFilters.querySelector('.map__features');
const adFieldsets = adForm.querySelectorAll('fieldset');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomPositiveFraction = (a, b, decimals) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  return Number((Math.random() * (upper - lower + 1) + lower).toFixed(decimals));
};

const toggleToDisable = () => {
  mapSelects.forEach((select) => {select.disabled = true;});
  mapFieldset.disabled = true;
  mapFilters.classList.add('map__filters--disabled');

  adFieldsets.forEach((fieldset) => {fieldset.disabled = true;});
  adForm.classList.add('ad-form--disabled');
};

const toggleToActive = () => {
  mapSelects.forEach((select) => {select.disabled = false;});
  mapFieldset.disabled = false;
  mapFilters.classList.remove('map__filters--disabled');

  adFieldsets.forEach((fieldset) => {fieldset.disabled = false;});
  adForm.classList.remove('ad-form--disabled');
};

const showMessage = (isSuccess) => {
  if (isSuccess) {
    const success = successMessage.cloneNode(true);

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        success.remove();
      }
    });
    document.addEventListener('click', () => success.remove());

    body.appendChild(success);
  } else {
    const error = errorMessage.cloneNode(true);
    const button = error.querySelector('.error__button');

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        error.remove();
      }
    });
    document.addEventListener('click', () => error.remove());
    button.addEventListener('click', () => error.remove());

    body.appendChild(error);
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveInteger, getRandomPositiveFraction, toggleToActive, toggleToDisable, showMessage, debounce};

