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
    console.log('1=', users.length);
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (users.length <= 9 && users.length >= 2) {
    console.log('2=', users.length);
    const markupTest = users
      .map(user => {
        return `
      <p class="country__img"><img src="${user.flags.svg}" alt="flag" width="50px" height="30px">  <span class="country__name">${user.name.common}</span></p>
        `;
      })
      .join('');

    countryInfo.innerHTML = markupTest;
  } else {
    console.log('3=', users.length);
    const markup = users
      .map(user => {
        return `
            <p class="country__img"><img src="${user.flags.svg}" alt="flag" width="50px" height="30px">  <span class="country__name">${user.name.common}</span></p>
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
