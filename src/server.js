const express = require('express');
const cors = require('cors');
// TODO: Add code to meet the requirements and make the tests pass.
const urlRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");


const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5001;



// Apply cors middleware to the entire router
router.use(cors());


router.get('/', cors(), (req, res) => {
  res.json({ message: 'Hello Render!' });
});

app.use('/', router);



app.use(express.json());
app.use("/urls", urlRouter);
app.use("/uses", usesRouter);




app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
});

module.exports = app;