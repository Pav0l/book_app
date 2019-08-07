const router = require('express').Router();
const { updateBookAuthorRel, delRels } = require('../../util/helpers');
const Books = require('../../models/books');

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
 * Params: valid book id
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

/**
 * [POST] /api/books
 * req.body => {
	"title": "New book2",
	"description": "Hi",
	"authors": ["author3", "author4"]
    }
 * Returns detailed book object
 */
router.post('/', async (req, res) => {
  const { title, description, authors } = req.body;
  try {
    if (!title || !description || !authors) {
      res.status(400).json({ message: 'Missing body parameters' });
    }

    const [newBook] = await Books.add({ title, description });

    updateBookAuthorRel(authors, newBook);

    res.status(201).json({ book_id: newBook });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/**
 * [DELETE] /api/books/:id
 * Params: valid book id
 * Returns OK message on success
 */
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

/**
 * [PUT] /api/books/:id
 * Params: valid book id
 * req.body => {
	"title": "New book2",
	"description": "Hi",
	"authors": ["author3", "author4"]
    }
 * Returns ok message on success
 */
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

    await delRels(book.id);
    await updateBookAuthorRel(authors, book.id);
    await Books.update(id, { title, description });
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
