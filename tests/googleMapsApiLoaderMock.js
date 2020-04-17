class Loader {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  load() {
    window.google = "Google Maps Loaded";
    return Promise.resolve();
  }
}

export default {
  __esModule: true,
  default: null,
  Loader,
};
