import data from '../data/dataset.js';
import { BaseHeader } from '../components/Header.js';
import { Tarjetas } from '../components/tarjetas.js';
import { Footer } from "../components/footer.js";
import { filterData, filterInput, sortData } from '../lib/dataFunctions.js';


export function Home() {
  const viewEl = document.createElement('div');
  viewEl.classList.add("home")

  viewEl.appendChild(BaseHeader());
  const mainElement = document.createElement("main");
  viewEl.appendChild(mainElement);
  viewEl.appendChild(Footer());

  function displayCards(data) {
    mainElement.innerHTML = "";
    mainElement.appendChild(Tarjetas(data));
  }

  displayCards(data);

  document.body.appendChild(viewEl)

  const filterSelectRegion = document.getElementById("filterRegion");

  filterSelectRegion.addEventListener("change", () => {
    filterSelectDepartamento.value = "";
    searchInput.value = "";
    selectOrder.value = "";
    mainElement.innerHTML = ""
    const filteredData = filterData(data, "Región", filterSelectRegion.value)
    mainElement.appendChild(Tarjetas(filteredData))
  })

  const filterSelectDepartamento = document.getElementById("filterDepartamento")

  filterSelectDepartamento.addEventListener("change", () => {
    selectOrder.value = "";
    filterSelectRegion.value = "";
    searchInput.value = "";
    mainElement.innerHTML = ""
    const filteredData = filterData(data, "Departamento", filterSelectDepartamento.value)
    mainElement.appendChild(Tarjetas(filteredData))
  })


  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    selectOrder.value = "";
    filterSelectRegion.value = "";
    filterSelectDepartamento.value = "";
    mainElement.innerHTML = ""
    const filteredInput = filterInput(data, searchInput.value)
    mainElement.appendChild(Tarjetas(filteredInput))
  })

  const selectOrder = document.getElementById("filterOrdenar");

  selectOrder.addEventListener("change", () => {
    filterSelectRegion.value = "";
    filterSelectDepartamento.value = "";
    searchInput.value = "";
    mainElement.innerHTML = ""
    const sortedData = sortData(data, selectOrder.value)
    mainElement.appendChild(Tarjetas(sortedData))
  })

  const clear = document.querySelector("#reset-button");
  clear.addEventListener("click", function () {
    selectOrder.value = "";
    filterSelectRegion.value = "";
    filterSelectDepartamento.value = "";
    searchInput.value = "";

    mainElement.innerHTML = "";
    displayCards(data);
  });

  return viewEl;


}




