export default function fetchCountries(name) {
    const inputSearchCountry = document.querySelector('#search-box');
    const nameCountry = inputSearchCountry.value;
  console.log(inputSearchCountry.value);
  return fetch(`https://restcountries.com/v3.1/name/${nameCountry}
    `).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}