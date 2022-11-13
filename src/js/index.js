// FETCHS
import getAllCategories from './fetch/getAllCategories.js';
import getAllProducts from './fetch/getAllProducts.js';
import getProductsByDecreasingName from './fetch/getProductsByDecreasingName.js';
import getProductsByIncreasingName from './fetch/getProductsByIncreasingName.js';
import getProductsByHigherPrice from './fetch/getProductsByHigherPrice.js';
import getProductsByLowerPrice from './fetch/getProductsByLowerPrice.js';
import getProductSearched from './fetch/getProductSearched.js';
import getProductsWithDiscount from './fetch/getProductsWithDiscount.js';
import getProductsBetweenPrices from './fetch/getProductsBetweenPrices.js';
import getProductsByCategory from './fetch/getProductsByCategory.js';

import renderAllProducts from './cardProducts/renderAllProducts.js';
import renderItemShoppingCart from './shoppingCart/renderItemShoppingCart.js';

let dataToRendered = await getAllProducts();

// EVENTOS PARA EL CARRITO DE COMPRAS
const buttonShoppingCartOpen = document.getElementById('buttonShoppingCartOpen');
const shoppingCartModalContainer = document.getElementById('shoppingCartModalContainer');
const shoppingCartModal = document.getElementById('shoppingCartModal');
const buttonShoppingCartClose = document.getElementById('buttonShoppingCartClose');
const buttonCartCount = document.getElementById('buttonCartCount');

// DESHABILITA EL SCROLL PARA EL LISTADO DE PRODUCTOS CUANDO SE ABRE EL MODAL DE CARRITO DE COMPRAS
function disableScroll(){  
    document.querySelector('body').style.overflowY = 'hidden';
}

// HABILITA EL SCROLL PARA EL LISTADO DE PRODUCTOS CUANDO SE CIERRA EL MODAL DE CARRITO DE COMPRAS
function enableScroll(){  
    document.querySelector('body').style.overflowY = 'auto';
}

// MODAL PARA CARRITO DE COMPRAS
buttonShoppingCartOpen.addEventListener('click', (e) => {
    e.preventDefault();
    disableScroll();
    shoppingCartModalContainer.style.right = '0';
    shoppingCartModal.style.right = '0';
    const shoppingCartStorage = JSON.parse(localStorage.getItem('productsInCart'));
    if(shoppingCartStorage){
        renderItemShoppingCart(shoppingCartStorage);
    }
})

buttonShoppingCartClose.addEventListener('click', (e) => {
    e.preventDefault();
    enableScroll();
    shoppingCartModalContainer.style.right = '-100%';
    shoppingCartModal.style.right = '-100%';
})

// SI EXISTE EL ITEM EN LOCALSTORAGE, AGREGA LA CANTIDAD AL CARRITO DE COMPRAS
if(JSON.parse(localStorage.getItem('productsInCart'))){
    buttonCartCount.innerText = (JSON.parse(localStorage.getItem('productsInCart'))).length;
}

// MODALS DE MENSAJES DE AGREGAR, REMOVER O COMPRAR
const modalProductAdded = document.getElementById('modalProductAdded');
const btnCloseModalProductAdded = document.getElementById('btnCloseModalProductAdded');
const modalProductRemoved = document.getElementById('modalProductRemoved');
const btnCloseModalProductRemoved = document.getElementById('btnCloseModalProductRemoved');
const modalSuccesfullPurchase = document.getElementById('modalSuccesfullPurchase');
const btnCloseModalSuccesfullPurchase = document.getElementById('btnCloseModalSuccesfullPurchase');

btnCloseModalProductAdded.addEventListener('click', (e) => {
    e.preventDefault();
    modalProductAdded.style.bottom = '-50px';
})

btnCloseModalProductRemoved.addEventListener('click', (e) => {
    e.preventDefault();
    modalProductRemoved.style.bottom = '-50px';
})

btnCloseModalSuccesfullPurchase.addEventListener('click', (e) => {
    e.preventDefault();
    modalSuccesfullPurchase.style.bottom = '-50px';
})

// MODAL DE LOS DETALLES DEL PRODUCTO
const productDetail = document.getElementById('productDetail');
const buttonProductDetailClose = document.getElementById('buttonProductDetailClose');
const productDetailModalContainer = document.getElementById('productDetailModalContainer');
buttonProductDetailClose.addEventListener('click', (e) => {
    e.preventDefault();
    productDetail.style.right = '-100%';
    productDetailModalContainer.style.right = '-100%';
    enableScroll()
})
const mainImg = document.getElementById('mainImg');
const smallImg = document.getElementsByClassName('small-img');

for(let i = 0; i < smallImg.length; i++){
    smallImg[i].addEventListener('click', () => {
        mainImg.src = smallImg[i].src;
    })
}

// FILTRAR DATOS PARA PAGINACIÓN
let numberPages = Math.ceil(dataToRendered.data.length / 12);
const numberPage = document.getElementById('numberPage');
const productCardsPaginationPrev = document.getElementById('productCardsPaginationPrev');
const productCardsPaginationNext = document.getElementById('productCardsPaginationNext');

let page = 1;
let currentItems = 0;
const nextPage = () => {
    if(page < numberPages){
        page++;
        currentItems += 12;
        numberPage.innerText = Number(numberPage.innerText) + 1;
        const dataFiltered = dataToRendered.data.slice(currentItems, currentItems+12);
        productCardsPaginationPrev.style.opacity = '1';
        productCardsPaginationPrev.style.cursor = 'pointer';
        if(page === numberPages){
            productCardsPaginationNext.style.opacity = '.5';
            productCardsPaginationNext.style.cursor = 'auto';
        };
        renderAllProducts(dataFiltered)
    }
}

const prevPage = () => {
    if(page > 1){
        page--;
        currentItems -= 12;
        numberPage.innerText = Number(numberPage.innerText) - 1;
        const dataFiltered = dataToRendered.data.slice(currentItems, currentItems+12);
        productCardsPaginationNext.style.opacity = '1';
        productCardsPaginationNext.style.cursor = 'pointer';
        if(page === 1){
            productCardsPaginationPrev.style.opacity = '.5';
            productCardsPaginationPrev.style.cursor = 'auto';
        };
        renderAllProducts(dataFiltered)
    }
}

productCardsPaginationNext.addEventListener('click', (e) => {
    e.preventDefault();
    nextPage();
});

productCardsPaginationPrev.addEventListener('click', (e) => {
    e.preventDefault();
    prevPage();
});

const resetDataPagination = () => {
    numberPage.innerText = '1';
    page = 1;
    currentItems = 0;
    numberPages = Math.ceil(dataToRendered.data.length / 12);
    productCardsPaginationPrev.style.opacity = '.5';
    productCardsPaginationPrev.style.cursor = 'auto';
    if(numberPages === 1){
        productCardsPaginationNext.style.opacity = '.5';
        productCardsPaginationNext.style.cursor = 'auto';
    } else{
        productCardsPaginationNext.style.opacity = '1';
        productCardsPaginationNext.style.cursor = 'pointer';
    }
}

// MODAL CUANDO NO SE HA ENCONTRADO EL PRODUCTO
const modalProductNotFount = document.getElementById('modalProductNotFount');
const btnCloseModalProductNotFount = document.getElementById('btnCloseModalProductNotFount');

btnCloseModalProductNotFount.addEventListener('click', (e) => {
    e.preventDefault();
    modalProductNotFount.style.bottom = '-50px';
})

// FUNCIÓN PARA BUSCAR PRODUCTOS
const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputSearch = document.getElementById('inputSearch');
    if(inputSearch.value !== ''){
        const productsSearched = await getProductSearched(inputSearch.value);
        dataToRendered = productsSearched;
        if(dataToRendered.ok){
            resetDataPagination();
            renderAllProducts(dataToRendered.data.slice(currentItems, currentItems+12));
        } else{
            modalProductNotFount.style.bottom = '10px';
            const intervalAnimationModal = setInterval(() => {
                modalProductNotFount.style.bottom = '-50px';
                clearInterval(intervalAnimationModal)
            }, 2000)
        }
    }
})

// PARA LOS FILTROS
const modalShowFilters = document.getElementById('modalShowFilters');
const filterCategory = document.getElementsByClassName('filterCategory');
const displayedCategories = document.getElementsByClassName('displayedCategories');
const filterAllProducts = document.getElementsByClassName('filterAllProducts');
const filterDiscount = document.getElementsByClassName('filterDiscount');
const filterNameIncreasing = document.getElementsByClassName('filterNameIncreasing');
const filterNameDecreasing = document.getElementsByClassName('filterNameDecreasing');
const filterHigherPrices = document.getElementsByClassName('filterHigherPrices');
const filterLowerPrices = document.getElementsByClassName('filterLowerPrices');
const filterBetweenPrices = document.getElementsByClassName('filterBetweenPrices');
const displayedFormPrices = document.getElementsByClassName('displayedFormPrices');
const inputMinValue = document.getElementsByClassName('inputMinValue');
const inputMaxValue = document.getElementsByClassName('inputMaxValue');
const btnFilterBetweenPrices = document.getElementsByClassName('btnFilterBetweenPrices');

const renderProductsFiltered = (productsFiltered, items) => {
    modalShowFilters.classList.remove('hidden-filters');
    resetDataPagination();
    renderAllProducts(productsFiltered.data.slice(items, items+12));
}

for(let i = 0; i < filterCategory.length; i++){
    filterCategory[i].addEventListener('click', (e) => {
        e.preventDefault();
        displayedCategories[i].classList.toggle('show-click');
    })
}

for(let i = 0; i < filterAllProducts.length; i++){
    filterAllProducts[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const dataAllProducts = await getAllProducts();
        dataToRendered = dataAllProducts;
        renderProductsFiltered(dataToRendered, currentItems);
    });
}

for(let i = 0; i < filterDiscount.length; i++){
    filterDiscount[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const dataWithDiscount = await getProductsWithDiscount();
        dataToRendered = dataWithDiscount;
        renderProductsFiltered(dataToRendered, currentItems);
    });
}

for(let i = 0; i < filterDiscount.length; i++){
    filterNameIncreasing[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const dataByNameIncreasing = await getProductsByIncreasingName();
        dataToRendered = dataByNameIncreasing;
        renderProductsFiltered(dataToRendered, currentItems);
    });
}
for(let i = 0; i < filterDiscount.length; i++){
    filterNameDecreasing[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const dataByNameDecreasing = await getProductsByDecreasingName();
        dataToRendered = dataByNameDecreasing;
        renderProductsFiltered(dataToRendered, currentItems);
    });
}

for(let i = 0; i < filterDiscount.length; i++){
    filterHigherPrices[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const dataByHigherPrice = await getProductsByHigherPrice();
        dataToRendered = dataByHigherPrice;
        renderProductsFiltered(dataToRendered, currentItems);
    });

}

for(let i = 0; i < filterDiscount.length; i++){
    filterLowerPrices[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const dataByLowerPrice = await getProductsByLowerPrice();
        dataToRendered = dataByLowerPrice;
        renderProductsFiltered(dataToRendered, currentItems);
    });

}

for(let i = 0; i < filterBetweenPrices.length; i++){
    filterBetweenPrices[i].addEventListener('click', (e) => {
        e.preventDefault();
        displayedFormPrices[i].classList.toggle('show-click');
    })
}

for(let i = 0; i < btnFilterBetweenPrices.length; i++){
    btnFilterBetweenPrices[i].addEventListener('click', async (e) => {
        e.preventDefault();
        if(inputMinValue[i].value !== '' && inputMaxValue[i].value !== ''){
            const productsBetweenPrices = await getProductsBetweenPrices(inputMinValue[i].value, inputMaxValue[i].value);
            dataToRendered = productsBetweenPrices;
            modalShowFilters.classList.remove('hidden-filters');
    
            if(dataToRendered.ok){
                resetDataPagination();
                renderAllProducts(dataToRendered.data.slice(currentItems, currentItems+12));
            } else{
                modalProductNotFount.style.bottom = '10px';
                const intervalAnimationModal = setInterval(() => {
                    modalProductNotFount.style.bottom = '-50px';
                    clearInterval(intervalAnimationModal)
                }, 2000)
            }
    
            inputMinValue[i].value = '';
            inputMaxValue[i].value = '';
        }
        // console.log(dataToRendered);
    })
}

// AL CARGAR LA PÁGINA RENDERIZA LOS PRODUCTOS
const loadPage = async() => {
    dataToRendered = await getAllProducts();
    resetDataPagination();
    renderAllProducts(dataToRendered.data.slice(currentItems, currentItems+12));
}
const headerLogo = document.getElementById('headerLogo');
headerLogo.addEventListener('click', async (e) => {
    e.preventDefault();
    modalShowFilters.classList.remove('hidden-filters');
    productCardsPaginationPrev.style.opacity = '.5';
    productCardsPaginationPrev.style.cursor = 'auto';
    productCardsPaginationNext.style.opacity = '1';
    productCardsPaginationNext.style.cursor = 'pointer';
    await loadPage()
})

// const modalShowFilters = document.getElementById('modalShowFilters');
const buttonFilter = document.getElementById('buttonFilter');
buttonFilter.addEventListener('click', (e) => {
    e.preventDefault();
    modalShowFilters.classList.toggle('hidden-filters')
})

// RENDERIZANDO CATEGORÍAS Y SUS EVENTOS
const categories = await getAllCategories();

categories.data.map((category) => {
    const p = document.createElement('p');
    p.className = `${category.name}-${category.id}`;
    p.innerText = category.name;

    const pDesktop = document.createElement('p');
    pDesktop.className = `${category.name}-${category.id}`;
    pDesktop.innerText = category.name;

    displayedCategories[0].appendChild(p);
    displayedCategories[1].appendChild(pDesktop);

    const categoryEvent = document.getElementsByClassName(`${category.name}-${category.id}`);

    for(let i = 0; i < categoryEvent.length; i++){
        categoryEvent[i].addEventListener('click', async () => {
            const productsByCategory = await getProductsByCategory(category.id);
            dataToRendered = productsByCategory;
            resetDataPagination();
            renderProductsFiltered(dataToRendered, currentItems);
        })
    }
})

//  DANDO ESTILOS A LA PAGINACIÓN CUANDO CARGA LA PÁGINA
productCardsPaginationPrev.style.opacity = '.5';
productCardsPaginationPrev.style.cursor = 'auto';

// RENDERIZANDO LOS PIRMEROS 12 PRODUCTOS (PARA PAGINACIÓN)
renderAllProducts(dataToRendered.data.slice(currentItems, currentItems+12));

