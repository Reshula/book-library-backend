const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Purchase = require('../models/Purchase'); 

// List of books
router.get('/', async (req, res) => {
  
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching books' });
    }
});

// Adding books
router.post('/', async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const newBook = new Book({ title, author, description });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(400).json({ error: 'Error adding book' });
    }
});

// Deleting books
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ error: 'Error deleting book' });
    }
});

// Updating books
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description, price } = req.body;

        console.log('Getting file:', { title, author, description, price });

        
        if (!title || !author || !description) {
            return res.status(400).json({ error: 'Missing data to update book' });
        }

        // Esli peredayetsa cena proverayem
        if (price !== undefined && (typeof price !== 'number' || price < 0)) {
            return res.status(400).json({ error: 'Invalid price. It must be a positive number.' });
        }

        // Sozdayem obyekt
        const updateData = { title, author, description };
        if (price !== undefined) {
            updateData.price = price; //Adding price
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Error updating book' });
    }
});
// Searching books
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
            ],
        });

        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ error: 'Error searching books' });
    }
});
// Getting book
router.get('/:id', async (req, res) => {
    console.log('Getting request for book ID:', req.params.id);
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }

        res.status(200).json(book);
    } catch (err) {
        console.error('Error fetching book by ID:', err);
        res.status(500).json({ error: 'Ошибка при получении книги' });
    }
});

// Buying books
router.post('/buy/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID book
        const { userId } = req.body; // ID user, send to request


        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Purchase list
        const purchase = new Purchase({
            userId,
            bookId: book._id,
        });
        await purchase.save();

        res.status(200).json({ message: 'the book was successfully purchased', purchase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Purchasing error', error });
    }
});


module.exports = router;

