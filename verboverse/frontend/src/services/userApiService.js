const BASE_URL = 'http://localhost:9000/api';

const fetchTemplate = async (url, params = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, params); 
    return res.json();
}

export const signup = async (name, email, password) => {
    return await fetchTemplate('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
}

export const signin = async (email, password) => {
    return await fetchTemplate('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
}

export const logout = async () => {
    return await fetchTemplate('/logout', {
        method: 'GET'
    });
}

export const me = async () => {
    return await fetchTemplate('/me', {
        method: 'GET'
    });
}




