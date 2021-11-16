const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 10 });

module.exports = duartion => (req, res, next) => {

    //check if request is valid
    if (req.method !== 'GET') {
        console.error('Cannot cache non GET methods');
        return next();
    }
    //check if key exists
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        console.log(`Cache hit for key ${key}`);
        res.send(cachedResponse);
    } else {
        console.log(`Cache miss for ${key}`);
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body)
            cache.set(key, body, duartion)
        };
        next();
    }

};

module.exports.stats = async (req, res) => {
    res.send(cache.getStats());

}