const productCard = (product, hasDiscount = false) => {
    const productWithDiscount = hasDiscount ? `$${(product.price - product.price*product.discount/100).toFixed(2)}` : '';

    return `
        <div class="product-card__discount ${hasDiscount ? 'showDiscount' : 'hiddenDiscount'}">-${product.discount}%</div>
        <div class="product-card__img" id="dataCard-${product.id}">
            <img src="${(product.url_image !== '' && product.url_image !== null) ? product.url_image : 'src/assets/imageNotFound.png'}" alt="${product.name}">
        </div>
        <div class="product-card__detail">
            <p class="detail__title">${product.name}</p>
            <p class="detail__information">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero officiis consequatur, soluta voluptates odit et fuga consectetur qui alias impedit nulla officia modi repudiandae, adipisci obcaecati molestias! Facere, voluptatem obcaecati.
            </p>
            <div class="detail__price__cart">
                <div class="detail__price">
                    <p class="detail__price-discount">${hasDiscount ? productWithDiscount : ''}</p>
                    <p class="${hasDiscount ? 'detail__price-real discount' : 'detail__price-discount'}">$${product.price.toFixed(2)}</p>
                </div>
                <button class="primary-button button-cart" id="btnAddCart-${product.id}">
                    <span>+ Add</span>
                </button>
            </div>
        </div>
    `
}

export default productCard