const itemShoppingCart = (product, hasDiscount = false) => {
    const productWithDiscount = hasDiscount ? `${(product.price - product.price*product.discount/100).toFixed(2)}` : product.price.toFixed(2);
    
    return `
        <button title="Button Remove Item of Shopping Cart" class="primary-button item-cart__remove" id="itemCartRemove-${product.id}">
            <i class="fa-solid fa-trash"></i>
        </button>
        <div class="item-cart__img">
            <img src="${(product.url_image !== '' && product.url_image !== null) ? product.url_image : 'src/assets/imageNotFound.png'}" alt="${product.name}" alt="${product.name}">
        </div>
        <div class="item-cart__detail">
            <p class="item-cart__detail__title">${product.name}</p>
            <p class="item-cart__detail__information">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero officiis consequatur, soluta voluptates odit et fuga consectetur qui alias impedit nulla officia modi repudiandae, adipisci obcaecati molestias! Facere, voluptatem obcaecati.
            </p>
            <div class="item-cart__detail__price-amount">
                <p class="item-cart__detail__price">$${(productWithDiscount*product.amount).toFixed(2)}</p>
                <div class="item-cart__amount">
                    <button title="Button to Decrease the Amount of Products" class="primary-button button-cart__remove" id="btnAmountDecrease-${product.id}">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <input type="text" value="${product.amount}" title="amountProduct" readOnly id="amountProduct-${product.id}">
                    <button title="Button to Increase the Amount of Products" class="primary-button button-cart__add" id="btnAmountIncrease-${product.id}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `
}

export default itemShoppingCart