/* This file includes helper functions which can be helpful in any component */

function addLeadingZeroes(stringToModify, length) {
  let stringCopy = stringToModify.slice();
  while (stringCopy.length < length) {
    stringCopy = "0" + stringCopy;
  }
  return stringCopy;
}

function dateToJSONFormat(date) {
  return date.toISOString().split("T")[0] + " " + date.toISOString().split("T")[1].split(".")[0];
}

export { addLeadingZeroes, dateToJSONFormat };