export const fetchData = (url, options = {}) => {
  return fetch(url, options)
    .then(response => response.json()) 
    .catch(error => console.log(`There was an error: ${error}`));
}
