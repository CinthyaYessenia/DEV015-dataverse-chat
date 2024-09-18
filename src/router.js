let ROUTES = {};
let rootEl;

export function setRootEl(el) {
  rootEl = el;
  return rootEl
}

setRootEl(document.getElementById('root'));

export function setRoutes(routes) {
  ROUTES = routes;
  return ROUTES
}

export function getRoutes() {
  return ROUTES;
}

const queryStringToObject = (queryString) => {
  // convert query string to URLSearchParams
  // convert URLSearchParams to an object
  // return the object
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);

}

export function renderView(pathname, props) {
  // clear the root element
  rootEl.innerHTML = '';

  // find the correct view in ROUTES for the pathname
  const view = ROUTES[pathname] || ROUTES['/error'];

  // render the correct view passing the value of props
  const componet = view(props);

  // add the view element to the DOM root element
  rootEl.appendChild(componet);
}

export function onURLChange(location) {
  const path = location.pathname;
  const query = location.search;
  const route = ROUTES[path] || ROUTES['/error'];
  const objectParams = queryStringToObject(query);

  if (typeof route !== 'function') {
    console.error(`Route for path '${path}' is not a function or not defined.`);
    return;
  }

  renderView(path, objectParams);
}


export function navigateTo(pathname, props) {
  // Build the query string if there are parameters
  const queryString = Object.keys(props).length
    ? `?${new URLSearchParams(props)}`
    : "";
  // Build the full URL
  const url = `${window.location.origin}${pathname}${queryString}`;
  // Add a new state to the browser history
  window.history.pushState(props, "", url);
  // Render the corresponding view
  renderView(pathname, props);
}
