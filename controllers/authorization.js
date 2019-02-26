const redisClient = require('./signin').redisClient;

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('YOU SHALL NOT PASS')
    }
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply ) {
            console.log(err);
            return res.status(401).json('YOU SHALL NOT PASS!!!!!')
        }
        console.log('you shall pass');
        return next();
    })
}

module.exports = {
    requireAuth: requireAuth
}