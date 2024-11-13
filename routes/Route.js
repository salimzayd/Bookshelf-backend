import express from 'express';
import Book from '../models/Bookschema.js';

const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        if (books) {
            return res.status(200).json({
                status: "success",
                message: "successfully fetched books",
                data: books
            });
        }
        return res.status(404).json({
            status: "error",
            message: "books not found"
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch books"
        });
    }
});

router.post('/books', async (req, res) => {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
        return res.status(400).json({
            status: "error",
            message: "all fields are required"
        });
    }

    try {
        const newBook = new Book({ title, author, description });
        await newBook.save();
        res.status(201).json({
            status: "success",
            message: "new book created successfully",
            data: newBook
        });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to add book"
        });
    }
});

router.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "no book found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "book deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete book"
        });
    }
});

export default router;
