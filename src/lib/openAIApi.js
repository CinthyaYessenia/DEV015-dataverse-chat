import { getApiKey } from "./apiKey.js";

export const communicateWithOpenAI = (messages) => {
  const APIKEY = getApiKey();

  if (!APIKEY) {
    return Promise.reject(new Error("API KEY no encontrada, por favor ingrese una API KEY desde el botón Api."));
  }
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        switch (response.status) {
        case 400:
          throw new Error("Solicitud incorrecta: " + response.statusText);
        case 401:
          throw new Error("No autorizado: " + response.statusText);
        case 403:
          throw new Error("Prohibido: " + response.statusText);
        case 404:
          throw new Error("No encontrado: " + response.statusText);
        case 429:
          throw new Error("Demasiadas solicitudes: " + response.statusText);
        case 500:
          throw new Error("Error interno del servidor: " + response.statusText);
        case 502:
          throw new Error("Puerta de enlace incorrecta: " + response.statusText);
        case 503:
          throw new Error("Servicio no disponible: " + response.statusText);
        case 504:
          throw new Error("Tiempo de espera de la puerta de enlace: " + response.statusText);
        default:
          throw new Error("Error en la petición a OpenAI: " + response.statusText);
        }
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};