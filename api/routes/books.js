const router = require('express').Router();
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
    console.error({ error: err });
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
    console.error({ error: err });
  }
});

module.exports = router;
