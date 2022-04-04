const possibleParams = {
  body_id: 'body_id',
  marka_id: 'marka_id',
  model_id: 'model_id',
  yers: 'year',
  state_id: 'state_id',
  damage: 'damage',
  custom: 'abroad',
  gear_id: 'gear_id',
  fuel_id: 'fuel_id',
};

module.exports = (body) => {
  const formatedParams = Object.entries(body)
    .filter((param) => possibleParams[param[0]])
    .map((param) =>  possibleParams[param[0]] + '=' + param[1])
    .join(' and ');
  return `select year(publication_date) as year, month(publication_date) as month, avg(price) as avg from vehicle where date(publication_date) between date_sub(curdate(), interval 51 month) and date_sub(curdate(), interval 0 month) and ${formatedParams} group by year(publication_date), month(publication_date)`;
};
