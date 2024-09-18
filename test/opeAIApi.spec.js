import { communicateWithOpenAI } from "../src/lib/openAIApi.js";
import { getApiKey } from "../src/lib/apiKey.js";

// Mocking the getApiKey function
jest.mock("../src/lib/apiKey", () => ({
  getApiKey: jest.fn(),
}));

describe("communicateWithOpenAI", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reiniciar los mocks antes de cada test
    global.fetch = jest.fn(); // Reiniciar global.fetch antes de cada test
  });

  it("debería rechazar con un error si no hay API key", async () => {
    getApiKey.mockReturnValue(null); // Mock de getApiKey para devolver null

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "API KEY no encontrada, por favor ingrese una API KEY desde el botón Api."
    );
  });

  it("debería manejar errores de red", async () => {
    getApiKey.mockReturnValue("valid-api-key"); // Mock de una API Key válida
    global.fetch.mockRejectedValue(new Error("Network error")); // Simular un error de red

    await expect(communicateWithOpenAI([])).rejects.toThrow("Network error");
  });

  it("debería manejar una respuesta 400 (Bad Request)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    }); // Simular una respuesta 400 Bad Request

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Solicitud incorrecta: Bad Request"
    );
  });

  it("debería manejar una respuesta 401 (Unauthorized)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    }); // Simular una respuesta 401 Unauthorized

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "No autorizado: Unauthorized"
    );
  });

  it("debería manejar una respuesta 403 (Forbidden)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    }); // Simular una respuesta 403 Forbidden

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Prohibido: Forbidden"
    );
  });

  it("debería manejar una respuesta 404 (Not Found)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }); // Simular una respuesta 404 Not Found

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "No encontrado: Not Found"
    );
  });

  it("debería manejar una respuesta 429 (Too Many Requests)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
    }); // Simular una respuesta 429 Too Many Requests

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Demasiadas solicitudes: Too Many Requests"
    );
  });

  it("debería manejar una respuesta 500 (Internal Server Error)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    }); // Simular una respuesta 500 Internal Server Error

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Error interno del servidor: Internal Server Error"
    );
  });

  it("debería manejar una respuesta 502 (Bad Gateway)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
    }); // Simular una respuesta 502 Bad Gateway

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Puerta de enlace incorrecta: Bad Gateway"
    );
  });

  it("debería manejar una respuesta 503 (Service Unavailable)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    }); // Simular una respuesta 503 Service Unavailable

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Servicio no disponible: Service Unavailable"
    );
  });

  it("debería manejar una respuesta 504 (Gateway Timeout)", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 504,
      statusText: "Gateway Timeout",
    }); // Simular una respuesta 504 Gateway Timeout

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Tiempo de espera de la puerta de enlace: Gateway Timeout"
    );
  });

  it("debería manejar cualquier tipo de error en la respuesta", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: false,
      status: 505,
      statusText: "HTTP Version Not Supported",
    }); // Simular una respuesta 505 HTTP Version Not Supported

    await expect(communicateWithOpenAI([])).rejects.toThrow(
      "Error en la petición a OpenAI: HTTP Version Not Supported"
    );
  });

  it("debería resolver con datos JSON si fetch es exitoso", async () => {
    getApiKey.mockReturnValue("valid-api-key");
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    }); // Simular una respuesta exitosa de fetch

    const data = await communicateWithOpenAI([]);
    expect(data).toEqual({ success: true });
  });
});
