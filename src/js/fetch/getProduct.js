import api_url from "../api_url.js";

const getProduct = async (id) => {
    try {
        const response = await fetch(`${api_url}/products/${id}`);
        const product = await response.json();

        return product;
    } catch (error) {
        console.log(error);
    }
}

export default getProduct