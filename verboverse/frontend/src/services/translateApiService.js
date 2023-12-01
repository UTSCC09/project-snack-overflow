const BASE_URL = process.env.BASE_URL; 

const fetchTemplate = async (url, params = {}) => {
    let res = await fetch(`${BASE_URL}${url}`, params);
    return res.json();
}

export const translate = async (text, target) => {
    return await fetchTemplate('/translate/translate', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text, target})
    });
}