
class ProductsManager {
    constructor() {
        this.products = [];
    }


    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code);
        if (!prod) {
            this.products.push(product);
        } else {
            console.log('El CODE del producto ya está en uso.');
        }
    }

    getProducts() {
        return this.products;
    }


    getProductById(productCode) {

        const product = this.products.find((prod) => prod.code === productCode.code);
        if (product) {
            console.log('producto encontrado')
            return productCode;
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
            this.thumbnail = thumbnail
            this.id = Products.incrementarId();
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

    static incrementarId() {
        if(this.idIncrement){
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
}


}
//se crean productos
const product1 = new Products('Pan Integral', 'Pan con harina integral y mix de semillas', 500, 'ALV100', 10, []);
const product2 = new Products('Pan Blanco', 'Pan blanco con mix de semillas', 600, 'ALV102', 10, []);
const product3 = new Products('Pan de Campo', 'Pan de campo con hierbas', 700, 'ALV103', 10, []);
const product4 = new Products('Pan de masa madre', 'Pan de masa madre tipo hogaza', 800, 'ALV104', 10, []);
const product5 = new Products('Pan de centeno', 'Pan de centeno con semillas de chia', 900, 'ALV105', 10, []);



//se crea instancia de la clase manejadora de productos
const productManager = new ProductsManager();
//se agregan productos
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);

const foundProduct = productManager.getProductById(product1);
if (foundProduct) {
    console.log(foundProduct.getProductDetails());
}


console.log(productManager.getProducts());

