[![Built with Spacemacs](https://cdn.rawgit.com/syl20bnr/spacemacs/442d025779da2f62fc86c2082703697714db6514/assets/spacemacs-badge.svg)](http://spacemacs.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Meteo

Meteo is a simple, minimalist weather application built in Node, Webpack, ES6, Stylus and React.
The App provides a 5 day weather forecast using [Openweathermaps 5 day weather API](https://openweathermap.org/forecast5) and Google places to parse Latitude and Longitude for the places search.

## Requirements

It requires Yarn to manage dependencies and Node v8.9.1 (The Current LTS as of writing) to run the production server.

The api fetch requests requires a google places API key and an openweathermaps API key, these are currently hardcoded into the app but can be switched out as required.

## Installation

* Clone The Repo

* Ensure the correct node version is being used

* run ```yarn install``` to install node dependencies

* run ```yarn dev``` to spin up a development server which should also open the app in your favourite browser

* run ```yarn start``` to build the project and start a production server

## Features

* Search for 5 day weather forecast by location

* Theme changes based on sunrise / sunset times of chosen location

* Timelines in 3 hour intervals for each day and graphs showing humidity, rainfall, temperature and windspeed

* Location is stored via local storage and persists on page refresh

## Todos

* A graph for Snowfall that only appears if there is any.

* Better styling for the search component

* Better styling for the logo component

* Testing for components - While the app is centered around an api, tests for data manipulation and component snapshots need to be done.

* Integrate with the HTML5 Geolocation API to get the current position of the user on initial load.

* PWA and Storage workers. The app is definitely small enough in scope to be moved to Preact or something more lightweight and leverage storage workers and caching to become a PWA app.

* Move API calls to the node server in production so API keys don't need to be hard coded.

## License

MIT, Open Source, just credit the author if you plan to expand on the project.
