export let citiesTable = [];

import { CITIES } from './cities';

CITIES.forEach(city => {
  citiesTable[city.code] = city;
});
