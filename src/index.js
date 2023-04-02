import './css/styles.css';
// використовуй бібліотеку notiflix
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
// Використовуємо пакет lodash.debounce.
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

// Звертаємось до інпуту
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

// застосувати прийом Debounce на обробнику події. 
inputEl.addEventListener('input', debounce((handleInputContries), DEBOUNCE_DELAY));

function handleInputContries(e) {
// Виконай санітизацію введеного рядка методом trim()
    const searchCountry = e.target.value.trim();
    console.log(searchCountry);

// Якщо користувач повністю очищає поле пошуку, то HTTP-запит не 
// виконується, а розмітка списку країн або інформації про країну зникає.
countryListEl.innerHTML = '';
countryInfoEl.innerHTML = '';
    
    if (!searchCountry)
        return;
    
   fetchCountries(searchCountry)
        .then(data => {
      console.log(data);
// Якщо у відповіді бекенд повернув > 10 країн: повідомлення 
// "Too many matches found. Please enter a more specific name.".
        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
            // Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем
// відображається список знайдених країн.Кожен елемент списку 
// складається з прапора та назви країни.
        } else if (data.length > 2 && data.length < 10) {
            countryListEl.innerHTML = addCountryList(data);
            console.log(data);
        }
// Якщо результат запиту - це масив з однією країною, в інтерфейсі 
// відображається розмітка картки з даними про країну: прапор, 
// назва, столиця, населення і мови.
        countryInfoEl.innerHTML = addCountryInfo(data);
        console.log(data);
})
}

function addCountryList(data) {
    return data.map(({ name, flags }) => `
    <li>
    <img src='${flags.svg}' alt='${name.official}'>${name.official}
    </li>`
    ).join('');
};

function addCountryInfo(data) {
    return data.map(({ name, capital, population, flags, languages }) =>`
        <img src='${flags.svg}' alt='${name.official}'>${name.official}
        <h1>${name.official}</h1>
        <ul>
        <li>${capital}</li>
        <li>${population}</li>
        <li>${Object.value(languages)}</li>
        </ul>`
    )
}





