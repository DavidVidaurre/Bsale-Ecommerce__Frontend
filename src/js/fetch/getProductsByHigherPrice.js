import api_url from "../api_url.js";

const getProductsByHigherPrice = async () => {
    const result = await fetch(`${api_url}/products/price/higher`);
    const data = result.json();

    return data;
}

export default getProductsByHigherPrice