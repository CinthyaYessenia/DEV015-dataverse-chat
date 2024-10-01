import { navigateTo } from "../router.js";

/**
 * Nav function creates and returns a nav element.
 * @returns {HTMLElement} - The HTML element representing the Nav.
 */
export const Nav = () => {
  //Creamos el elemento nav
  const navContainer = document.createElement("div");
  navContainer.classList.add("nav");

  //Definimos la estructura del nav
  navContainer.innerHTML = `
    <div class="nav_logo">  
        <img class="l_nav" src="../img/logo.svg" alt="ciressa_logo" draggable="false">
    </div>
    <div class="nav_button">
        <div class="div_key_nav">
              <img id="button-Api" src="../img/key.svg" class="key_img_nav" alt="key" draggable="false">
        </div>
    </div>
    `;
  //Añadimos los eventos a los botones
  navContainer.querySelector(".nav_logo").addEventListener("click", () => {
    navigateTo("/", {});
  });

  navContainer.querySelector(".nav_button").addEventListener("click", () => navigateTo('/api-key', {}));

  return navContainer;
};

/*
<button id="button-chat">Chat</button>
navContainer.querySelector("#button-chat").addEventListener("click", () => navigateTo('/chat', {}));
*/
