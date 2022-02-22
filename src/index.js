import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputSearchCountry = document.querySelector('#search-box');
const userList = document.querySelector(".country-info");
console.log(inputSearchCountry);
inputSearchCountry.addEventListener('input',  () => {
    fetchCountries().then((country) => renderCountryList(country))
      .catch((error) => console.log(error));
  });


function fetchCountries(name) {
    const nameCountry = inputSearchCountry.value;
    console.log(inputSearchCountry.value);
    return fetch(`https://restcountries.com/v3.1/name/${nameCountry}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
//   Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name и возвращает промис с массивом стран - результатом запроса. Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.
// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

function renderCountryList(users) {
    const markup = users
      .map((user) => {
        return `<li>
            <p><b>Name</b>: ${user.name.officia}</p>
            <p><b>Email</b>: ${user.flags.svg}</p>
            <p><b>Company</b>: ${user.capital}</p>
            <p><b>Company</b>: ${user.population}</p>
            <p><b>Company</b>: ${user.languages}</p>
          </li>`;
      })
      .join("");
    userList.innerHTML = markup;
  }
  //   name.official - полное имя страны
// flags.svg - ссылка на изображение флага
// capital - столица
// population - население
// languages