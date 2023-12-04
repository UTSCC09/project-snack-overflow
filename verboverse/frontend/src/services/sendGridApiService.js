const BASE_URL = 'https://verboverse.tech/api'; 

const fetchTemplate = async (url, params = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, params); 
    return res.json();
}

export const sendEmail = async (token, to, code) => {
    return await fetchTemplate('/sendEmail', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({to, code})
    });
}
