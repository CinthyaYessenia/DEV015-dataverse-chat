export const renderItems = (data) => {
  console.log(data)
  // Aquí comienza tu código y puedes retornar lo que tu necesites
  const list = document.createElement('ul');
  list.className = 'container';
  data.forEach(element => {
    const listItem = document.createElement('li')
    listItem.className = 'tarjetas'
    listItem.innerHTML = ` <img src=${element.imageUrl}>
    <ul class="ul_tarjeta"> 
    <li><div class="titulo"><b>${element.name}</b></div> </li>
    <li><div>${element.shortDescription}</div> </li>
    <li><div>${element.description}</div></li> <br>
    <li><div><b>Departamento: </b>${element.facts.Departamento}</div> </li> 
    <li><div><b>Región: </b>${element.facts.Región}</div> </li>
    </ul>`
    list.appendChild(listItem)
  });
  return list;
}


