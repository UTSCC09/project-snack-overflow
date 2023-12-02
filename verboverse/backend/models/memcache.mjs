import Memcached from "memcached";

const memcachedClient = new Memcached('localhost:11211');

export default memcachedClient;