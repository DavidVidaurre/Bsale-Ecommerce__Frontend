import api_url from "../api_url.js";

const getProductsByIncreasingName = async () => {
    const result = await fetch(`${api_url}/products/name/increasing`);
    const data = result.json();

    return data;
}

export default getProductsByIncreasingName