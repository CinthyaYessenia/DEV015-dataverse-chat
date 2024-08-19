
export const filterData = (data, filterBy, value) => {
  return data.filter(item => item.facts[filterBy] === value);
};

export const filterInput = (data, nombreB) => {
  return data.filter(item => item.name.toLowerCase().includes(nombreB.toLowerCase()));
};

export function sortData(data, order){
  return data.sort((a, b) => {
    if (order === 'Ascendente'){
      return a.name.localeCompare(b.name);
    }
    else return b.name.localeCompare(a.name);
  })
} 