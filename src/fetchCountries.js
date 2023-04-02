// використовуюй бібліотеку notiflix.
import Notiflix from 'notiflix';

// 1. Напиши функцію fetchCountries(name), яка робить HTTP-запит на
// ресурс name і повертає проміс з масивом країн - результатом запиту.
// Винеси в окремий файл.

// 2.Фільтрацію полів по: name,capital,population,flags,languages

// 3.Якщо користувач ввів назву країни, якої не існує, бекенд 
// поверне не порожній масив, а помилку зі статус кодом 404 - не 
// знайдено.Якщо це не обробити, то користувач ніколи не дізнається
//  про те, що пошук не дав результатів.Додай повідомлення 
// "Oops, there is no country with that name".

BASE_URL = 'https://restcountries.com/v3.1/name/';


export function fetchCountries(name) {
    fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
        })
        .catch(error => {
            Notiflix.Notify.warning("Oops, there is no country with that name")
        });
}
