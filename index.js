const express = require('express');

const port = 8000;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const CrudTbl = require('./models/Crudtbl');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server Start on Port :-" + port);
})   