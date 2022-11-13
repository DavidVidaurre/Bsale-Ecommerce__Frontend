import api_url from "../api_url.js";

const getProductsWithDiscount = async () => {
    const result = await fetch(`${api_url}/products/discount`);
    const data = result.json();

    return data;
}

export default getProductsWithDiscount