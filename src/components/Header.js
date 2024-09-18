import { Nav } from "./nav.js";

export const BaseHeader = () => {
  // Crear el elemento header
  const headerEl = document.createElement('header');
  headerEl.classList.add("header");

  headerEl.innerHTML = `
        <div class="header_titulo">
            <h1> Descubre los mejores lugares en Perú</h1>
            <p>Explora la belleza y riqueza cultural del Perú a través de nuestra página web dedicada a los lugares turísticos
            más impresionantes del país. Desde las majestuosas ruinas de Machu Picchu hasta la vibrante vida urbana de Lima,
            nuestro sitio te ofrece una guía completa de los destinos más emblemáticos y las joyas ocultas que Perú tiene para
            ofrecer.
            </p>
        </div>
        <div class="header_select">
            <select name="select" id="filterRegion">
                <option value="" disabled selected>Región</option>
                <option value="" disabled>----------</option>
                <option value="Costa">Costa</option>
                <option value="Sierra">Sierra</option>
                <option value="Selva">Selva</option>
            </select>
            <select name="select" id="filterDepartamento">
                <option value="" disabled selected>Departamento</option>
                <option value="" disabled>--------------------</option>
                <option value="Amazonas">Amazonas</option>
                <option value="Áncash">Áncash</option>
                <option value="Apurímac">Apurímac</option>
                <option value="Arequipa">Arequipa</option>
                <option value="Ayacucho">Ayacucho</option>
                <option value="Cajamarca">Cajamarca</option>
                <option value="Callao">Callao</option>
                <option value="Cusco">Cusco</option>
                <option value="Huancavelica">Huancavelica</option>
                <option value="Huánuco">Huánuco</option>
                <option value="Ica">Ica</option>
                <option value="Junín">Junín</option>
                <option value="La Libertad">La Libertad</option>
                <option value="Lambayeque">Lambayeque</option>
                <option value="Lima">Lima</option>
                <option value="Loreto">Loreto</option>
                <option value="Madre de Dios">Madre de Dios</option>
                <option value="Moquegua">Moquegua</option>
                <option value="Pasco">Pasco</option>
                <option value="Piura">Piura</option>
                <option value="Puno">Puno</option>
                <option value="San Martín">San Martín</option>
                <option value="Tacna">Tacna</option>
                <option value="Tumbes">Tumbes</option>
                <option value="Ucayali">Ucayali</option>
            </select>
            <select name="select" id="filterOrdenar">
                <option value="" disabled selected>Ordenar</option>
                <option value="" disabled>-----------</option>
                <option value="Ascendente">A-Z</option>
                <option value="Descendente">Z-A</option>
            </select>
            <input type="text" id="searchInput" placeholder="Buscar" name="nombre" />
            <button id="reset-button">Limpiar</button>
        </div>
    `;

  headerEl.insertBefore(Nav(), headerEl.firstChild);
  return headerEl;

}

