const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded',() =>{
    formulario.addEventListener('submit',validarFormulario);
})

function validarFormulario(e){
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;
    
    if(busqueda.length < 3){
        imprimirAlerta('Busqueda muy corta...Agrega mas informacion');
        return
    }

    //consultar API
    consultarAPI(busqueda);
}

function consultarAPI(busqueda){
    const urlGithub = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent(urlGithub) }`;
    
    axios.get(url)
        .then(res => mostrarVacantes(JSON.parse(res.data.contents)))
}

function mostrarVacantes(vacantes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    if(vacantes.length > 0){
        resultado.classList.add('grid');

        vacantes.forEach( vacante =>{
            const { title,company,type,location,url } = vacante;
            
            resultado.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <p class="font-bold uppercase">Lugar:   <span class="font-light normal-case">${location} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}" target="_blanck">Ver Vacante</a>
            </div>
            `;
        })
    }else{
        const noResultado =document.createElement('p');
        noResultado.classList.add('text-center','mt-10','text-gray-600','w-full');
        noResultado.textContent = 'No hay vacantes intenta con otro termino de busqueda';

        resultado.classList.remove('grid')
        resultado.appendChild(noResultado);

        setTimeout(() => {
            noResultado.remove();
        }, 3000);
    }

}

function imprimirAlerta(mensaje){
    const alerta = document.querySelector('.alerta');
    if(!alerta){
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'bg-gray-100 p-3 mt-3 text-center alerta';
        mensajeDiv.textContent = mensaje;

        formulario.appendChild(mensajeDiv)

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    }
}
