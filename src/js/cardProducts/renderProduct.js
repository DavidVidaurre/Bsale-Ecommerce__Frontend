import renderCard from "./renderCard.js";
import getProduct from "../fetch/getProduct.js";

const renderProduct = async (id) => {
    const product = await getProduct(id);

    renderCard(product.data[0])
}

export default renderProduct