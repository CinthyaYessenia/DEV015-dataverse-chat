import { Home } from '/views/Home.js';
import { ApiKey } from '/views/ApiKey.js';
import { Error } from '/views/Error.js';
import { Chat } from '/views/Chat.js';

// ... import other views
import { setRootEl, setRoutes, onURLChange } from './router.js';

// Define your routes and their associated views
const rootEl = document.getElementById('root');

const routes = {
  '/': Home,
  '/api-key': ApiKey,
  '/error': Error,
  '/chat': Chat,
  // ...
};

setRoutes(routes);

// Set the root element where views will be rendered
window.addEventListener("DOMContentLoaded", () => {
  setRootEl(rootEl);
  onURLChange(window.location);
});

// Listen for URL changes
window.addEventListener('popstate', () => {
  onURLChange(window.location);
});


// cuando se cambia la ruta, se llama a renderView con la nueva ruta y props
//window.addEventListener('popstate', () => {
//const pathname = window.location.pathname;
// renderView(pathname, {});
//});

// En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.

/*
import Example from './views/Example.js';

Ejemplo de definición de rutas:

const routes = {
    "/": Example,
    ...
}
*/

/*
TODO:
1.- Definir rutas en router.
2.- Pasar "root element" a router.
3.- Invocar el router para renderizar la vista correcta.
*/