const formatDate = date => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Add 0 for single digit hours
  if (hours >= 0 && hours < 10) {
    hours += '0';
  }

  // Add 0 for single digit minutes
  if (minutes >= 0 && minutes < 10) {
    minutes += '0';
  }

  const formattedDate = `${day}.${month}.${year} ${hours}.${minutes}`;
  return formattedDate;
};

export default formatDate;
