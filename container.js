const fs = require('fs');
// import fs from 'fs';

class Container {
    constructor(file) {
        this.file = file;
    };

    async save(newProduct) {
        try {
            const get = await this.getAll();
            let newId = 0;
            let lastId;
            if (get.length == 0) {
                newId = 1;
            }
            else {
                lastId = get[get.length - 1].id
                newId = lastId + 1;
            };
            const product1 = {
                ...newProduct,
                id: newId
            };
            get.push(product1);
            await fs.promises.writeFile(this.file, JSON.stringify(get, null, 4), 'utf-8');
            return product1.id;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null
        }
    };

    async getByid(id) {
        try {
            const get = await this.getAll();
            const findProduct = get.find( el => el.id === id);
            await fs.promises.writeFile(this.file, JSON.stringify(findProduct, null, 4), 'utf-8');
            return findProduct;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    };

    async getAll() {
        try {
            const get = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            return get;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return [];
        }
    };

    async deleteById(id) {
        try {
            const get = await this.getAll();
            const filterProducts = get.filter(e => e.id !== id);
            await fs.promises.writeFile(this.file, JSON.stringify(filterProducts, null, 4), 'utf-8');
            return filterProducts;
        }
        catch(err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    };

    async deleteAll() {
        try {
            const get = await this.getAll();
            while (get.length > 0) {
                get.pop();
            };
            await fs.promises.writeFile(this.file, JSON.stringify(get, null, 4), 'utf-8');
            return get;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
        }
    };

};

module.exports = Container;


// export default Container;