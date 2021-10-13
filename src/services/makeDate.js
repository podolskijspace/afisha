const makeDate = (date) => {
  date = new Date(date);

  let year = date.getFullYear(),
      month = (date.getMonth() + 1) + '',
      day = date.getDay() + '';

  if (!day[1]) {
    day = '0' + day;
  }
  if (!month[1]) {
    month = '0' + month;
  }

  return `${day}.${month}.${year}`;
}

export default makeDate;