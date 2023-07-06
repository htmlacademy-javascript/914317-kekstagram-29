function checkStringLength (stringForLengthCheck,maxLength){
  return stringForLengthCheck.length > maxLength ? false : true;
}

function isPalindrome (stringForPalindromeCheck){
  let backString = '';
  stringForPalindromeCheck = stringForPalindromeCheck.replaceAll(' ','').toLowerCase();
  for (let i = stringForPalindromeCheck.length - 1; i >= 0; i--){
    backString += stringForPalindromeCheck[i];
  }
  return stringForPalindromeCheck === backString ? true : false;
}

function returnNumber(enterString){

  let stringNumber = '';
  let currentSymbol;

  enterString = enterString.toString();
  for (let i = 0; i <= enterString.length - 1; i++){
    currentSymbol = parseInt(enterString[i],10);
    if (!Number.isNaN(currentSymbol)){
      stringNumber += currentSymbol;
    }
  }

  return stringNumber === '' ? NaN : Number(stringNumber);
}
