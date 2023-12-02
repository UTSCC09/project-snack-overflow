import Memcached from "memcached";

// MEMCACHED
const memcached = new Memcached('localhost:11211');

const getFromCache = (req, res, next) => {

    // Attempt to retrieve data from the cache
    memcached.get('messages', (err, data) => {
        if (err) {
            console.error('Memcached error:', err);
            next(); // Continue to the route handler even if there's an error with Memcached
        } else if (data) {
            // If data is found in the cache, send it as the response
            res.send(data);
        } else {
            // If data is not in the cache, proceed to the route handler
            next();
        }
    });
}

const setToCache = (data) => {
    memcached.set('messages', data, 60, (err) => {
        if (err) {
            console.error('Memcached error:', err);
        }
    });
}

export { getFromCache, setToCache };



