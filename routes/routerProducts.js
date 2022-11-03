const Container = require('../container');
const express = require('express');
const app = express();
const { Router } = express;

const routerProducts = new Router();
const pathFile = new Container('products.json');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

routerProducts.get('/', pathFile.getAll);
routerProducts.get('/:id', pathFile.getByid);
routerProducts.post('/', pathFile.save);
routerProducts.put('/:id', pathFile.updateById);
routerProducts.delete('/:id', pathFile.deleteById);

module.exports = routerProducts;