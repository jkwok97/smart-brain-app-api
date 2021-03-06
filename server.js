const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');
const knex = require('knex')({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

// knex.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send(knex.users);
});

app.post('/signin', signin.signInAuthentication(knex, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)});

app.get('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileGet(req, res, knex)});
app.post('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileUpdate(req, res, knex)});

app.put('/image', auth.requireAuth, (req, res) => {image.handleImage(req, res, knex)});

app.post('/imageurl', auth.requireAuth, (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
