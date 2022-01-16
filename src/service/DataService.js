export class DataService {
    // getProductsSmall() {
    //     return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
    // }

    getProducts() {
        // return fetch('./data/products.json').then(res => res.json()).then(d => d.data);
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }

    getStocks() {
        // return fetch('./data/products.json').then(res => res.json()).then(d => d.data);
        return fetch('data/stock.json').then(res => res.json()).then(d => d.data);
    }

    // getProductsWithOrdersSmall() {
    //     return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
    // }
}