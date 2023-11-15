const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const Car = require('./scripts/car');


function writeFiles(request, response, ...file_paths) {
    let fileTypes = new Map;
    fileTypes.set('.html', 'text/html');
    fileTypes.set('.css', 'text/css');
    fileTypes.set('.png', 'image/png');
    fileTypes.set('.ico', 'image/x-icon');
    let extname = path.extname(request.url);
    file_paths = file_paths.flat(Infinity);
    if (file_paths.length != 0) {
        for (let i = 0; i < file_paths.length; i++) {
            if (file_paths[i].includes(request.url) && fileTypes.has(extname) == true) {
                response.writeHead(200, { 'Content-type': fileTypes.get(extname) });
                fs.readFile(file_paths[i], (err, data) => {
                    if (err) throw err
                    response.end(data);
                })
                break;
            }
        }
    }
}

function writePage_html(path, response, content) {
    response.writeHead(200, { 'Content-type': 'text/html' })
    if (typeof content == 'undefined') {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log('error');
                throw err;
            }
            response.end(data);
        })
    }
    else {
        response.end(content);
    }
} 

const server = http.createServer((request, response) => {
    
    let req_url = url.parse(request.url, 1);
    writeFiles(request, response, './styles/main.css', './styles/add_car.css');
    if(req_url.pathname == '/' || req_url.pathname == '/index.html'){
        writePage_html('./pages/add_car.html', response);
    }
    else if(req_url.pathname == '/main'){

    }
    else if(req_url.pathname == '/addcar2'){
        let data = '';
        request.on('data', (chunk)=>{
            data += chunk;
        })
        .on('end', ()=>{
            let parsedData = JSON.parse(data);
            let newCar = new Car();
            console.log(newCar);
            newCar.setBrand(parsedData.brand);
            newCar.setColor(parsedData.color);
            newCar.setNumber(parsedData.number);
            newCar.setMass(parsedData.mass);
            newCar.setEngineType(parsedData.eng_type);
            newCar.setProdDate(parsedData.date);
            newCar.setFines(parsedData.fines);
            newCar.setUnpaidFines(parsedData.unp_fines);
            fs.readFile('./data/cars.json', (err, cars)=>{
                if(err){
                    throw err;
                }
                else{
                    let carsArray = new Array(JSON.parse(cars));
                    carsArray = carsArray.flat(Infinity);
                    console.log(carsArray);
                    carsArray.push(newCar);
                    fs.writeFile('./data/cars.json', JSON.stringify(carsArray), (err)=>{
                        if(err) throw err;
                    })
                }
            })
            console.log(data);
        })
    }
});

server.listen(2007);