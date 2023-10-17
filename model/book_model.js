
const mongoose = require('mongoose');
const db = require('../config/db');

const bookSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    AnneePub: { type: Date, required: true },
    description: { type: String, required: true },
    nbPages: { type: Number, required: false },
    lang: { type: String, required: true },
    disponible: { type: Boolean, required: true },
    genres: [{ type: String, required: false }]
});

const book = db.model('book',bookSchema);

module.exports = book;
