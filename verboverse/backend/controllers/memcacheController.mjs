import memcachedClient from "../models/memcache.mjs";
import { ErrorResponse } from '../utils/errorResponse.mjs';

let keyCounter = 1;

export async function cacheData (req, res, next) {
    const key = `${keyCounter++}`;

    try {
        const value = req.body.value;
        memcachedClient.set(key, value, 0, function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err
                });
            } else {
            return res.status(201).json({
                success: true,
                key
            });
            }
       });

    } catch (error) {
        next(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getData (req, res, next) {
    const {key} = req.body.key;
    memcachedClient.get(key, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        } else {
            return res.status(200).json({
                success: true,
                data
            });
        }
    }); 
}



