//this function will convert the date.now to a string formated to mm/dd/yy at hh:mm
function dateToString(timestamp) {
  const date = new Date(timestamp);
  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };
  const formattedDate = date.toLocaleString(undefined, options);
  
  return formattedDate;
}
  
module.exports = dateToString;

  
  