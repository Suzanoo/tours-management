// https://github.com/nchaulet/node-geocoder
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

/*
NOTE: response from mapquest API

Request: (mapquest API use address only)
{ locationId: '110', address: '112 BKK, TH' }

Response:
[
  {
    formattedAddress: 'Soi 112, BKK, 10240, TH',
    latitude: 13.78142,
    longitude: 100.71404,
    country: null,
    city: 'BKK',
    stateCode: '',
    zipcode: '10240',
    streetName: 'Soi 112',
    streetNumber: null,
    countryCode: 'TH',
    provider: 'mapquest'
  }
]
*/
