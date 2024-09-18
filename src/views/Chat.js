import data from '../data/dataset.js';
import { Nav } from "../components/nav.js";
import { navigateTo } from "../router.js";
import { LugarTuristicoIndividual } from "../components/ChatIndividual.js"; // Cambié el nombre del componente

export function Chat(props) { // Cambié el nombre de la función a algo más acorde al contexto
  const lugarView = document.createElement("div");
  lugarView.classList.add("lugar");

  lugarView.appendChild(Nav()); // Añade la barra de navegación
  const mainElement = document.createElement("main");
  mainElement.classList.add("lugar__main");
  lugarView.appendChild(mainElement);
  mainElement.appendChild(LugarTuristicoIndividual(props)); // Muestra la información individual del lugar

  const itemData = data.find((item) => item.id === props.id); // Busca el lugar turístico por id

  if (!itemData) {
    navigateTo("/error", {}); // Redirige a la página de error si no se encuentra el lugar
    return lugarView;
  }

  document.title = `Información sobre ${itemData.name}`; // Cambia el título de la página para reflejar el lugar turístico
  
  document.querySelector("head").innerHTML += `
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0" />
  `;

  const dataElement = document.createElement("li");
  dataElement.classList.add("data__container");
  dataElement.setAttribute("itemscope", "");
  dataElement.setAttribute("itemtype", "https://schema.org/CreativeWork");
  dataElement.setAttribute("data-id", itemData.id);

  dataElement.innerHTML = `
      <div class="data__image">
        <img class="data__image__background" src="${itemData.imageUrl}" alt="${itemData.name}" itemprop="image"/>
      </div>
      <div class="data__text__title">
        <h3 id="title__name" itemprop="name">${itemData.name}</h3>
      </div>
      <div class="data__text">
        <p class="data__text__description" itemprop="description">${itemData.description}</p>

        <p class="data__text__description" itemprop="facts">Departamento: ${itemData.facts.Departamento}</p>
        <p class="data__text__description" itemprop="facts">Región: ${itemData.facts.Región}</p>
      </div>
    `;
    
  mainElement.appendChild(dataElement);
  return lugarView;
}
