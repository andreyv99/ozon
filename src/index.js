// checkbox

function toggleCheckbox() {
    const checkbox = document.querySelector('#discount-checkbox')

    checkbox.addEventListener('change', function () {
        if(this.checked) {
            this.nextElementSibling.classList.add('checked');
        }else {
            this.nextElementSibling.classList.remove('checked');
        }
    })
}

//

// basket 

function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');
    
    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    })
    
    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = 'initial';
    })
}

//

// toggling goods into basket

function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.querySelector('#cart-empty');
    const countGoods = document.querySelector('.counter');
    
    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();
    
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            })
        })
    })
    
    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardPrice= cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;
        
        cardPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent)
            sum = sum + price;
            console.log(sum);
        })
        cardTotal.textContent = sum
    
        if(cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}

//

// promote filter 

function actionOnPage() {

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.querySelector('#discount-checkbox'),
        min = document.querySelector('#min'),
        max = document.querySelector('#max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', () => {
        cards.forEach((elem) => {
            if(discountCheckbox.checked) {
                if(!elem.querySelector('.card-sale')) {
                    elem.parentNode.style.display = 'none';
                } 
            } else {
                elem.parentNode.style.display = 'block';
            }
        })
    });

    function filterPrice() {
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            console.log(price);
            if((min.value && price < min.value) || (max.value && price > max.value)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        }) 
    }

    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

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

//

toggleCheckbox();
toggleCart();
addCart();
actionOnPage();