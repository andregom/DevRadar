const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://Andre:4ndr34ndr3@cluster0-k87cc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333); 