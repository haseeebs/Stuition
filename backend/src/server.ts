import express from "express";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send(`<h1>Hi there, Haseeb here...</h1>`);
});

app.listen(PORT, () => {
    console.log(`Running on Port http://localhost:${PORT}`);
});