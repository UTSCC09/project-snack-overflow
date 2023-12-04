const BASE_URL = 'https://verboverse.tech/api';

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
    const response = await fetchTemplate('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
        body: JSON.stringify({email, password})
    });

    if (response.success) {
        return {
            success: true,
            token: response.token
        }
    } else {
        return {
            success: false
        }
    }
}

export const logout = async (token) => {
    return await fetchTemplate('/logout', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });
}

export const me = async (token) => {
    return await fetchTemplate('/me', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });
}

export const updateLanguage = async (token, _id, language) => {
    return await fetchTemplate('/updateme', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({_id, language})
    });
}

export const updateName = async (_id, name) => {
    return await fetchTemplate('/updateme', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id, name})
    });
}

export const updateEmail = async (_id, email) => {
    return await fetchTemplate('/updateme', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id, email})
    });
}



