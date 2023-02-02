const BASE_URL = 'https://swapi.dev/api/';
const ADD_PEOPLE = '/people/'
let NEW_URL = BASE_URL + ADD_PEOPLE;
const charactersEl = document.getElementById('characters-list');

async function getData() {
    let data = await fetch(NEW_URL);
    data = await data.json();
    NEW_URL = data.next;
    data = data.results;
    console.log(data);
    
    renderUI(data);
}

getData();


function renderUI(data) {
    for (let i = 0; i < data.length; i++) {
        document.querySelector('.characters .loading').classList.add('invisible');
        let person = document.createElement('li');
        person.innerHTML = data[i].name;
        
        if (!(i % 2 === 0)) {
            person.style.backgroundColor = '#E1DEDE';
            person.style.color = '#535556';
        } else {
            person.style.backgroundColor = '#8E8E8E';
            person.style.color = '#FFFFFF';
        }
        charactersEl.appendChild(person)
    }
}

document.addEventListener('click', () => {
    charactersEl.innerHTML = '';
    document.querySelector('.characters .loading').classList.remove('invisible');
    getData();
})

