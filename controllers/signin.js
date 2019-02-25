const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (req, res, knex, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    return knex.select('email', 'hash').from('login')
    .where('email', '=', email )
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if (isValid) {
            return knex.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => user[0])
                        .catch(err => Promise.reject('unable to get user'))
        } else {
            Promise.reject('wrong credentials')
        }  
    })
    .catch(err => Promise.reject('unable to signin'))
}

const getAuthTokenId = () => {
    console.log('auth ok');
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, "JWT-Token", { expiresIn: '2 days'});
}

const createSessions = (user) => {
    const { email, id } = user;
    const token = signToken(email);
    return { success: 'true', userId: id, token}
}

const signInAuthentication = (req, res, knex, bcrypt) => {
    const { authorization } = req.headers;
        return authorization ? getAuthTokenId() : 
            handleSignin(req, res, knex, bcrypt)
                .then(data => {
                    return data.id && data.email ? createSessions(data) : Promise.reject(data)
                })
                .then(session => res.json(session))
                .catch(err => res.status(400).json(err));
}

module.exports = {
    signInAuthentication: signInAuthentication
};