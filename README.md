[![Built with Spacemacs](https://cdn.rawgit.com/syl20bnr/spacemacs/442d025779da2f62fc86c2082703697714db6514/assets/spacemacs-badge.svg)](http://spacemacs.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Meteo

Meteo is a weather built in Node, Webpack, ES6 and React.
The App provides a 5 day weather forecast using [Openweathermaps 5 day weather API](https://openweathermap.org/forecast5) and Google places to parse Latitude and Longitude for the places search.

It requires Yarn to manage dependencies and Node v8.9.1 (The Current LTS as of writing) to run the production server.

Lastly for the api fetch requests it requires a google places API key and an openweathermaps API key,
these are currently hardcoded but can be switched out as required.

## Installation

* Clone The Repo

* Ensure the correct node version is being used

* run ```yarn install``` to install node dependencies

* run ```yarn dev``` to spin up a development server

* run ```yarn start``` to build the project and start a production server

## Todos

* A graph for Snowfall that only appears if there is any.

* Better styling for the search component

* Better styling for the logo component

* Testing for components - While the app is very centered around an api, tests for data manipulation need to be done.

* Integrate with the Geolocation API to get the current position of the user on initial load.

* Save last searched location to local storage so on refreshes the last searched location appears.

* PWA and Storage workers. The app is definitely small enough in scope to be moved to Preact or something more light weight and leverage storage workers and caching to become a PWA app.

* Move API calls to the node server in production so API keys don't need to be hard coded.

## License

MIT, Open Source, go nuts, just credit the author if you plan to use it or expand it.
