import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
/////////////////
const DEBOUNCE_DELAY = 300;

const inputSearchCountry = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputSearchCountry.addEventListener('input', debounce(countryInp, DEBOUNCE_DELAY));

function countryInp() {
  const isFilled = inputSearchCountry.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  fetchCountries()
    .then(country => {
      renderCountryInfo(country);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

function renderCountryInfo(users) {
  if (users.length > 10) {
    console.log("1=", users.length);
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }  else if (users.length <= 9 && users.length >= 2) {
    console.log("2=", users.length);
    const markupTest = users
    .map(user => {
      return `
      <p><img src="${user.flags.svg}" alt="flag" width="50px">  ${user.name.common}</p>
        `;
    })
    .join('');

  countryInfo.innerHTML = markupTest;
}
 else  {
  console.log("3=", users.length);
    const markup = users
      .map(user => {
        return `
            <p><img src="${user.flags.svg}" alt="flag" width="50px">  ${user.name.official}</p>
            <p><b>Capital</b>: ${user.capital}</p>
            <p><b>Population</b>: ${user.population}</p>
            <p><b>Languages</b>: ${Object.values(user.languages).join(', ')}</p>
          `;
      })
      .join('');

    countryInfo.innerHTML = markup;
    console.log(markup.length);
  }
}
//////////////////////
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const DEBOUNCE_DELAY = 300;

// const input = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

// function onInputChange() {
//   const isFilled = input.value.trim();
//   countryList.innerHTML = '';
//   countryInfo.innerHTML = '';
//   if (isFilled) {
//     fetchCountries(isFilled)
//       .then(dataProcessing)
//       .catch(error => {
//         Notify.failure('Oops, there is no country with that name');
//         console.log(error);
//       });
//   }

//   function dataProcessing(data) {
//     if (data.length > 10) {
//       Notify.info('Too many matches found. Please enter a more specific name.');

//       return;
//     }

//     markup(data);
//   }

//   function markup(data) {
//     const markupData = data
//       .map(({ flags: { svg }, name: { official } }) => {
//         return `<li><img src="${svg}" alt="${official}" width="100" height="50"/>${official}</li>`;
//       })
//       .join('');

//     if (data.length === 1) {
//       const languages = Object.values(data[0].languages).join(', ');

//       const markupInfo = `<ul>
//       <li>Capital: ${data[0].capital}</li>
//       <li>Population: ${data[0].population}</li>
//       <li>Languages: ${languages}</li>
//       </ul>`;

//       countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
//     }
//     return countryList.insertAdjacentHTML('afterbegin', markupData);
//   }
// }
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
