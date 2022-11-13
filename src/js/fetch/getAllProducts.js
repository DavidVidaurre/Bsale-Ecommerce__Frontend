import api_url from "../api_url.js";

const getAllProducts = async () => {
    const result = await fetch(`${api_url}/products`);
    const data = result.json();

    return data;
}

export default getAllProducts