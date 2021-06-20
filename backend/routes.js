const express = require("express");
const { receiveMessageOnPort } = require("worker_threads");
const routes = express.Router();
const db = require("./database");

routes.use(express.json());

//create a new user
routes.post("/users", async (req, res) => {
  try {
    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE email = $(email)`,
      {
        email: req.user.email,
      }
    );

    if (user) {
      // return res.status(400).send("user already exsists");
      return res.status(200).send();
    }
    const result = await db.oneOrNone(
      `INSERT INTO users (email) VALUES ( $(email)) RETURNING  id`,
      {
        email: req.user.email,
      }
    );
    const newUser = await db.one(
      `SELECT id, email FROM users WHERE id = $(id)`,
      { id: result.id }
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    if (error.constraint === "unique_email") {
      return res.status(400).send("That email address is already registered.");
    }
    return res.status(500).send("things are broken");
  }
});

routes.get("/books", async (req, res) => {
  res.json(await db.many("SELECT * from books"));
});

//getting all the users shevles
routes.get("/shelves", async (req, res) => {
  res.json(
    await db.manyOrNone(
      `SELECT shelf from shelves s
        INNER JOIN users u ON u.id = s.user_id
        WHERE email = $(email)`,
      {
        email: req.user.email,
      }
    )
  );
});

//getting all the books on a particluar shelf
routes.get("/shelves/:shelf", async (req, res) => {
  console.log(req.params.shelf, req.user.email);
  res.json(
    await db.manyOrNone(
      `SELECT title, author, genre, subject, setting, time_period, language, isbn 
      FROM shelves_books sb
        INNER JOIN shelves s ON s.id = sb.shelf_id
        INNER JOIN users u ON u.id = s.user_id
        INNER JOIN books b ON b.id = sb.book_id
        WHERE shelf = $(shelf) AND email = $(email)`,
      {
        shelf: req.params.shelf,
        email: req.user.email,
      }
    )
  );
});

//adding a book to a particular shelf
routes.post("/shelves/:shelf/books", async (req, res) => {
  try {
    let book = await db.oneOrNone(`SELECT id FROM books WHERE isbn = $(isbn)`, {
      isbn: req.body.isbn,
    });
    console.log(book);

    if (!book) {
      book = await db.one(
        `
          INSERT INTO books (title, author, genre, subject, setting, time_period, language, isbn, progress) 
          VALUES ($(title), $(author), $(genre), $(subject), $(setting), $(time_period), $(language), $(isbn), $(progress))
          RETURNING id, title, author, genre, subject, setting, time_period, language, isbn, progress`,
        {
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          subject: req.body.subject,
          setting: req.body.setting,
          time_period: req.body.time_period,
          language: req.body.language,
          isbn: req.body.isbn,
          progress: req.body.progress,
        }
      );
    }

    const shelf = await db.one(
      `SELECT s.id FROM shelves s INNER JOIN users u ON u.id = s.user_id
      WHERE email = $(email) AND shelf = $(shelf)`,
      {
        email: req.user.email,
        shelf: req.params.shelf,
      }
    );
    console.log(shelf);

    if (!shelf) {
      shelf = await db.one(
        `INSERT INTO shelves (user_id, shelf)
        VALUES ($(user_id), $(shelf))
        RETURNING id, user_id, shelf
        `,
        {
          user_id: req.user.id,
          shelf: req.params.shelf,
        }
      );
    }

    await db.oneOrNone(
      `INSERT INTO shelves_books (shelf_id, book_id) VALUES ($(shelf_id), $(book_id))`,
      {
        shelf_id: shelf.id,
        book_id: book.id,
      }
    );

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);

    if (error.constraint === "books_isbn_key") {
      return res.status(400).send("That book already exists on that shelf. ");
    }
    return res.status(500).send("We are broken!");
  }
});

// STOP HERE NEED TO FIX BELOW THIS LINE

//removing a book from a shelf
routes.delete("/books/:shelf/:book_id", async (req, res) => {
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  await db.none(
    `DELETE from shelves WHERE book_id = $(book_id) AND shelf = $(shelf) AND user_id = $(user_id)`,
    {
      book_id: +req.params.book_id,
      user_id: user.id,
      shelf: req.params.shelf,
    }
  );

  res.status(204).send();
});

routes.delete("/shelves/:shelf/", async (req, res) => {
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  await db.none(
    `DELETE from shelves WHERE shelf = $(shelf) AND user_id = $(user_id)`,
    {
      shelf: req.params.shelf,
      user_id: user.id,
    }
  );

  res.status(204).send();
});

routes.get("/notes/", async (req, res) => {
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  res.json(
    await db.manyOrNone(`SELECT * from notes WHERE user_id = $(user_id)`, {
      user_id: user.id,
    })
  );
});

routes.post("/notes/:book_id", async (req, res) => {
  try {
    const user = await db.one(
      `SELECT id FROM users WHERE email = $(email) RETURNING id`,
      { email: req.user.email }
    );
    await db.none(
      `
        INSERT INTO notes (book_id, user_id, notes) VALUES ($(book_id), $(user_id), $(notes))`,
      {
        book_id: +req.params.book_id,
        user_id: user.id,
        notes: req.body.notes,
      }
    );

    const newNote = await db.one(
      `SELECT * FROM notes WHERE user_id = $(user_id) AND book_id = $(book_id)`,
      {
        user_id: +req.params.user_id,
        book_id: +req.params.book_id,
      }
    );

    return res.status(201).json(newNote);
  } catch (error) {
    if (error.constraint === "notes_pkey") {
      return res.status(400).send("That note already exists.");
    }
  }
});

routes.put("/notes/:book_id", async (req, res) => {
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  await db.oneOrNone(
    `UPDATE notes SET notes = $(notes) WHERE user_id = $(user_id) and book_id = $(book_id)`,
    {
      notes: req.body.notes,
      user_id: user.id,
      book_id: +req.params.book_id,
    }
  );

  const updatedNote = await db.one(
    `SELECT * from notes
    INNER JOIN books b ON b.id = notes.book_id
    INNER JOIN users u ON u.id = notes.book_id
    WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      user_id: user.id,
      book_id: +req.params.book_id,
    }
  );

  res.status(201).json(updatedNote);
});

routes.delete("/notes/:book_id", async (req, res) => {
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  await db.none(
    `DELETE from notes WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      book_id: +req.params.book_id,
      user_id: user.id,
    }
  );

  res.status(204).send();
});

routes.get("/notes/:book_id", async (req, res) => {
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  res.json(
    await db.oneOrNone(
      `SELECT * from notes WHERE user_id = $(user_id) and book_id = $(book_id)`,
      {
        user_id: user.id,
        book_id: +req.params.book_id,
      }
    )
  );
});

routes.get("/reviews/:isbn", async (req, res) => {
  const book = await db.oneOrNone(`SELECT id FROM books WHERE isbn = $(isbn)`, {
    isbn: req.params.isbn,
  });

  if (book) {
    const results = await db.manyOrNone(
      `SELECT * from reviews  WHERE book_id = $(book_id)`,
      {
        book_id: book.id,
      }
    );
    if (!results) {
      results = [];
    }
    res.status(204).json(results);
  } else {
    console.log("No reviews");
    res.status(204).json([]);
  }
});

routes.get("/reviews/user/:isbn", async (req, res) => {
  const book = await db.one(
    `SELECT id FROM books WHERE isbn = $(isbn) RETURNING id`,
    { isbn: req.params.isbn }
  );
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  res.json(
    await db.manyOrNone(
      `SELECT * from reviews WHERE book_id = $(book_id) and user_id = $(user_id)`,
      {
        book_id: book.id,
        user_id: user.id,
      }
    )
  );
});

routes.post("/reviews/:isbn", async (req, res) => {
  try {
    const book = await db.one(
      `SELECT id FROM books WHERE isbn = $(isbn) RETURNING id`,
      { isbn: req.params.isbn }
    );
    const user = await db.one(
      `SELECT id FROM users WHERE email = $(email) RETURNING id`,
      { email: req.user.email }
    );
    await db.none(
      `
        INSERT INTO reviews (book_id, user_id, rating, review, plot, character, world, pacing, organization, informative, writing, readability,
            worth, editing, accuracy) VALUES ($(book_id), $(user_id), $(rating), $(review), $(plot), $(character), $(world), $(pacing), $(organization),
            $(informative), $(writing), $(readability), $(worth), $(editing), $(accuracy))`,
      {
        book_id: book.id,
        user_id: user.id,
        rating: req.body.rating,
        review: req.body.review,
        plot: req.body.plot,
        character: req.body.character,
        world: req.body.world,
        pacing: req.body.pacing,
        organization: req.body.organization,
        informative: req.body.informative,
        writing: req.body.writing,
        readability: req.body.readability,
        worth: req.body.worth,
        editing: req.body.editing,
        accuracy: req.body.accuracy,
      }
    );

    const newReview = await db.one(
      `SELECT * FROM reviews WHERE user_id = $(user_id) AND book_id = $(book_id)`,
      {
        user_id: +req.params.user_id,
        book_id: +req.params.book_id,
      }
    );

    return res.status(201).json(newReview);
  } catch (error) {
    if (error.constraint === "reviews_pkey") {
      return res.status(400).send("You've already reviewed this book.");
    }
  }
});

routes.put("/reviews/:book_id", async (req, res) => {
  const book = await db.one(
    `SELECT id FROM books WHERE isbn = $(isbn) RETURNING id`,
    { isbn: req.params.isbn }
  );
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  await db.oneOrNone(
    `UPDATE reviews SET rating = $(rating), review = $(review), plot = $(plot), character = $(character), world = $(world), 
    pacing = $(pacing), organization = $(organization), informative = $(informative), writing = $(writing), 
    readability = $(readability), worth = $(worth), editing = $(editing), accuracy = $(accuracy) 
    WHERE user_id = $(user_id) and book_id = $(book_id)`,
    {
      book_id: book.id,
      user_id: user.id,
      rating: req.body.rating,
      review: req.body.review,
      plot: req.body.plot,
      character: req.body.character,
      world: req.body.world,
      pacing: req.body.pacing,
      organization: req.body.organization,
      informative: req.body.informative,
      writing: req.body.writing,
      readability: req.body.readability,
      worth: req.body.worth,
      editing: req.body.editing,
      accuracy: req.body.accuracy,
    }
  );

  const updatedReview = await db.one(
    `SELECT * from reviews
    INNER JOIN books b ON b.id = reviews.book_id
    INNER JOIN users u ON u.id = reviews.book_id
    WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      user_id: +req.params.user_id,
      book_id: +req.params.book_id,
    }
  );

  res.status(201).json(updatedReview);
});

routes.delete("/reviews/:user_id/:book_id", async (req, res) => {
  const book = await db.one(
    `SELECT id FROM books WHERE isbn = $(isbn) RETURNING id`,
    { isbn: req.params.isbn }
  );
  const user = await db.one(
    `SELECT id FROM users WHERE email = $(email) RETURNING id`,
    { email: req.user.email }
  );
  await db.none(
    `DELETE from reviews WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      book_id: book.id,
      user_id: user.id,
    }
  );

  res.status(204).send();
});

module.exports = routes;
