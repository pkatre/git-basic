const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;


//middleware - when yoy want to work with req.body
app.use(express.json());

//Available route
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
