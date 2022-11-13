import api_url from "../api_url.js";

const getProductsBetweenPrices = async (lowerPrice, higherPrice) => {
    const result = await fetch(`${api_url}/products/price/between`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            lowerPrice,
            higherPrice 
        })
    });
    const data = result.json();

    return data;
}

export default getProductsBetweenPrices