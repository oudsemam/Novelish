const express = require("express");
const routes = express.Router();
const pgp = require("pg-promise")();

routes.use(express.json());

//create a new user
routes.post("/users", async (req, res) => {
  try {
    const result = await db.oneOrNone(
      `INSERT INTO users (email) VALUES ( $(email))`,
      {
        email: req.body.email,
      }
    );
    const user = await db.one(
      `SELECT id, email FROM users WHERE id = $(id), {id: result.id}`,
      {
        email: req.body.email,
      }
    );
    const newUser = await db.one(
      `SELECT id, email FROM users WHERE id = $(id)`,
      { id: result.id }
    );
    res.status(201).json(newUser);
  } catch (error) {
    // if (error.constraint === 'users_pkey'){
    //     return res.status(400).send('The state already exists');
    // }
    console.log(error);
    if (error.constraint === "unique_email") {
      return res.status(400).send("That email address is already registered.");
    }
  }
});

routes.get("/users/:email", async (req, res) => {
  try {
    const user = await db.oneOrNone(
      `SELECT user_id FROM users WHERE email = $(email)`,
      {
        email: req.params.email,
      }
    );
    if (!user) {
      return res.status(404).send("User email does not exist.");
    }
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// update a user record with the firebase UID when person signs up
routes.put("/users/:email", async (req, res) => {
  try {
    const user = await db.oneOrNone(
      `SELECT email FROM users WHERE email = $(email)`,
      {
        email: req.params.email,
      }
    );
    if (!user) {
      return res.status(404).send("User email does not exist.");
    }
    await db.oneOrNone(
      `UPDATE users SET firebase_uid = $(firebase_uid) WHERE email = $(email)`,
      {
        email: req.params.email,
        firebase_uid: req.body.firebase_uid,
      }
    );
    const updatedUser = await db.one(
      `SELECT email, firebase_uid FROM users WHERE email = $(email)`,
      {
        email: req.params.email,
      }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//end of new

const db = pgp({
  database: "Novelish",
  user: "postgres",
});

routes.get("/users", async (req, res) => {
  console.log(req.user);
  res.json(await db.many("SELECT * from users"));
});

routes.get("/books", async (req, res) => {
  res.json(await db.many("SELECT * from books"));
});

routes.get("/shelves", async (req, res) => {
  res.json(await db.many("SELECT * from shelves"));
});

routes.get("/shelves/user", async (req, res) => {
  res.json(
    await db.manyOrNone(
      `SELECT DISTINCT shelf from shelves s
        INNER JOIN users u ON u.id = s.user_id
        INNER JOIN books b ON b.id = s.book_id
        WHERE email = $(email)`,
      {
        email: req.user.email,
      }
    )
  );
});

routes.get("/shelves/user/:shelf/", async (req, res) => {
  res.json(
    await db.manyOrNone(
      `SELECT title, author, genre, rating, subject, setting, time_period, language, isbn from shelves s
        INNER JOIN users u ON u.id = s.user_id
        INNER JOIN books b ON b.id = s.book_id
        WHERE shelf = $(shelf) AND email = $(email)`,
      {
        shelf: req.params.shelf,
        email: req.user.email,
      }
    )
  );
});

routes.post("/books/:user_id/:shelf", async (req, res) => {
  try {
    const result = await db.one(
      `
        INSERT INTO books (title, author, genre, subject, setting, time_period, language, isbn, progress) 
        VALUES ($(title), $(author), $(genre), $(subject), $(setting), $(time_period), $(language), $(isbn), $(progress))
        RETURNING id`,
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

    await db.oneOrNone(
      `INSERT INTO shelves (book_id, user_id, shelf) VALUES ($(book_id), $(user_id), $(shelf))`,
      {
        shelf: req.params.shelf,
        user_id: +req.params.user_id,
        book_id: result.id,
      }
    );

    const book = await db.oneOrNone(
      `SELECT shelf, user_id, title, author, genre, subject, setting, time_period, language, isbn, progress from shelves
        INNER JOIN users u ON u.id = shelves.user_id
        INNER JOIN books b ON b.id = shelves.book_id
        WHERE b.id = $(book_id) AND u.id = $(user_id)`,
      {
        book_id: result.id,
        user_id: +req.params.user_id,
      }
    );

    return res.status(201).json(book);
  } catch (error) {
    if (error.constraint === "shelves_user_id_fkey") {
      return res.status(400).send("Please log in to continue.");
    }

    if (error.constraint === "books_isbn_key") {
      return res.status(400).send("That book already exists on that shelf. ");
    }
  }
});

routes.post("/shelves/:user_id", async (req, res) => {
  try {
    const result = await db.oneOrNone(
      `
        INSERT INTO shelves (shelf, user_id) VALUES ($(shelf), $(user_id))`,
      {
        user_id: req.params.user_id,
        shelf: req.body.shelf,
      }
    );

    console.log("got here");

    const newShelf = await db.manyOrNone(
      `SELECT DISTINCT shelf FROM shelves WHERE user_id = $(user_id)`,
      {
        user_id: req.params.user_id,
      }
    );

    console.log(newShelf);

    return res.status(201).json(newShelf);
  } catch (error) {
    if (error.constraint === "shelves_user_id_fkey") {
      return res.status(400).send("Please log in to continue.");
    }
  }
});

routes.delete("/users/:user_id", async (req, res) => {
  await db.none(`DELETE from users WHERE id = $(user_id)`, {
    user_id: req.params.user_id,
  });

  res.status(204).send();
});

routes.delete("/books/:shelf/:book_id/:user_id", async (req, res) => {
  await db.none(
    `DELETE from shelves WHERE book_id = $(book_id) AND shelf = $(shelf) AND user_id = $(user_id)`,
    {
      book_id: +req.params.book_id,
      user_id: +req.params.user_id,
      shelf: req.params.shelf,
    }
  );

  res.status(204).send();
});

routes.delete("/shelves/:shelf/:user_id", async (req, res) => {
  await db.none(
    `DELETE from shelves WHERE shelf = $(shelf) AND user_id = $(user_id)`,
    {
      shelf: req.params.shelf,
      user_id: +req.params.user_id,
    }
  );

  res.status(204).send();
});

routes.get("/notes/:user_id", async (req, res) => {
  res.json(
    await db.manyOrNone(`SELECT * from notes WHERE user_id = $(user_id)`, {
      user_id: req.params.user_id,
    })
  );
});

routes.post("/notes/:user_id/:book_id", async (req, res) => {
  try {
    await db.none(
      `
        INSERT INTO notes (book_id, user_id, notes) VALUES ($(book_id), $(user_id), $(notes))`,
      {
        book_id: +req.params.book_id,
        user_id: +req.params.user_id,
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

routes.put("/notes/:user_id/:book_id", async (req, res) => {
  await db.oneOrNone(
    `UPDATE notes SET notes = $(notes) WHERE user_id = $(user_id) and book_id = $(book_id)`,
    {
      notes: req.body.notes,
      user_id: +req.params.user_id,
      book_id: +req.params.book_id,
    }
  );

  const updatedNote = await db.one(
    `SELECT * from notes
    INNER JOIN books b ON b.id = notes.book_id
    INNER JOIN users u ON u.id = notes.book_id
    WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      user_id: +req.params.user_id,
      book_id: +req.params.book_id,
    }
  );

  res.status(201).json(updatedNote);
});

routes.delete("/notes/:user_id/:book_id", async (req, res) => {
  await db.none(
    `DELETE from notes WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      book_id: +req.params.book_id,
      user_id: +req.params.user_id,
    }
  );

  res.status(204).send();
});

routes.get("/notes/:user_id/:book_id", async (req, res) => {
  res.json(
    await db.oneOrNone(
      `SELECT * from notes WHERE user_id = $(user_id) and book_id = $(book_id)`,
      {
        user_id: +req.params.user_id,
        book_id: +req.params.book_id,
      }
    )
  );
});

routes.get("/reviews/:book_id", async (req, res) => {
  res.json(
    await db.manyOrNone(`SELECT * from reviews WHERE book_id = $(book_id)`, {
      book_id: +req.params.book_id,
    })
  );
});

routes.get("/reviews/:user_id/:book_id", async (req, res) => {
  res.json(
    await db.manyOrNone(
      `SELECT * from reviews WHERE book_id = $(book_id) and user_id = $(user_id)`,
      {
        book_id: +req.params.book_id,
        user_id: +req.params.user_id,
      }
    )
  );
});

routes.post("/reviews/:user_id/:book_id", async (req, res) => {
  try {
    await db.none(
      `
        INSERT INTO reviews (book_id, user_id, rating, review, plot, character, world, pacing, organization, informative, writing, readability,
            worth, editing, accuracy) VALUES ($(book_id), $(user_id), $(rating), $(review), $(plot), $(character), $(world), $(pacing), $(organization),
            $(informative), $(writing), $(readability), $(worth), $(editing), $(accuracy))`,
      {
        book_id: +req.params.book_id,
        user_id: +req.params.user_id,
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

routes.put("/reviews/:user_id/:book_id", async (req, res) => {
  await db.oneOrNone(
    `UPDATE reviews SET rating = $(rating), review = $(review), plot = $(plot), character = $(character), world = $(world), 
    pacing = $(pacing), organization = $(organization), informative = $(informative), writing = $(writing), 
    readability = $(readability), worth = $(worth), editing = $(editing), accuracy = $(accuracy) 
    WHERE user_id = $(user_id) and book_id = $(book_id)`,
    {
      book_id: +req.params.book_id,
      user_id: +req.params.user_id,
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
  await db.none(
    `DELETE from reviews WHERE user_id = $(user_id) AND book_id = $(book_id)`,
    {
      book_id: +req.params.book_id,
      user_id: +req.params.user_id,
    }
  );

  res.status(204).send();
});

module.exports = routes;
