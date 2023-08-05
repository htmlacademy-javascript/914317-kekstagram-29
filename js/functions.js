const checkStringLength = (stringForLengthCheck, maxLength) => stringForLengthCheck.length < maxLength;

const isPalindrome = (stringForPalindromeCheck) => {
  let backString = '';
  stringForPalindromeCheck = stringForPalindromeCheck.replaceAll(' ', '').toLowerCase();
  for (let i = stringForPalindromeCheck.length - 1; i >= 0; i--) {
    backString += stringForPalindromeCheck[i];
  }
  return stringForPalindromeCheck === backString;
};

const returnNumber = (enterString) => {

  let stringNumber = '';
  let currentSymbol;

  enterString = enterString.toString();
  for (let i = 0; i <= enterString.length - 1; i++) {
    currentSymbol = parseInt(enterString[i], 10);
    if (!Number.isNaN(currentSymbol)) {
      stringNumber += currentSymbol;
    }
  }

  return stringNumber === '' ? NaN : Number(stringNumber);
};

const returnDate = (dateString) => {
  const dateArray = dateString.split(':');
  return new Date(1, 1, 1, parseInt(dateArray[0], 10), parseInt(dateArray[1], 10), 0);
};

const isMeetingWithinWorkingDay = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {

  const workStartDate = returnDate(workDayStart);
  const workEndDate = returnDate(workDayEnd);
  const meetingStartDate = returnDate(meetingStart);

  const meetingEnd = returnDate(meetingStart);
  meetingEnd.setMinutes(meetingEnd.getMinutes() + meetingDuration);

  return meetingStartDate >= workStartDate && workEndDate >= meetingEnd;

};

checkStringLength('kek',9);
isPalindrome('kek');
isMeetingWithinWorkingDay('9:00','18:00','14:30',65);

export { returnNumber, checkStringLength };
