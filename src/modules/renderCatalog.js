import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const category = new Set();

    cards.forEach((card) => {
        category.add(card.dataset.category);
    });

    category.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('li')

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if(event.target.tagName === 'LI') {
            allLi.forEach((elem) => {
                if(elem === event.target) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            })
            filter();
        }
    });

    
}