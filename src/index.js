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

    discountCheckbox.addEventListener('click', filter);

    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');

            if((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = "none";
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = "none";
            } else {
                card.parentNode.style.display = "";
            }
        })
    }

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

// get data from server

function getData() {
    const goodsWrapper = document.querySelector('.goods'); 
    return fetch('../db/db.json')
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error ('Error from server: ' + response.status);
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px;">Error</div>';
        });
}

//

// rendering cards

function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3'
        card.innerHTML = `
                 <div class="card" data-category="${good.category}">
                    ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                    <div class="card-img-wrapper">
                        <span class="card-img-top"
                            style="background-image: url('${good.img}')"></span>
                    </div>
                    <div class="card-body justify-content-between">
                        <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} $</div>
                        <h5 class="card-title">${good.title}</h5>
                        <button class="btn btn-primary">В корзину</button>
                    </div>
                </div>
        `;
        goodsWrapper.appendChild(card);
    })
}

//

function renderCatalog() {
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

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if(event.target.tagName === 'LI') {
            cards.forEach((card) => {
                if(card.dataset.category === event.target.textContent) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            })
        }
    });

    
}

getData().then((data) => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionOnPage();
    renderCatalog();
});
