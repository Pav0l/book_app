const router = require('express').Router();
const Books = require('../../models/books');
const Authors = require('../../models/authors');
const BA = require('../../models/book-authors');

/**
 * [GET] /api/books
 * Query string: detailed=yes => returns detailed array
 * Else => returns simple books array without authors
 */
router.get('/', async (req, res) => {
  try {
    const { detailed } = req.query;

    if (detailed == 'yes') {
      const [book] = await Books.getDetailed();
      res.status(200).json(book);
    } else {
      const books = await Books.get();
      res.status(200).json(books);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/**
 * [GET] /api/books/:id
 * Returns detailed book object
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.getById(id);

    if (!book) {
      return res
        .status(404)
        .json({ message: 'Book with this ID does not exist' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/', async (req, res) => {
  const { title, description, authors } = req.body;
  try {
    if (!title || !description || !authors) {
      res.status(400).json({ message: 'Missing body parameters' });
    }

    const [newBook] = await Books.add({ title, description });

    for (let author of authors) {
      const [authorExist] = await Authors.filter({ name: author });
      var author_id;
      if (!authorExist) {
        //   create new author
        [author_id] = await Authors.add({ name: author });
      } else {
        author_id = authorExist.id;
      }

      await BA.add({ book_id: newBook, author_id });
    }
    res.status(201).json({ book_id: newBook });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.delete(id);

    if (!book) {
      return res
        .status(404)
        .json({ message: 'Book with this ID does not exist' });
    } else {
      res.status(200).json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, authors } = req.body;

    if (!title || !description || !authors) {
      res.status(400).json({ message: 'Missing body parameters' });
    }

    const book = await Books.getById(id);

    if (!book) {
      return res
        .status(404)
        .json({ message: 'Book with this ID does not exist' });
    }

    for (let author of authors) {
      const [authorExist] = await Authors.filter({ name: author });
      var author_id;
      if (!authorExist) {
        //   create new author
        [author_id] = await Authors.add({ name: author });
      } else {
        author_id = authorExist.id;
      }

      await BA.add({ book_id: book.id, author_id });
    }

    const updatedBook = await Books.update(id, { title, description });
    res.status(200).json(updatedBook);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
