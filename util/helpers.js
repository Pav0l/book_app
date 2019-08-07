const Authors = require('../models/authors');
const Rel = require('../models/book-authors');

module.exports = {
  updateBookAuthorRel: async (authors, book_id) => {
    for (let author of authors) {
      const [authorExist] = await Authors.filter({ name: author });
      var author_id;
      if (!authorExist) {
        //   create new author
        [author_id] = await Authors.add({ name: author });
      } else {
        author_id = authorExist.id;
      }

      await Rel.add({ book_id, author_id });
    }
  },
  delRels: async book_id => {
    const relationships = await Rel.filter({ book_id });

    for (let i = 0; i < relationships.length; i++) {
      await Rel.delete(relationships[i].id);
    }
  }
};
