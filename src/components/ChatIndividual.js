import data from '../data/dataset.js'; // Importa el dataset de donde se extraerán los datos del lugar turístico
import { communicateWithOpenAI } from "../lib/openAIApi.js"; // Importa la función para comunicarte con la API de OpenAI
import { navigateTo } from "../router.js"; // Importa la función de navegación para cambiar de ruta

const defaultImagePath = 'img/defaultImage.png'; // Define la ruta por defecto para la imagen del lugar turístico

// Exporta la función LugarTuristicoIndividual, que recibe un id para identificar el lugar turístico
export const LugarTuristicoIndividual = ({ id }) => {
  // Desestructuramos los datos del dataset en base al id recibido
  const { name, imageUrl = defaultImagePath, shortDescription, description, facts = {} } = data.find(item => item.id === id) || {};
  const { Departamento = '', Región = '' } = facts; // Desestructuramos facts con valores por defecto

  // Crear un contenedor para el chat o la descripción interactiva
  const containerInfo = document.createElement("div");
  containerInfo.classList.add("lugarTuristicoIndividual"); // Añade la clase lugarTuristicoIndividual al contenedor
  // Estructura HTML: incluye título, imagen y campo de texto para mensajes o información adicional
  containerInfo.innerHTML = `
    <div class="info__title">
      <img class="info__title__arrow" src="../img/arrow_back.svg" alt="back arrow"/>
      <div class="info__title__text"> 
        <div class="info_details">
          <h1 class="info__details__name">${name}</h1>
          <span class="info__details__location">${Departamento}, ${Región}</span>
        </div>
      </div>
    </div>
    <div class="overflow">
      <div class="info__description">
        <img class="info__image" src="${imageUrl}" alt="Image of ${name}"/>
        <div class="info__description__text">Hola, bienvenido a ${name}. ${shortDescription}</div>
      </div>
    </div>
    <div class="info__input">
      <textarea class="info__input__field" placeholder="Escribe una pregunta sobre este lugar..."></textarea>
      <button class="info__input__button">
        <span class="material-symbols-outlined">arrow_upward_alt</span>
      </button>
    </div>
  `;

  // Añade evento al ícono de "regresar", que navega a la página principal
  containerInfo.querySelector(".info__title__arrow").addEventListener("click", () => navigateTo("/", {}));

  const inputField = containerInfo.querySelector(".info__input__field"); // Campo de entrada de mensajes del usuario
  const infoContainer = containerInfo.querySelector(".overflow"); // Contenedor de mensajes o descripciones

  // Función para agregar mensajes al chat o información adicional
  const addMessageToInfo = (message, role) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add(role === "user" ? "info__send" : "info__reply");
    messageElement.innerHTML = `
      ${role === "user" ? `<div class="info__message__text">${message}</div>` : `
        <img class="info__message__image" src="${imageUrl}" alt="Image of ${name}"/>
        <div class="info__reply__text">${message}</div>`} 
    `;
    infoContainer.appendChild(messageElement); // Agrega el mensaje al contenedor
    infoContainer.scrollTop = infoContainer.scrollHeight; // Desplaza el contenido hacia abajo para mostrar el último mensaje
  };

  // Función para enviar el mensaje del usuario y obtener una respuesta de OpenAI
  const sendMessage = async () => {
    const userMessage = inputField.value.trim(); // Obtiene el mensaje del usuario y elimina espacios en blanco
    if (!userMessage) return; // Si el mensaje está vacío, no hace nada

    addMessageToInfo(userMessage, "user"); // Agrega el mensaje del usuario
    inputField.value = ""; // Limpia el campo de texto después de enviar

    try {
      // Llama a la API de OpenAI para obtener una respuesta basada en el lugar turístico
      const response = await communicateWithOpenAI([
        { role: "system", content: `Asume el rol de un guía turístico del lugar ${name}, ubicado en ${Departamento}, ${Región}. La descripción es la siguiente: ${description}.` },
        { role: "user", content: userMessage } // Envía el mensaje del usuario como parte de la conversación
      ]);
      const assistantMessage = response.choices[0].message.content; // Obtiene la respuesta de OpenAI
      addMessageToInfo(assistantMessage, "tech"); // Muestra la respuesta en el chat
    } catch (error) {
      addMessageToInfo(`Lo siento, no pude responder. ${error}`, "tech"); // Muestra un mensaje de error si OpenAI falla
    }
  };

  // Evento para enviar mensaje al presionar la tecla Enter
  inputField.addEventListener("keydown", (event) => event.key === "Enter" && sendMessage());
  // Evento para enviar mensaje al hacer clic en el botón de enviar
  containerInfo.querySelector(".info__input__button").addEventListener("click", sendMessage);

  return containerInfo; // Retorna el contenedor completo de la información
};
