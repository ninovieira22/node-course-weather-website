const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=78584a602079c223c1faaa1185187c69&query=" +
    latitude +
    "," +
    longitude;
  // + "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          "ªC degrees out. It feels like " +
          body.current.feelslike +
          "ªC degress out."
      );
    }
  });
};

module.exports = forecast;
