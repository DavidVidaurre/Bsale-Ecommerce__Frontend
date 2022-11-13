import api_url from "../api_url.js";

const getProductSearched = async (name) => {
    const result = await fetch(`${api_url}/products/search/${name}`);
    const data = result.json();

    return data;
}

export default getProductSearched