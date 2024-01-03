const express = require("express");

const app = express();

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
const urlRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");


app.use(express.json());
app.use("/urls", urlRouter);
app.use("/uses", usesRouter);



// Not-found handler
app.use((req, res, next) => {
  return next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  console.error(error);
  res.status(status).json({ error: message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
