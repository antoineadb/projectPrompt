import express from 'express';
import path from 'path';
import fs from 'fs';
import session from 'express-session';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const __dirname = dirname(fileURLToPath(import.meta.url));

const usersPath = path.join(__dirname, 'users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const articlesPath = path.join(__dirname, 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));


app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'moncodesecretici',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/home', (req, res) => {
    res.render('home');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});



export default app;