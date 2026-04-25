require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebards engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// recebe a view (index.hbs) e renderiza no navegador
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Lucas',
  });
});

// route para a página about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Lucas',
  });
});

// route para a página help
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'New message being sent',
    title: 'Help',
    name: 'Lucas',
  });
});

// route para a página weather
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }

//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Lucas',
    errorMessage: 'Help article not found',
  });
});

// qualquer página que não tenha um route acaba caindo nessa regra
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Lucas',
    errorMessage: 'Page not found',
  });
});

// iniciar o server
app.listen(port, () => {
  console.log('Server is running on port' + port);
});
