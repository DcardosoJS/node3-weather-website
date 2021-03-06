const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZG9ud29yIiwiYSI6ImNqdnM0NHRqYjAyY240OXFteXc4Z3ZjOHkifQ.Mb_eAavRsfTkJmRppfv71g";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Erro de connecção aos serviços de localização.", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Localização não encontrada. Por favor tente novamente.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
