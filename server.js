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
        `
    )
});

// solo traer productos cuando los pedimos

app.get('/products', async(req, res) => {
    try {
        const pathFile = new Container('./products.json');
        const getProducts = await pathFile.getAll();
        const productsStringify = JSON.stringify(getProducts);
        res.send(
            `<h3>Products:</h3>
            <p>${productsStringify}</p>`
        );
    }
    catch (err) {
        console.log(err);
    };
});

app.get('/randomProduct', async(req, res) => {
    try {
        const pathFile = new Container('./products.json');
        const getRandomProduct = await pathFile.getRandom();
        const randomStringify = JSON.stringify(getRandomProduct);
        res.send(
            `<h3>Random product:</h3>
            <p>${randomStringify}</p>`
        );
    }
    catch (err) {
        console.log(err);
    }
});