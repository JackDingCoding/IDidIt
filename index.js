const DIR_PATH = __dirname;
const MONGODB_URI = 'mongodb://127.0.0.1/IdidIt'

const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(DIR_PATH, 'public')));
app.use(session({
    secret: 'my secrete',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(mainRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(errorController.get404);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
