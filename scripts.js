
const pkmContainer = document.querySelector('.pkmContainer')

async function getPkm(pkmName){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmName}`)
    .then((response) => response.json())
    .then((data) => {
        pkmContainer.innerHTML = '';
        mostrarPkm(data);
        console.log(data);
        const audio = document.querySelector('.audio');
        audio.volume = 0.1;
    })
    .catch((error) => { 
        console.log(error);
    });
}

function mostrarPkm(data){
    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML  = ` 
    
    <h1>${capitalizeFirstLetter(data.name)}</h2>
    <div class="img-container">
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <img src="${data.sprites.back_default}" alt="${data.name}">
    </div>
    <div class="info">
        <table>
            <tr>
                <th>ID</th>
                <th>Height</th>
                <th>Weight</th>
            </tr>
            <tr>
                <td>#${data.id}</td>
                <td>${data.height} decimeters</td>
                <td>${data.weight} hectograms</td>
            </tr>
        </table>
    
        <h3>Types</h3>
        <small>${data.types[0].type.name}</small>
        <small>${data.types[1]?data.types[1].type.name:''}</small> 
        <br>
        <audio autoplay class="audio">
            <source src="${data.cries.legacy?data.cries.legacy:data.cries.latest}" type="audio/ogg">
        </audio>
        
    </div>
    

    `;

    pkmContainer.appendChild(div);
}


document.addEventListener('submit', (event) => {
    event.preventDefault();
    const pkmName = document.querySelector('#pkmName').value.toLowerCase();
    getPkm(pkmName);
});

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


//Sidebar

const btnOpen = document.getElementById("btnFilter");
const btnClose = document.getElementById("btnClose");

btnOpen.addEventListener('click', function(){
	document.getElementById("sidebar").style.width = "300px";
})

btnClose.addEventListener('click', function(){
	document.getElementById("sidebar").style.width = "0";
})