const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapFieldset = mapFilters.querySelector('.map__features');
const adFieldsets = adForm.querySelectorAll('fieldset');

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

export {toggleToActive, toggleToDisable};
