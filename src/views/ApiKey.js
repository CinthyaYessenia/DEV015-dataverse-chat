import { navigateTo } from "../router.js";
import { setApiKey, getApiKey } from "../lib/apiKey.js";

// Función que crea la vista de la interfaz de usuario para gestionar la clave API
export function ApiKey() {
  // Crear un elemento div como contenedor principal
  const apiKeyView = document.createElement("div");
  apiKeyView.classList.add("apiKey");

  // Cambiar el título de la página del navegador
  document.title = "ApiKey";

  // Insertar el HTML que conforma la estructura visual de la interfaz
  apiKeyView.innerHTML = `
      <div class="containerForm">
        <div class="containerForm__logo">
            <img src="../img/logo.svg" alt="Logo-ciressa" class="containerForm__logo__image" draggable="false">
        </div>
        <div class="containerForm__form">
          <div class="form__img">
            <img src="../img/Perú welcome - Apikey.svg" alt="peru-img" class="peru_img" draggable="false">
          </div>
          <div class="form__input">
            <div class="div_key">
              <img src="../img/key.svg" class="key_img" alt="key" draggable="false">
            </div>
            <p class="containerForm__description">Conversa con habitantes de tu lugar favorito. Ingresa tu API KEY y descubre mucho más sobre el Perú.</p>
            <input type="text" class="containerForm__input" id="apikey" placeholder="    Ingresa tu API KEY" required/>
            <div class="containerForm__button">
                <button class="button_apikey" id="button__clear">Limpiar</button>
                <button class="button_apikey" id="button__save">Guardar</button>
            </div>
            <button class="button_apikey" id="button__back">Volver a Inicio</button>
            <div class="containerForm__link">
                <p class="containerForm__link__text">¿Aún no tienes tu ApiKey?</p>
                <a class="containerForm__link__open" href="https://openai.com/" target="_blank">Genera tu ApiKey</a>
            </div>
          </div>
        </div>
      </div>
  `;

  // Utilizamos setTimeout para ejecutar el código de manera asíncrona y permitir que el DOM se cargue completamente
  setTimeout(() => {
    // Obtener referencias a los elementos del DOM necesarios para la interactividad
    const inputElement = document.getElementById("apikey");
    const buttonSave = document.getElementById("button__save");
    const buttonBack = document.getElementById("button__back");
    const buttonClear = document.getElementById("button__clear");
    const containerForm = document.querySelector(".form__input");

    // Verificar que los elementos necesarios existan; si no, salir de la función
    if (!containerForm || !inputElement) {
      return;
    }

    // Crear un elemento span para mostrar mensajes de estado relacionados con la clave API
    const inputMessage = document.createElement("span");
    inputMessage.classList.add("input__message");
    containerForm.insertBefore(inputMessage, inputElement);

    // Función para enmascarar la clave API, mostrando solo los primeros y últimos 3 caracteres
    const updateMaskedApiKey = (apiKey) => {
      return `${apiKey.slice(0, 3)}${"•".repeat(apiKey.length - 6)}${apiKey.slice(-3)}`;
    };

    // Obtener la clave API almacenada, si existe, y mostrarla en el campo de entrada (enmascarada)
    let APIKEY = getApiKey();
    if (APIKEY) {
      inputElement.value = updateMaskedApiKey(APIKEY);
    }

    // Agregar un evento al botón "Guardar" para manejar la lógica de guardar la clave API
    buttonSave.addEventListener("click", () => {
      // Obtener el valor del campo de entrada
      APIKEY = inputElement.value;

      // Verificar si la clave tiene al menos 10 caracteres
      if (APIKEY.length >= 10) {
        // Si la clave es válida, guardarla y mostrar un mensaje de éxito
        setApiKey(APIKEY);
        inputElement.value = updateMaskedApiKey(APIKEY);
        inputMessage.textContent = "¡API key guardada con éxito!";
      } else {
        // Si la clave es demasiado corta, mostrar un mensaje de error
        inputMessage.textContent = `La API key debe tener al menos 10 caracteres.`;
      }
    });

    // Agregar un evento al botón "Borrar" para eliminar la clave API almacenada y limpiar el campo de entrada
    buttonClear.addEventListener("click", () => {
      localStorage.removeItem("APIKEY");
      inputElement.value = "";
      inputMessage.textContent = "¡API key borrada con éxito!";
    });

    // Agregar un evento al botón "Volver a Inicio" para redirigir a la página de inicio
    buttonBack.addEventListener("click", () => {
      navigateTo("/", {});
    });

    apiKeyView.querySelector(".containerForm__logo__image").addEventListener("click", () => {
      navigateTo("/", {});
    });
  }, 0);

  // Devolver el contenedor principal que se generó con el HTML para que se muestre en la interfaz de usuario
  return apiKeyView;
}
