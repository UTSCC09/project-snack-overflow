const BASE_URL = 'http://localhost:9000/api';

const fetchTemplate = async (url, params = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, params); 
    return res.json();
}

export const sendEmail = async (to, code) => {
    return await fetchTemplate('/sendEmail', {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({to, code})
    });
}
