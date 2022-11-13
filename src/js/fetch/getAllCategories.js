import api_url from "../api_url.js";

const getAllCategories = async () => {
    const result = await fetch(`${api_url}/categories`);
    const data = result.json();

    return data;
}

export default getAllCategories