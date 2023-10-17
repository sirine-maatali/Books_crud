const router = require('express').Router();
const book = require('../model/book_model');

// Endpoint pour obtenir tous les livres
router.get('/books', (req, res) => {
  book.find()
    .then((bookList) => {
      res.status(200).json(bookList);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Endpoint pour obtenir un livre par son ID
router.get('/books/:id', (req, res) => {
  book.findOne({ _id: req.params.id })
    .then((bookItem) => {
      if (!bookItem) {
        res.status(404).json({ message: "Livre non trouvé" });
      } else {
        res.status(200).json(bookItem);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Endpoint pour créer un nouveau livre
router.post('/books', (req, res) => {
  const newBook = new book(req.body);
  newBook.save()
    .then((savedBook) => {
      res.status(201).json({
        model: savedBook,
        message: "Livre créé avec succès",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Données invalides",
      });
    });
});

// Endpoint pour mettre à jour un livre
router.patch('/books/:id', (req, res) => {
  book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        res.status(404).json({ message: "Livre non trouvé" });
      } else {
        res.status(200).json({
          model: updatedBook,
          message: "Livre mis à jour",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Données de livre incorrectes",
      });
    });
});

// Endpoint pour supprimer un livre
router.delete('/books/:id', (req, res) => {
  book.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "ID de livre incorrect" });
      } else {
        res.status(200).json({ message: "Livre supprimé" });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "ID de livre incorrect",
      });
    });
});

module.exports = router;
