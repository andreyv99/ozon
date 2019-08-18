export default function filter() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.querySelector('#discount-checkbox'),
        min = document.querySelector('#min'),
        max = document.querySelector('#max'),
        activeLi = document.querySelector('.catalog-list li.active')

    cards.forEach((card) => {
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        const discount = card.querySelector('.card-sale');

        card.parentNode.style.display = "";

        if((min.value && price < min.value) || (max.value && price > max.value)) {
            card.parentNode.style.display = "none";
        } else if (discountCheckbox.checked && !discount) {
            card.parentNode.style.display = "none";
        } else if (activeLi) {
            if(card.dataset.category !== activeLi.textContent) {
                card.parentNode.style.display = "none";
            } 
        } 
    })
}