import api_url from "../api_url.js";

const getProductsByDecreasingName = async () => {
    const result = await fetch(`${api_url}/products/name/decreasing`);
    const data = result.json();

    return data;
}

export default getProductsByDecreasingName