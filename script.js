import fs from 'fs';

class ProductsManager {
    constructor() {
        this.products = [];
        this.usedIds = new Set();
    }


    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code)
        if (prod) {
            console.log('producto ya encontrado');
        } else if (!this.usedIds.has(product.id)) {
            // Verificamos si el ID aún no ha sido utilizado
            this.products.push(product);
            this.usedIds.add(product.id); // Agregamos el ID al conjunto de IDs utilizados
            fs.appendFileSync('./productos.txt', `\n${product.id}`); 
        } else {
            console.error('Error al cargar el producto, intente nuevamente')
        }


    }

    getProducts() {
        return this.products;
    }


    getProductById(product) {

        const productId = this.products.find((prod) => prod.id === product.id);
        if (productId) {
            console.log('producto encontrado')
            return product;
        } else {
            console.log('Producto no encontrado');
            return null;
        }


    }
}


class Products {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.code = code,
            this.stock = stock,
            this.thumbnail = thumbnail,
            this.id = Products.generadorId();
    }
    getProductDetails() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            code: this.code,
            stock: this.stock,
            thumbnail: this.thumbnail,
            id: this.id
        };
    }


    static usedIds = new Set();
    static generadorId() {

        let idGenerado;
        const minId = 1;
        const maxId = 10000;
        while (!idGenerado || this.usedIds.has(idGenerado)) {
            idGenerado = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        }
        this.usedIds.add(idGenerado);
        return idGenerado;
    }

}


const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV102', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV103', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV104', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV105', 10, []);




const productManager = new ProductsManager();



productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);





// console.log(productManager.getProducts());
