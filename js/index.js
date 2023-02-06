import {renderDetails, renderPlanet} from "./module.js";

const BASE_URL = 'https://swapi.dev/api/';
const ADD_PEOPLE = '/people/?page='
let pageCount = 1;

const charactersEl = document.getElementById('characters-list');
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
            renderDetails(personData);
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
