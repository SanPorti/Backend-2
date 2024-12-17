
export class ProductDto {
    constructor(product){
        this.title = product.title;
        this.category = product.category;
        this.price = product.price;
        this.stock = product.stock;
    }
}