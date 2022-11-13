import api_url from "../api_url.js";

const getProductsByLowerPrice = async () => {
    const result = await fetch(`${api_url}/products/price/lower`);
    const data = result.json();

    return data;
}

export default getProductsByLowerPrice