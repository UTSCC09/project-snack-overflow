const BASE_URL = 'http://localhost:9000/api';

const fetchTemplateCall = async (url, params = {}) => {
    return fetch(`${BASE_URL}${url}`, params).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
}

export const createCall = async () => {
    const params = {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ }),
      };
    return fetchTemplateCall(`/createCall`, params);
}

export const getCall = async (id) => {
    return await fetchTemplateCall(`/getCall/${id}`, {
        method: 'GET'
    });
}

export const getCalls = async () => {
    return await fetchTemplateCall('/getCalls', {
        method: 'GET'
    });
}

export const addOfferCandidates = async (id, offerCandidates) => {
    return await fetchTemplateCall(`/addOfferCandidates/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({offerCandidates})
    });
}

export const addOffer = async (id, offer) => {
    return await fetchTemplateCall(`/addOffer/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({offer})
    });
}
