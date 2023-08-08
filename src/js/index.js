import Notiflix from 'notiflix';
import { fetchBreeds,showSelectedBreed,getInfoAboutCat} from "./cat-api";


const selectEl = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');



selectEl.addEventListener('change',selectedBreed);

let storedBreeds = [];


getBreeds();


function getBreeds() {
  loader.classList.remove("hidden");
  errorEl.classList.add("hidden"); 
  fetchBreeds()
    .then((dataBreeds) => {
      selectEl.innerHTML = createBreeds(dataBreeds);
      storedBreeds = dataBreeds;
    })
    .catch((err) => {
      Notiflix.Notify.failure(err);
      errorEl.classList.remove("hidden");
    }
    )
    .finally(() => {
      loader.classList.add("hidden"); 
    });
}


function createBreeds(arr) {
    return arr.map(({name,id}) => ` <option value="${id}">${name}</option>`).join('');
}

function createCatInfo(elCat) {
  return `
  <img src="${elCat.image.url}" alt="${elCat.name}" width="300" height="300">
  <div class="info-cat">
  <h1>${elCat.name}</h1>
    <p>${elCat.description}</p>
    <p><span class="temper-span">Temperament: </span>${elCat.temperament}</p></div>`;
  }

function selectedBreed() {

  const selectedValue = selectEl.value;
 loader.classList.remove("hidden"); 
  

  const ourCat = storedBreeds.find((cat) => cat.id === selectedValue);

  if (ourCat !== undefined) {
    divCatInfo.innerHTML = createCatInfo(ourCat);
  }

  loader.classList.add("hidden"); // Hide loader
    

  // showSelectedBreed(selectedValue)
  //   .then((cat) => {
  //     console.dir(cat[0]);
  //     return cat[0].id;
  //   })
  //   .then((catId) => {
  //     console.log(catId);
  //        console.dir(storedBreeds);
  //     const ourCat = storedBreeds.find((cat) => cat.image.id === catId);
    
      
  //     divCatInfo.innerHTML = createCatInfo(ourCat);
  //       console.dir(ourCat);
      
  //   }
  //   )
  
  //  .catch((err) => console.log(err));

}


