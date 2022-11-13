import productCard from './productCard.js';
import renderProductDetail from '../productDetail/renderProductDetail.js';

const renderAllProducts = (products) => {
    const productCardsContainer = document.getElementById('productCardsContainer');
    const fragment = document.createDocumentFragment();
    const buttonCartCount = document.getElementById('buttonCartCount');
    const modalProductAdded = document.getElementById('modalProductAdded');

    const addShoppingCart = (product) => {
        let shoppingCartStorage = [];
        if(localStorage.getItem('productsInCart')){
            shoppingCartStorage = JSON.parse(localStorage.getItem('productsInCart'))
        }
        const thereIs = shoppingCartStorage.some((productCart) => productCart.id === product.id);
        if(thereIs){
            shoppingCartStorage.map((productCart) => productCart.id === product.id && (productCart.amount += 1));
        } else{
            shoppingCartStorage.push({...product, amount: 1});
            buttonCartCount.innerText = Number(buttonCartCount.innerText) + 1;
        }

        modalProductAdded.style.bottom = '10px';
        const intervalAnimationModal = setInterval(() => {
            modalProductAdded.style.bottom = '-50px';
            clearInterval(intervalAnimationModal)
        }, 2000)

        localStorage.setItem('productsInCart', JSON.stringify(shoppingCartStorage))
    }

    const showCardsProducts = (dataProducts) => {
        dataProducts.map((product) => {
            const article = document.createElement('article');
            article.className = 'product-card';
            article.innerHTML = productCard(product, product.discount !== 0 && true);
    
            fragment.appendChild(article);
    
            const btnAddCart = fragment.getElementById(`btnAddCart-${product.id}`);
            btnAddCart.addEventListener('click', (e) => {
                e.preventDefault();
                addShoppingCart(product)
            })

            const dataCard = fragment.getElementById(`dataCard-${product.id}`);
            dataCard.addEventListener('click', () => {
                renderProductDetail(product)
            })
        });

        productCardsContainer.innerHTML = '';
        productCardsContainer.appendChild(fragment);
    }

    showCardsProducts(products);
}

export default renderAllProducts