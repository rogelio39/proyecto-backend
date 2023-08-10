import { promises as fs } from 'fs';
class ProductsManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }


    async addProduct(product) {
        try {
            const prodJson = JSON.parse(await fs.readFile('./productos.json', 'utf8'));
            const prod = prodJson.find((prods) => prods.code === product.code);
            if (prod) {
                console.log('producto existente');
            } else {
                this.products.push(product);
                this.saveProducts();
            }
        } catch (error) {
            console.error(error);
        }


    }





    async loadProducts() {
        try {
            const data = JSON.parse(await fs.readFile('./productos.json', 'utf8'));
            this.products = data;
        } catch (error) {
            this.products = [];
            this.usedIds = new Set();
            console.log('error al cargar productos', error);
        }
    }


    saveProducts() {
        const jsonData = JSON.stringify(this.products, null, 2);
        fs.writeFile('./productos.json', jsonData, 'utf8');
    }

    async getProducts() {
        const product = JSON.parse(await fs.readFile('./productos.json', 'utf8'));
        return product;
    }


    async getProductById(id) {
        const prod = JSON.parse(await fs.readFile('./productos.json', 'utf8'));
        const productId = prod.find((prod) => prod.id === id);
        if (productId) {
            console.log('producto encontrado')
            console.log(productId);
        } else {
            console.log('Producto no encontrado');
            return null;
        }


    }

    async deleteProduct(product) {
        try {
            const products = JSON.parse(await fs.readFile('./productos.json', 'utf8'));
            const updatedProducts = products.filter((prod) => prod.code !== product.code);
            const updatedProductsJson = JSON.stringify(updatedProducts)
            await fs.writeFile('./productos.json', updatedProductsJson, null, 2), (error) => {
                if (error) {
                    console.error('error al escribir el archivo', error.message)
                } else {
                    console.log('producto eliminado exitosamente');
                }
            };

        } catch (error) {
            console.error('error al analizar el archivo json', error);
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
    static lastGeneratedId = 0;

    static generadorId() {
        const minId = 1;
        const maxId = 10000;

        if (this.lastGeneratedId === 0) {
            // Load lastGeneratedId from productos.json if available
            try {
                const data = fs.readFileSync('./productos.json', 'utf8');
                const products = JSON.parse(data);
                const lastProduct = products[products.length - 1];
                if (lastProduct) {
                    this.lastGeneratedId = lastProduct.id;
                }
            } catch (error) {
                // No need to do anything, start from minId
            }
        }

        let idGenerado;
        do {
            idGenerado = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        } while (idGenerado === this.lastGeneratedId);

        this.lastGeneratedId = idGenerado;
        return idGenerado;
    }

}

const productManager = new ProductsManager();
productManager.saveProducts();

const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV101', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV102', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV103', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV104', 10, []);
// const product52 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV105', 10, []);


productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
// productManager.addProduct(product52);

// console.log(productManager.deleteProduct(product3));
// console.log(productManager.getProductById(product1.id));
console.log(productManager.getProducts());
