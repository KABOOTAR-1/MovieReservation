const express=require("express");
const app=express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});