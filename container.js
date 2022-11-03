const fs = require('fs');
// import fs from 'fs';

class Container {
    constructor(file) {
        this.file = file;
    };

    async save(req,res) {
        try {
            const { name, price, inStock } = req.body;
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            let newId = 0;
            let lastId;
            if (get.length == 0) {
                newId = 1;
            }
            else {
                lastId = get[get.length - 1].id
                newId = lastId + 1;
            };
            const newProduct = {
                name: name,
                price: price,
                inStock: inStock,
                id: newId
            };
            get.push(newProduct);
            await fs.promises.writeFile('./products.json', JSON.stringify(get, null, 4), 'utf-8');
            res.send(newProduct);
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null
        }
    };

    async getByid(req, res) {
        try {
            const { id } = req.params;
            const idParam = parseInt(id);
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            const findProduct = get.find( el => el.id === idParam);
            res.send(findProduct);
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    };

    async getAll(req, res) {
        try {
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            res.send(get);
        }
        catch (err) {
            console.log(`Method ERR! ${err}`);
            return [];
        }
    };

    async updateById(req, res) {
        try {
            const { name, price, inStock } = req.body;
            const { id } = req.params;
            const idParam = parseInt(id);
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            const createProduct = {name, price, inStock, "id": idParam};
            const findProductByIndex = get.findIndex(el => el.id === idParam);
            if (findProductByIndex !== -1) {
                get[findProductByIndex] = createProduct; 
            }
            else {
                res.send(`ERR! Product with ${idParam} does not exist.`)
            }
            const updatedProducts = await fs.promises.writeFile('./products.json', JSON.stringify(get, null, 4), 'utf-8');
            res.send(updatedProducts);
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    }

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const idParam = parseInt(id);
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            const filterProducts = get.filter(e => e.id !== idParam);
            if( filterProducts.length === 1) {
                await fs.promises.writeFile('./products.json', JSON.stringify(filterProducts, null, 4), 'utf-8');
                res.send(filterProducts);
            }
            else {
                res.send(`ERR! Product with ${idParam} does not exist. `);
            }
            
        }
        catch(err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    };

    async deleteAll() {
        try {
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            while (get.length > 0) {
                get.pop();
            };
            await fs.promises.writeFile('./products.json', JSON.stringify(get, null, 4), 'utf-8');
            return get;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
        }
    };

    async getRandom() {
        try {
            const get = JSON.parse(await fs.promises.readFile('./products.json', 'utf-8'));
            const randomItem = Math.floor(Math.random()*get.length);
            const getRandom = get[randomItem];
            return getRandom;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
        }
    };
};

module.exports = Container;


// export default Container;