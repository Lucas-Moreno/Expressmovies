const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const jwt = require('jsonwebtoken'); 
const expressJwt = require('express-jwt');

const PORT = process.env.PORT || 3000;
let frenchMovies = [];

app.use('/public' , express.static('public'))

const secret = 'ijegizoEDEDgnoiaoioàçSfenkznefZoanfdazedazkPËDZSd';

app.use(expressJwt({ secret : secret }).unless({ path : ['/login']}));

app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/movies', function(req, res){

    const title = "Films français des 30 dernières années"; 

    frenchMovies = [
        { title: 'Le fabuleux destin d\'Amelie Poulain', years: 2001 },
        { title: 'buffet froid', years: 1979 },
        { title: 'Le diner des cons', years: 1998 },
        { title: 'Des rouilles et d\'os', years: 2012 }
    ];

    res.render('movies', { movies: frenchMovies, title: title});
})
var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.post('/movies', urlencodedParser, function(req, res){
    const newMovie = { title: req.body.movietitle, year: req.body.movieyear };
    frenchMovies = [...frenchMovies, newMovie];
    res.sendStatus(201);
})

app.get('/movies/add', function(req, res){
    res.send('prochainement, un formulaire d\'ajout içi');
})

app.get('/movies/:id', function(req, res){
    const id= req.params.id;
    res.render('movie-details', { movieid : id});
})

app.get('/', function(req, res){
    res.render('index');
})

app.get('/movie-search', function(req,res){
    res.render('movie-search');
})
app.get('/login', function(req, res){
    res.render('login', {title : 'Espace Membre'});
})

const fakeUser = { email: 'testuser@testmail.fr', password: 'qsd'};


app.post('/login', urlencodedParser, function(req, res){
    if(fakeUser.email === req.body.email && fakeUser.password === req.body.password){
        const myToken = jwt.sign({iss: 'expressmovies.fr', user:'Sam', role:'moderator'}, secret);
        res.json(myToken);
    }else{
        res.sendStatus(401);
    }
})

app.listen(PORT, function(){
    console.log(`Listen on port ${PORT}`);
})