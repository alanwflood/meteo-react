import "whatwg-fetch";
// Styles
import "./assets/stylesheets/application.styl";
import initApp from "./app";
import registerServiceWorker from "./serviceWorker";

initApp();
registerServiceWorker();
