const API = "https://swapi.dev/api/people";
const imgLoader = "http://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_00.gif";

const renderDatos = (data) => {
    console.log("dato", data);
    let impresion = `
    <div class="col-sm-3 mt-3">
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">name: ${data.name}</h5>
            <p class="card-text">height: ${data.height}</p>
            <p class="card-text">mass: ${data.mass}</p>
            <p class="card-text">hair_color: ${data.hair_color}</p>
            <hr>
            <h5> Datos extras </h5>
            <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Films
            </button>
            <ul id='${data.url}' class="dropdown-menu">
            </ul>
            </div>
            <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Vehicles
            </button>
            <ul id='${data.url + 'vehicles'}' class="dropdown-menu">
            </ul>
            </div>
        </div>
        </div>
    </div>
    `;
    document.getElementById("cajaApi").innerHTML += impresion;
};

const pagination = (prev, next) => {
    document.getElementById("pagination").innerHTML = `
    <button type="button" ${prev === null ? 'disabled' : ''} onclick="cargarDatos('${prev}')" class="btn btn-outline-primary">prev</button>
    <button type="button" ${next === null ? 'disabled' : ''}  onclick="cargarDatos('${next}')" class="btn btn-outline-secondary">next</button>
    `;
};

const cargarExtras = (collection, id) => {
    document.getElementById(id).innerHTML += collection.length ? '' : '<li><a class="dropdown-item" href="#"> No tiene elementos </a></li>';
    collection.forEach(element => {
        fetch(element)
            .then(response => response.json())
            .then(data => document.getElementById(id).innerHTML += `<li><a class="dropdown-item" href="#"> ${data.title || data.name} - ${data.director || data.model} </a></li>`)
            .catch(err => console.error(err));
    });
};

const processData = (data) => {
    document.getElementById("cajaApi").innerHTML = ``;
    data.forEach((item) => {
        renderDatos(item);
        cargarExtras(item.films, item.url);
        cargarExtras(item.vehicles, item.url + 'vehicles');
    });
};


const cargarDatos = (api) => {
    document.getElementById("cajaApi").innerHTML = `<img src="${imgLoader}"></img>`;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            processData(data.results);
            pagination(data.previous, data.next);
        })
        .catch(err => console.error(err));
};

cargarDatos(API);