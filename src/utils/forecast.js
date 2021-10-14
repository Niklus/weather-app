const request = require("request");

const forecast = (lat, lng, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3da2fc24d92a50bc0b166320760a8151&query=" +
    lat +
    "," +
    lng +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out."
      );
    }
  });
};

module.exports = forecast;
