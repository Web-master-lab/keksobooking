import {getRandomPositiveInteger, getRandomPositiveFraction} from './util.js';

const TITLES = [
  'Кунак Rooms',
  'DQ',
  'Ramada Kazan City Centre',
  'Гранд-отель «Казань»',
  'Korston Royal Kazan',
  'Клуб-отель «Корона»',
  'Korston Tower',
  'Suleiman Palace',
  'Ногай',
  'Ханума'
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const CHECKS = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const DESCRIPTION = [
  'Идти до него всего 15 минут, при этом отель расположен у известной достопримечательности — озера Кабан. Сюда и открывается вид из некоторых апартаментов. Вы можете приехать с семьёй: размещение предполагается до четырёх человек, есть собственная кухня и ванная комната со всем необходимым, а завтрак бесплатный для всех гостей.',
  'Отель располагается недалеко от ж/д вокзала: если вы приехали в Казань на поезде, можно даже не брать такси — только пройтись пешком 5 минут. Центр близко, но и вокруг гостиницы много достопримечательностей. Например, Музей социалистического быта и Литературный музей им. Габдуллы Тукая, а также Султановская мечеть.',
  'Такой высокий рейтинг более, чем оправдан: Ramada — это отель мирового уровня, вместе с другими известными брендами он входит в крупнейшую гостиничную сеть Wyndham Hotels and Resorts. Если вы предпочитаете самое высокое качество сервиса в сочетании с ненавязчивым обслуживанием и при этом для вас важно, чтобы отель или гостиница находились в центре города — вам точно сюда.',
  'Изысканные интерьеры выдержаны в неоклассическом стиле, просторные дизайнерские номера или апартаменты — в бежево-коричневой и бирюзовой гамме. Внизу есть лаунж-зона с камином, баром и собственной библиотекой, конференц-зал со всем нужным функционалом для проведения крупного делового мероприятия, а также ресторан, повара которого балуют постояльцев великолепными кулинарными творениями. В отеле можно жить с небольшими животными.',
  'Про знаменитую улицу Баумана — так называемый казанский Арбат — вы, наверняка, слышали. Улица Петербургская — органичное её продолжение. Здесь и находится отель. Это всё ещё исторический центр столицы Республики, но здесь не так многолюдно. За короткое время вы доберётесь до кремля, мечети Кул-Шариф, Богоявленской церкви, Государственного академического театра оперы и балета, Качаловского театра.',
  'Гостиничный комплекс составляет 17 этажей с полной инфраструктурой, комфортабельными номерами и чарующим видом на город. Имеется тут и конференц-зал на 250 человек, есть и поменьше — на 80 человек, а также переговорная на 20 человек. Если вы собираетесь в Казань по работе, гостиница предоставит вам отличные деловые перспективы. А если по поводу торжества (например, хотите отметить тут свадьбу), вам помогут организовать банкет в ресторане при отеле.',
  'Хотите снять гостиницу в центре Казани, отправляясь в командировку — присмотритесь к этой. Она считается одной из самых технологичных в России и Восточной Европе, находится в деловом районе, тут есть конференц-залы совершенно разной вместимости. В самом большом можно провести мероприятие для 1 600 человек. В номерах нескольких категорий даже предусмотрена комфортная рабочая зона.',
  'Республика Татарстан любит радовать уютом и красотой: вот и этот бутик-отель не исключение. Он находится в центре города, но при этом удалён от шумных улиц — место тихое, здесь вы будете хорошо отдыхать. Гостиница выглядит очень романтично: снаружи она исполнена в историческом стиле в виде замка, внутри стилизована под старину качественным камнем и деревом дорогих пород.',
  'Отправляясь в Казань, помните: лучшие отели не обязательно в центре. Korston Tower, например, находится не в самом сердце города — до кремля и мечети Кул-Шариф нужно проехать 10 минут на машине — но всё же он занимает выгодное местоположение и имеет отличную инфраструктуру. Рядом с ним пересекаются крупные магистрали, располагается Центральный парк культуры и отдыха.',
  'Номерной фонд представлен первой и клубной категорией, в каждом варианте будут окна в пол с панорамным видом на город: будете наблюдать реку, соборы и мечети. Завтрак включён в стоимость проживания, обедать и ужинать можно в ресторане итальянской кухни. Для деловых мероприятий выбирайте один из восьми конференц-залов, а отдыхайте в соляной пещере, бассейне или тренажёрном зале. Маленьким путешественникам будет интересно посетить мини-клуб и игровую площадку, так что приезжать можно всей семьей. И даже с домашними животными.'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAvatarUrl = () => {
  const number = getRandomPositiveInteger(1, 10);
  return number < 10 ? `img/avatars/user0${number}.png` : `img/avatars/user${number}.png`;
};

const createFeatures = () => {
  const features = [];
  FEATURES.forEach((feature) => {
    if (getRandomPositiveInteger(0,1)) {
      features.push(feature);
    }
  });
  return features;
};

const createPhotos = () => {
  const photos = [];
  while (photos.length === 0) {
    PHOTOS.forEach((photo) => {
      if (getRandomPositiveInteger(0,1)) {
        photos.push(photo);
      }
    });
  }
  return photos;
};

const createLocation = () => ({
  lat: getRandomPositiveFraction(35.65000, 35.70000, 5),
  lng: getRandomPositiveFraction(139.70000, 139.80000, 5)
});

const createAd = () => {
  const {lat, lng} = createLocation();

  return {
    author: {
      avatar: createAvatarUrl()
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0,9)],
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(10000, 100000),
      type: TYPES[getRandomPositiveInteger(0,4)],
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1,20),
      checkin: CHECKS[getRandomPositiveInteger(0,2)],
      checkout: CHECKS[getRandomPositiveInteger(0,2)],
      features: createFeatures(),
      description: DESCRIPTION[getRandomPositiveInteger(0,9)],
      photos: createPhotos()
    },
    location: {
      lat: lat,
      lng: lng
    }
  };};

const createAds = (amount) => {
  const ads = [];
  for (let i = 0; amount > i; i++) {
    ads.push(createAd());
  }
  return ads;
};

export {createAds};