const BASE_URL = 'https://swapi.dev/api/';
const ADD_PEOPLE = '/people/?page='
let pageCount = 1;

const charactersEl = document.getElementById('characters-list');
const detailsEl = document.getElementById('details-data');
const planetEl = document.getElementById('planet-data');
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('previous-page');

function renderPerson(data) {
    for (let i = 0; i < data.length; i++) {
        let personData = data[i];
        // Ta bort loaing gif
        document.querySelector('.characters .loading').classList.add('invisible');
        
        let person = document.createElement('li');
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

function updatePage() {
    charactersEl.innerHTML = '';
    document.querySelector('.characters .loading').classList.remove('invisible');
    getData();
    document.getElementById('page-count').innerHTML = pageCount;
}

async function getData() {
    try {
        let data = await fetch(BASE_URL + ADD_PEOPLE + pageCount);
        data = await data.json();
        data = data.results;
        renderPerson(data);
    } catch (error) {
        console.log(error);
    }
}

async function renderPlanet(fetchURL) {
    try {
        planetEl.innerHTML = '';
        let planetData = await fetch(fetchURL);
        planetData = await planetData.json();
        
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
    } catch (error) {
        console.log(error);
    }
}

getData();

nextPage.addEventListener('click', () => {
    if (pageCount < 9) {
        pageCount++;
        updatePage();
    }
})

prevPage.addEventListener('click', () => {
    if (pageCount > 1) {
        pageCount--;
        updatePage();
    }
})
