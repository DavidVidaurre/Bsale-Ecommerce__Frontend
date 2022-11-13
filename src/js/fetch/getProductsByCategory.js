import api_url from "../api_url.js";

const getProductsByCategory = async (id) => {
    const result = await fetch(`${api_url}/categories/products/${id}`);
    const data = result.json();

    return data;
}

export default getProductsByCategory