const renderProductDetail = (productInformation) => {
    const productDetailModalContainer = document.getElementById('productDetailModalContainer');
    const productDetail = document.getElementById('productDetail');
    const mainImg = document.getElementById('mainImg');
    const smallImg = document.getElementsByClassName('small-img');
    const informationTitle = document.getElementById('informationTitle');
    const informationPrice = document.getElementById('informationPrice');
    const informationPriceDiscount = document.getElementById('informationPriceDiscount');

    const productWithDiscount = productInformation.discount !== 0 ? `$ ${(productInformation.price - productInformation.price*productInformation.discount/100).toFixed(2)}` : `$ ${productInformation.price.toFixed(2)}`;

    function disableScroll(){  
        document.querySelector('body').style.overflowY = 'hidden';
    }

    mainImg.src = (productInformation.url_image !== '' && productInformation.url_image !== null) 
        ? productInformation.url_image 
        : 'src/assets/imageNotFound.png';
    smallImg[0].src = (productInformation.url_image !== '' && productInformation.url_image !== null) 
        ? productInformation.url_image 
        : 'src/assets/imageNotFound.png';
    informationTitle.innerText = productInformation.name;
    informationPrice.innerText = productWithDiscount;
    productInformation.discount !== 0 ? informationPriceDiscount.innerText = `$ ${(productInformation.price).toFixed(2)}` : informationPriceDiscount.innerText = '';
    productDetailModalContainer.style.right = '0';
    productDetail.style.right = '0';
    disableScroll()
}

export default renderProductDetail