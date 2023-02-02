// Fixa:
// .: Laddningsikon på planet-delen
// .: Kunna bläddra bakåt i katalogen

const BASE_URL = 'https://swapi.dev/api/';
const ADD_PEOPLE = '/people/'
let NEW_URL = BASE_URL + ADD_PEOPLE;

const charactersEl = document.getElementById('characters-list');
const detailsEl = document.getElementById('details-data');
const planetEl = document.getElementById('planet-data');
const nextPage = document.getElementById('next-page');
let pageCount = 1;

function renderUI(data) {
    for (let i = 0; i < data.length; i++) {
        document.querySelector('.characters .loading').classList.add('invisible');
        let person = document.createElement('li');
        let personData = data[i]
        person.innerHTML = personData.name;
        
        if (!(i % 2 === 0)) {
            person.style.backgroundColor = '#E1DEDE';
            person.style.color = '#535556';
        } else {
            person.style.backgroundColor = '#8E8E8E';
            person.style.color = '#FFFFFF';
        }
        charactersEl.appendChild(person)
        
        person.addEventListener('click', () => {
            console.log('you clicked on ' + personData.name);
            detailsEl.innerHTML ='';
            let details = document.createElement('article');
            details.innerHTML = `<h3>${personData.name}</h3>
            <ul class="person-data-list">
            <li>Height: ${personData.height} m</li>
            <li>Mass: ${personData.mass} kg</li>
                                    <li>Hair color: ${personData.hair_color}</li>
                                    <li>Skin color: ${personData.skin_color}</li>
                                    <li>Birth year: ${personData.birth_year}</li>
                                    <li>Gender: ${personData.gender}</li>
                                    </ul>`;
            detailsEl.appendChild(details);
            renderPlanet(personData.homeworld);
        })
    }
}

async function getData() {
    let data = await fetch(NEW_URL);
    data = await data.json();
    console.log(data);
    NEW_URL = data.next;
    data = data.results;
    console.log(data);
    
    renderUI(data);
}

async function renderPlanet(fetchURL) {
    planetEl.innerHTML = '';
    let planetData = await fetch(fetchURL);
    planetData = await planetData.json();
    console.log(planetData);
    
    let planet = document.createElement('article');
    planet.innerHTML = `<h3>${planetData.name}</h3>
    <ul class="planet-data-list">
    <li>Rotation period: ${planetData.rotation_period}h</li>
    <li>Orbital period: ${planetData.orbital_period} days</li>
    <li>Diameter: ${planetData.diameter} km</li>
    <li>Climate: ${planetData.climate}</li>
    <li>Gravity: ${planetData.gravity}</li>
    <li>Terrain: ${planetData.terrain}</li>
    </ul>`;
    planetEl.appendChild(planet);
}

getData();

nextPage.addEventListener('click', () => {
    pageCount++;
    charactersEl.innerHTML = '';
    document.querySelector('.characters .loading').classList.remove('invisible');
    getData();
    document.getElementById('page-count').innerHTML = pageCount;
})

