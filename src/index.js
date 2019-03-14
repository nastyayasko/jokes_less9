import axios from 'axios';
let btnAdd = document.querySelector('.btn-primary');
let btnRemoveAll = document.querySelector('.btn-danger');
let searchField = document.querySelector('.search-field');
let notes = document.querySelector('.notes-list');
let arrJokes; 
if (localStorage.getItem('myKey')){
    arrJokes = JSON.parse(localStorage.myKey);
    renderHtml(arrJokes);
    } else {
    arrJokes = [];
}
let lArrJokes;
btnAdd.onclick = () => {
    let url = 'https://api.chucknorris.io/jokes/random';
    axios(url).then((res)=>{
        arrJokes.push({joke: res.data.value,
        rgb: `rgb(${getRandomInt(0, 257)},${getRandomInt(0, 257)},${getRandomInt(0, 257)})`,
        });
        renderHtml(arrJokes);
    }
    );
}
function renderHtml(arr){
    notes.innerHTML='';
    arr.forEach((joke, i)=>{
       let div = renderDiv(joke, i);
       notes.appendChild(div);
    });
    lArrJokes = JSON.stringify(arrJokes);
    localStorage.setItem("myKey", lArrJokes);
}
function renderDiv(joke, i){
    let divNote = document.createElement('div');
    divNote.classList.add('note');
    divNote.setAttribute('style', `background:${joke.rgb}`);

    let divContent = document.createElement('div');
    divContent.classList.add('content');
    divContent.textContent = joke.joke;
    divNote.appendChild(divContent);

    let divBtns =  document.createElement('div');
    divBtns.classList.add('overlay');
    divNote.appendChild(divBtns);

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'btn-warning');
    btnEdit.textContent = 'edit';
    divBtns.appendChild(btnEdit);

    let iPencil = document.createElement('i');
    iPencil.classList.add('fa', 'fa-pencil');
    btnEdit.appendChild(iPencil);

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btn', 'btn-danger');
    btnDelete.textContent = 'delete';
    divBtns.appendChild(btnDelete);
    
    let iX = document.createElement('i');
    iX.classList.add('fa', 'fa-times');
    btnDelete.appendChild(iX);
    btnEdit.onclick = ()=>{
        let newText = prompt('',joke.joke);
        arrJokes[i].joke = newText;
        renderHtml(arrJokes);
    }
    btnDelete.onclick = ()=>{
        arrJokes.splice(i, 1);
        renderHtml(arrJokes);
    }
    
    return divNote;
}
btnRemoveAll.onclick = ()=>{
    arrJokes.splice(0, arrJokes.length);
    renderHtml(arrJokes);
}
searchField.oninput = ()=>{
    let value = searchField.value.toLowerCase();
    let newArrJokes = arrJokes.filter((joke)=>{
        if (joke.joke.toLowerCase().includes(value)){
            return joke;
        }
    });
    renderHtml(newArrJokes);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }