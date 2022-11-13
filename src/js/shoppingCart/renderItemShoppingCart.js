import itemShoppingCart from "./itemShoppingCart.js";

const renderItemShoppingCart = (shoppingCartStorage) => {
    const buttonCartCount = document.getElementById('buttonCartCount');
    const shoppingCartItems = document.getElementById('shoppingCartItems');
    const shoppingCartTotalPrice = document.getElementById('shoppingCartTotalPrice');
    const btnPurchase = document.getElementById('btnPurchase');
    const modalSuccesfullPurchase = document.getElementById('modalSuccesfullPurchase');
    const fragmentProductsShoppingCart = document.createDocumentFragment();
    
    const shoppingCartModalContainer = document.getElementById('shoppingCartModalContainer');
    const shoppingCartModal = document.getElementById('shoppingCartModal');
    const modalProductRemoved = document.getElementById('modalProductRemoved');

    function enableScroll(){  
        document.querySelector('body').style.overflowY = 'auto';
    }

    const removeShoppingCart = (product) => {
        shoppingCartStorage = shoppingCartStorage.filter((productRemove) => productRemove.id !== product.id);

        if(shoppingCartStorage.length === 0){
            localStorage.removeItem('productsInCart')
            enableScroll();
            shoppingCartModalContainer.style.right = '-100%';
            shoppingCartModal.style.right = '-100%';
            btnPurchase.style.cursor = 'auto';
            btnPurchase.style.opacity = '.4';
            btnPurchase.setAttribute('disabled', true);
        } else{
            localStorage.setItem('productsInCart', JSON.stringify(shoppingCartStorage))
        }
        
        modalProductRemoved.style.bottom = '10px';
        const intervalAnimationModal = setInterval(() => {
            modalProductRemoved.style.bottom = '-50px';
            clearInterval(intervalAnimationModal)
        }, 2000)
        showShoppingCartStorage();
    }

    const decreaseAmountProducts = (amountProduct, product) => {
        shoppingCartStorage.map((productCart) => productCart.id === product.id ? productCart.amount -= 1 : '');
        amountProduct.value = Number(amountProduct.value) - 1;

        localStorage.setItem('productsInCart', JSON.stringify(shoppingCartStorage))
        showShoppingCartStorage()
    }

    const increaseAmountProducts = (amountProduct, product) => {
        shoppingCartStorage.map((productCart) => productCart.id === product.id ? productCart.amount += 1 : '');
        amountProduct.value = Number(amountProduct.value) + 1;

        localStorage.setItem('productsInCart', JSON.stringify(shoppingCartStorage))
        showShoppingCartStorage()
    }

    const showShoppingCartStorage = () => {
        shoppingCartStorage.map((product) => {
            const article = document.createElement('article');
            article.className = 'item-cart';
            article.innerHTML = itemShoppingCart(product, product.discount !== 0 && true);
            fragmentProductsShoppingCart.appendChild(article)
    
            const itemCartRemove = fragmentProductsShoppingCart.getElementById(`itemCartRemove-${product.id}`);
            itemCartRemove.addEventListener('click', (e) => {
                e.preventDefault();
                buttonCartCount.innerText = Number(buttonCartCount.innerText) - 1;
                removeShoppingCart(product)
            })
            
            const btnAmountDecrease = fragmentProductsShoppingCart.getElementById(`btnAmountDecrease-${product.id}`);
            const btnAmountIncrease = fragmentProductsShoppingCart.getElementById(`btnAmountIncrease-${product.id}`);
            const amountProduct = fragmentProductsShoppingCart.getElementById(`amountProduct-${product.id}`);

            btnAmountDecrease.addEventListener('click', (e) => {
                e.preventDefault();
                Number(amountProduct.value) > 1 && decreaseAmountProducts(amountProduct, product);
            })

            btnAmountIncrease.addEventListener('click', (e) => {
                e.preventDefault();
                increaseAmountProducts(amountProduct, product);
            })
        });
        shoppingCartTotalPrice.innerText = `$ ${shoppingCartStorage.reduce((totalPrice, product) => 
            product.discount !== 0
                ? totalPrice += (product.price - (product.price * product.discount / 100)) * product.amount 
                : totalPrice += product.price * product.amount, 0).toFixed(2)
        }`
        shoppingCartItems.innerHTML = '';
        shoppingCartItems.appendChild(fragmentProductsShoppingCart);
    }

    showShoppingCartStorage();

    btnPurchase.style.cursor = 'pointer';
    btnPurchase.style.opacity = '1';
    btnPurchase.removeAttribute('disabled')
    btnPurchase.addEventListener('click', (e) => {
        e.preventDefault();
        enableScroll();
        shoppingCartModalContainer.style.right = '-100%';
        shoppingCartModal.style.right = '-100%';
        modalSuccesfullPurchase.style.bottom = '10px';
        const intervalAnimationModal = setInterval(() => {
            modalSuccesfullPurchase.style.bottom = '-50px';
            clearInterval(intervalAnimationModal)
        }, 2000);
        localStorage.removeItem('productsInCart');
        shoppingCartStorage.length = 0;
        buttonCartCount.innerText = 0;
        btnPurchase.style.cursor = 'auto';
        btnPurchase.style.opacity = '.4';
        btnPurchase.setAttribute('disabled', true);
        showShoppingCartStorage();
    })
}

export default renderItemShoppingCart