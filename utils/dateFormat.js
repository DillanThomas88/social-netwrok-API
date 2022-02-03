const addDateSuffix = date => {
  let dates = date.toString();

  // get last char of date string
  const lastChar = dates.charAt(dates.length - 1);

  if (lastChar === '1' && dates !== '11') {
    dates = `${dates}st`;
  } else if (lastChar === '2' && dates !== '12') {
    dates = `${dates}nd`;
  } else if (lastChar === '3' && dates !== '13') {
    dates = `${dates}rd`;
  } else {
    dates = `${dates}th`;
  }

  return dates;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = (
  timestamp,
  { monthLength: length = 'short', dateSuffix = true } = {}
) => {
  let months;

  if (length === 'short') {
    months = {
      0: 'Jan',1: 'Feb',2: 'Mar',3: 'Apr',4: 'May',5: 'Jun',6: 'Jul',7: 'Aug',8: 'Sep',9: 'Oct',10: 'Nov',11: 'Dec'};
  } else {
    months = {
      0: 'January',1: 'February',2: 'March',3: 'April',4: 'May',5: 'June',6: 'July',7: 'August',8: 'September',9: 'October',10: 'November',11: 'December'};
  }

  const dateObj = new Date(timestamp);
  const formalMonth = months[dateObj.getMonth()];

  let day;

  if (dateSuffix) {
    day = addDateSuffix(dateObj.getDate());
  } else {
    day = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  let hour;
  // check for 24-hr time
  if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }
  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = dateObj.getMinutes();

  // set `am` or `pm`
  let amPM;

  if (dateObj.getHours() >= 12) {
    amPM = 'pm';
  } else {
    amPM = 'am';
  }

  const formalDate = `${formalMonth} ${day}, ${year} at ${hour}:${minutes} ${amPM}`;

  return formalDate;
};
