import { navigateTo } from "../router.js";

export const Footer = () => {
  //Creamos el footer
  const footerElement = document.createElement("footer");
  footerElement.classList.add("footer");

  //Definimos la estructura del footer
  footerElement.innerHTML = `
        <img class="l_footer" src="../img/logo.svg" alt="ciressa_logo" draggable="false">Flores Vidaurre, 2024.`;
  //Añadimos el evento para redirigir al inicio
  footerElement.querySelector(".l_footer").addEventListener("click", () => {
    navigateTo("/", {});
  });
  return footerElement;
}