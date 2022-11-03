const express = require('express');
const Container = require('./container');
const routerProducts = require('./routes/routerProducts');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const server = app.listen(PORT, () =>
    console.log(
        `Server started on PORT http://127.0.0.1:${PORT} at ${new Date().toLocaleString()}`
    )
);

server.on('error', (err) => {
    console.log("Server ERR!: ", err);
});

app.use('/api/products', routerProducts);

// function lastChallengeCODERHOUSE() {
//     app.get('/', (req, res) => {
//         res.send(
//             `<h2>Desafio: Servidor con Express</h2>
//             <p>Alumno: Bruno Pontiz</p>
//             <p>Curso: Programacion Backend</p>
//             <p>Comision: 43490</p>
//             `
//         )
//     });
    
//     app.get('/products', async(req, res) => {
//         try {
//             const pathFile = new Container('./products.json');
//             const getProducts = await pathFile.getAll();
//             const productsStringify = JSON.stringify(getProducts);
//             res.send(
//                 `<h3>Products:</h3>
//                 <p>${productsStringify}</p>`
//             );
//         }
//         catch (err) {
//             console.log(err);
//         };
//     });
    
//     app.get('/randomProduct', async(req, res) => {
//         try {
//             const pathFile = new Container('./products.json');
//             const getRandomProduct = await pathFile.getRandom();
//             const randomStringify = JSON.stringify(getRandomProduct);
//             res.send(
//                 `<h3>Random product:</h3>
//                 <p>${randomStringify}</p>`
//             );
//         }
//         catch (err) {
//             console.log(err);
//         }
//     });
// }