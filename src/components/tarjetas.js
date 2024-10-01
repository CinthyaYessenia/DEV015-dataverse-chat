import { navigateTo } from "../router.js";

export const Tarjetas = (data) => {
  // Aquí comienza tu código y puedes retornar lo que tu necesites
  const list = document.createElement('ul');
  list.className = 'container';
  data.forEach(element => {
    const listItem = document.createElement('li')
    listItem.className = 'tarjetas'
    listItem.innerHTML = ` <img class="img_tarjetas" src=${element.imageUrl} draggable="false">
      <ul class="ul_tarjeta"> 
      <li><div class="titulo"><b>> ${element.name}</b></div> </li>
      <li><div>${element.shortDescription}</div> </li>
      <li><div>${element.description}</div></li> <br>
      <li><div><b>Departamento: </b>${element.facts.Departamento}</div> </li> 
      <li><div><b>Región: </b>${element.facts.Región}</div> </li>
      </ul>`; /*hacer botón*/

    /*función para boton mandar a navigateTo --> importar*/
    const buttonCard = listItem.querySelector(".ul_tarjeta");
    buttonCard.addEventListener("click", () => {
      navigateTo("/chat", { id: element.id });
    })
    list.appendChild(listItem);
  });
  return list;
}


