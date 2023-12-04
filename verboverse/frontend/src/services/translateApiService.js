const BASE_URL = 'https://verboverse.tech/api'; 

const fetchTemplate = async (url, params = {}) => {
    let res = await fetch(`${BASE_URL}${url}`, params);
    return res.json();
}

export const translate = async (token, text, target) => {
    return await fetchTemplate('/translate/translate', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({text, target})
    });
}