const MESSAGES = require('./loan_calculator_messages.json');
const READLINE = require('readline-sync');
let language = "en";

//function to choose which language the program runs in
function chooseLanguage() {
  prompt("languageChoice");
  let choiceOfLanguage = READLINE.question();
  while (!invalidLanguage(choiceOfLanguage)) {
    prompt("invalidLanguage");
    choiceOfLanguage = READLINE.question();
  }
  language = choiceOfLanguage;
}

//if language choice is invalid
function invalidLanguage(languageChoice) {
  return languageChoice === "pt" || languageChoice === "en";
}

function messages(message, lang = "en") {
  return MESSAGES[lang][message];
}


function prompt(key, variable = "") {
  let message = messages(key, language);
  console.log(`=> ${message} ${variable}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" ||
   Number.isNaN(Number(number)) ||
   Number(number) < 0;
}

function chooseNumber() {
  let number = READLINE.question();

  while (invalidNumber(number)) {
    prompt("invalidNumber");
    number = READLINE.question();
  }
  return number;
}

function runCalculator() {
  prompt("emptyLine");
  //prompts to get values
  prompt("loanAmount");
  let loanAmount = Number(chooseNumber());

  prompt("monthlyInterestRate");
  let monthlyInterestRate = (Number(chooseNumber()) / 100) / 12;

  prompt("loanDuration");
  let loanDuration = Number(chooseNumber(), 10) * 12;

  let monthlyPaymentDue = calculateLoan(
    loanAmount, monthlyInterestRate, loanDuration);

  return monthlyPaymentDue;
}

function calculateLoan(loanTotal, interestRate, duration) {
  let monthlyPayment = loanTotal *
  (interestRate / (1 - Math.pow((1 + interestRate), (-duration))));
  return monthlyPayment;
}

function displayCalculation(calculation) {
  return prompt("monthlyPayment", calculation.toFixed(2));
}

//calculator run loop
prompt("welcome");
prompt("emptyLine");
chooseLanguage();

while (true) {
  //clear console and then run calculator
  console.clear();
  displayCalculation(runCalculator());

  prompt("anotherCalculation");
  let answer = READLINE.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y' && answer[0] !== 's') {
    prompt('yOrN');
    answer = READLINE.question().toLowerCase();
  }
  if (answer[0] === 'n') {
    prompt("goodbye");
    break;
  }
}