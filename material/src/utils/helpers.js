/* Put all the helpers here */

function getTwoDigitNumber(num){
  // stupid function, have to use moment in the project now
  if(num.toString().length<2){
    return "0" + num;
  }
  return num;
}

// EXAMPLES

/* Convert Date to HTML input date value */
export function convertDateToHTMLInputDateValue(date){
  let d = new Date(date);
  return (
    d.getFullYear() + '-' +
    getTwoDigitNumber(parseInt(d.getMonth()+1)) + '-' +
    getTwoDigitNumber(parseInt(d.getDate()+1))
    );
}
