const container = require('./container.js');

const express = require('express');
const Container = require('./container.js');

const app = express();

const PORT = 8080;

app.listen(PORT, () =>
    console.log(
        `Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
    )
);

app.get('/', (req, res) => {
    res.send(
        `<h2>Desafio: Servidor con Express</h2>
        <p>Alumno: Bruno Pontiz</p>
        <p>Curso: Programacion Backend</p>
        <p>Comision: 43490</p>
        `)
});

// solo traer productos cuando los pedimos

app.get('/products', async(req, res) => {
    try {
        const pathFile = new Container('./products.json');
        const getProducts = await pathFile.getAll();
        res.json(getProducts);
    }
    catch (err) {
        console.log(err);
    };
});

app.get('/randomProduct', async(req, res) => {
    try {
        const pathFile = new Container('./products.json');
        const getRandomProduct = await pathFile.getRandom();
        res.json(getRandomProduct);
    }
    catch (err) {
        console.log(err);
    }
});