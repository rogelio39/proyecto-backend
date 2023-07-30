
class ProductsManager {
    constructor() {
        this.products = [];
        this.usedIds = new Set();
    }


    addProduct(product, funct) {

        if (!product.id) {
            product.id = generadorId(); // Generamos un ID aleatorio si el producto no tiene uno
        }

        if (!this.usedIds.has(product.id)) {
            // Verificamos si el ID aún no ha sido utilizado
            this.products.push(product.id, product);
            this.usedIds.add(product.id); // Agregamos el ID al conjunto de IDs utilizados
        } else {
            console.log('El ID del producto ya está en uso. Generando un nuevo ID...');
            product.id = generadorId(); // Generamos un nuevo ID aleatorio
            this.addProduct(product); // Intentamos agregar el producto de nuevo con el nuevo ID de forma recursiva
        }

    }

    getProducts() {
        return this.products;
    }


    getProductById(product) {

        const productCode = this.products.find((prod) => prod.code === product.code);
        if (product) {
            console.log('producto encontrado')
            return productCode;
        } else {
            console.log('Producto no encontrado');
            return null;
        }


    }
}

function generadorId() {

    const minId = 1;
    const maxId = 10000;
    const idGenerado = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    return idGenerado;

}

class Products {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.code = code,
            this.stock = stock,
            this.thumbnail = thumbnail
    }

    getProductDetails() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            code: this.code,
            stock: this.stock,
            thumbnail: this.thumbnail
        };
    }

}


const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV102', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV103', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV104', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV105', 10, []);

const productManager = new ProductsManager();

productManager.addProduct(product1, generadorId());
productManager.addProduct(product2, generadorId());
productManager.addProduct(product3, generadorId());
productManager.addProduct(product4, generadorId());
productManager.addProduct(product5, generadorId());

// const foundProduct = productManager.getProductById(product1);
// if (foundProduct) {
//     console.log(foundProduct.getProductDetails());
// }


console.log(productManager.getProducts());

console.log(product1);











