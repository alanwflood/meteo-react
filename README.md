[![Netlify Status](https://api.netlify.com/api/v1/badges/2640a25a-d2da-411a-8ee4-8db701b0cb2e/deploy-status)](https://app.netlify.com/sites/distracted-wright-bee694/deploys)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Meteo

Meteo is a simple, minimalist weather application built with Webpack, ES6, Stylus and React.
The App provides a 5 day weather forecast using [Openweathermaps 5 day weather API](https://openweathermap.org/forecast5) and Google places to parse Latitude and Longitude for the places search.

It's currently deployed on Netlify [here](https://distracted-wright-bee694.netlify.com/)

## Requirements

- The api requests for the Places Searchbar requires a Google Places API key
- The api requests for weather forecasts requires an [Openweathermaps Api key](https://openweathermap.org)

Check out the `.env.example` file to see what needs to be added.

## Installation

- Clone The Repo

- Copy `.env.example` to `.env` and file in the required keys as per the requirements section.

- Ensure a working version of node is installed.

- run `npm install` to install required dependencies.

- run `npm run dev` to spin up a development server at http://localhost:7777.
-
- run `npm run build` to build the project to the `dist` directory

- run `npm run start` to build the project and start a production server at http://localhost:5000

## Features

- Search for 5 day weather forecast by location

- Theme changes based on sunrise / sunset times of chosen location

- Timelines in 3 hour intervals for each day and graphs showing humidity, rainfall, temperature and windspeed

- Location is stored via local storage and persists on page refresh

- Uses PWA features to cache for offline usage!

## Todos

- A graph for Snowfall that only appears if there is any.

- Testing for components - While the app is centered around an api, tests for data manipulation and component snapshots need to be done.

- Integrate with the HTML5 Geolocation API to get the current position of the user on initial load.

## License

MIT, Open Source, just credit the author if you plan to expand on the project.
