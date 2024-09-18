import { navigateTo } from "../router.js";

export function Error() {
  const errorView = document.createElement("div");
  errorView.classList.add("error");

  // Cambiar el título de la página del navegador
  document.title = "404";

  // Insertar el HTML que conforma la estructura visual de la interfaz
  errorView.innerHTML = `
      <div class="containerError">
        <div class="containerError__logo">
            <img src="../img/logo.svg" alt="Logo-ciressa" class="containerForm__logo__image">
        </div>
        <div class="containerError__content">
          <div class="error_form">
            <p class="error_title">¡ERROR 404!</p>
            <p class="error_descripcion">Lo sentimos, no podemos encontrar la página que estás buscando. </p>
            <p class="error_razones">Posibles razones:</p>
            <ul class="error_lista">
              <li>La dirección podría estar escrita incorrectamente.</li>
              <li>El link podría estar caído.</li>
            </ul>
            <div class="error_button">
              <button class="button_apikey" id="button__back">Volver a Inicio</button>
            </div>
          </div>
          <img src="../img/Machu-Picchu - Error.svg" alt="Error_img" class="error_img">
        </div>
      </div>
  `;

  errorView.querySelector("#button__back").addEventListener("click", () => {
    navigateTo("/", {});
  });

  errorView.querySelector(".containerForm__logo__image").addEventListener("click", () => {
    navigateTo("/", {});
  });

  return errorView;
}

  