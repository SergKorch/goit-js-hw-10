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

// function fetchCountries(name) {
//   const address = 'https://restcountries.com/v3.1/name/';
//   const options = `?fields=name,capital,population,flags,languages`;

//   return fetch(`${address}${name}${options}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

