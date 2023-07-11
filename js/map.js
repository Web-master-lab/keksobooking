import { toggleToActive, toggleToDisable } from './util.js';
import { createAds } from './mocks.js';
import { createCard } from './create-cards.js';

const CENTER_COORDINATE = {
  lat: 35.681729,
  lng: 139.753927
};
const MOCKS = createAds(10);

const address = document.querySelector('#address');

toggleToDisable();

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
  },
).addTo(map);

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
  }
).addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const regularPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

MOCKS.forEach((mock) => {
  const regularPinMarker = L.marker(
    {
      lat: mock.location.lat,
      lng: mock.location.lng
    },
    {
      icon: regularPinIcon
    }
  );
  regularPinMarker
    .addTo(map)
    .bindPopup(createCard(mock));
});
