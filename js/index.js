const BASE_URL = 'https://swapi.dev/api/';

async function getData() {
    let data = await fetch('https://swapi.dev/api/people/');
    data = await data.json();
    data = data.results;
    console.log(data);

    data.forEach(element => {
        console.log(element.name);
    });

    // // Hämtar nästa sida
    // data = await fetch(data.next);
    // data = await data.json();
    // console.log(data);
}

getData();