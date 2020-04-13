// Mock Local Storage
var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// requestAnimationFrame polyfill
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// Mock Google API
const google = {
  maps: {
    places: {
      AutocompleteService: () => {},
      PlacesServiceStatus: {
        OK: 'OK'
      }
    }
  }
}
global.google = google
global.window.google = google