const detailsEl = document.getElementById('details-data');
const planetEl = document.getElementById('planet-data');

function renderDetails(personData) {
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

export {renderDetails, renderPlanet};