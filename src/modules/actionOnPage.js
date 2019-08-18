import filter from './filter';

export default function actionOnPage() {

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.querySelector('#discount-checkbox'),
        min = document.querySelector('#min'),
        max = document.querySelector('#max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filter);

    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((elem) => {
            const title = elem.querySelector('.card-title');
            if(!searchText.test(title.textContent)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        })

    })
}

 
