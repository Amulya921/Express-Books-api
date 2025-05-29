console.log("Starting server...");

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); 

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

console.log("Books array initialized");


app.get('/', (req, res) => {
  res.send('Book API is running!');
});
console.log("GET /books route is set up");

// GET all books
app.get('/books', (req, res) => {
  console.log("GET /books route was called");
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;

  if (!newBook.title || !newBook.author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  newBook.id = books.length + 1; // Assign a new ID
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id - delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: 'Book deleted', book: deletedBook[0] });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
