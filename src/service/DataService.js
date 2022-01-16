export class DataService {

    getStocks() {
        // return fetch('./data/products.json').then(res => res.json()).then(d => d.data);
        return fetch('data/stock.json').then(res => res.json()).then(d => d.data);
    }

}