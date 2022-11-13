import productCard from './productCard.js';

const renderCard = (product) => {
    const hasDiscount = product.discount !== 0 ? true : false;
    document.getElementById('productCardsContainer').innerHTML += productCard(product, hasDiscount);
}

export default renderCard