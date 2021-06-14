const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const auth = require("./auth");
const app = express();
app.use(cors());
app.use(auth);
app.use("/", routes);

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
