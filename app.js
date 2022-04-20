import {getElement} from './module.js'
const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const form = getElement('.form');
const input = getElement('.form-input')
const results = getElement('.results');

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const value = input.value;
    if(!value){
        results.innerHTML = '<div class="error">Ingrese un término de búsqueda válido </div>'
        return;
    }

    fetchPages(value)
});

const fetchPages = async(searchValue) =>{
    results.innerHTML = '<div class="loading"></div>'
    try {
        const response = await fetch(`${url}${searchValue}`)
        const data = await response.json();
        const results = data.query.search;

    
        if(results.length < 1){
            results.innerHTML = '<div class="error">No matching results. </div>'

        return;
        }

    renderResults(results)
    } catch (error) {
        results.innerHTML = '<div class="error">Sorry there was a error</div>'
    }
}


const renderResults = (list)=>{
    const cardList = list.map((item)=>{
        const {title,pageid:id,snippet} = item
        
        return `
        <a href=http://en.wikipedia.org/?curid=${id} target="_blank">
        <h4>${title}</h4>
        <p>${snippet}</p>
    </a>
        `
    }).join('')
    results.innerHTML = `
    <div class="articles">${cardList}</div>
    `
}