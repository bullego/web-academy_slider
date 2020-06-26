export const parallaxTransform = ( coeficient ) => {
  let position = window.pageYOffset;
  return position*coeficient;
}

export const getDataFromUrl = (url) => {
  return fetch(url)
	.then(res=>res.json())
	.catch(err => console.log('Error: ', err));
}

export const createDOMElement = (el) => {
  return document.createElement(el);
}
