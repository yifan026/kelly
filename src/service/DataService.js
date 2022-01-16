// Method which actually read json using XMLHttpRequest and promise
const jsonFileReader = async path => {
    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'blob';

        request.onload = () => {
            const reader = new FileReader();

            reader.onload = e => resolve(e.target.result);
            reader.onerror = err => reject(err);
            reader.readAsDataURL(request.response);
        };

        request.send();
    });
}

// This mthod will return the JSON
const returnJsonData = async (url) => {
    const jsonData = await jsonFileReader(url);
    console.log('Here is your JSON data: => ', jsonData);
    return jsonData;
}


export class DataService {

    getStocks() {
        // return fetch('./data/products.json').then(res => res.json()).then(d => d.data);
        // return fetch('data/stock.json').then(res => res.json()).then(d => d.data);

        // Calling the function where you put URL
        returnJsonData('data/stock.json');
    }

}