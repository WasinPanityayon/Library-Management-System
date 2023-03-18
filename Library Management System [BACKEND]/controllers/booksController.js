const Book = require('../models/Book')

const getAllBooks = async (req, res) => {
    const books = await Book.find().lean()

    if (!books?.length) {
        return res.status(400).json({ message: 'No books found' })
    }

    res.json(books)
}

const createNewBook = async (req, res) => {
    const { imagebook, title, author, isbn } = req.body
    if (!title) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const book = await Book.create({ imagebook, title, author, isbn })

    if (book) {
        return res.status(201).json({ message: 'New book created' })
    } 
    else {
        return res.status(400).json({ message: 'Invalid book data received' })
    }

}

const updateBook = async (req, res) => {
    const { imagebook, id, title, author, isbn } = req.body

    if (!id || !title) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }

    book.title = title

    if (imagebook) {
        book.imagebook = imagebook
    }

    if (author) {
        book.author = author
    }

    if (isbn) {
        book.isbn = isbn
    }

    const updatedBook = await book.save()

    res.json(`Book No. ${updatedBook.ticket} '${updatedBook.title}' updated`)
}

const deleteBook = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Book ID required' })
    }

    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }

    const result = await book.deleteOne()

    const reply = `Book '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}


module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook
}