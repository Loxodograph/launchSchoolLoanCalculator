const MESSAGES = require('./loan_calculator_messages.json');
const READLINE = require('readline-sync');
const CONTINUE_RESPONSES = ['yes', 'no', 'y', 'n', 'sim', 'não', 's', 'n'];
const ALLOWED_LANGUAGES = ['en', 'pt'];
let language = "en";

//function to choose which language the program runs in
function chooseLanguage() {
  prompt("languageChoice");
  let choiceOfLanguage = READLINE.question();
  while (!invalidLanguage(choiceOfLanguage)) {
    prompt("invalidLanguage");
    choiceOfLanguage = READLINE.question();
    console.clear();
  }
  language = choiceOfLanguage;
}

//if language choice is invalid
function invalidLanguage(languageChoice) {
  return ALLOWED_LANGUAGES.includes(languageChoice);
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
   Number(number) <= 0;
}

function chooseNumber() {
  let number = READLINE.question();

  while (invalidNumber(number)) {
    prompt("invalidNumber");
    number = READLINE.question();
    console.clear();
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

  let monthlyPaymentDue = calculateMonthlyPayment(
    loanAmount, monthlyInterestRate, loanDuration);

  displayCalculation(monthlyPaymentDue);
}

function calculateMonthlyPayment(loanTotal, interestRate, duration) {
  let monthlyPayment = loanTotal *
  (interestRate / (1 - Math.pow((1 + interestRate), (-duration))));
  return monthlyPayment;
}

function displayCalculation(calculation) {
  prompt("monthlyPayment", calculation.toFixed(2));
}

function performAnotherCalculation() {
  let answer = READLINE.question().toLowerCase();
  while (!CONTINUE_RESPONSES.includes(answer.toLowerCase())) {
    prompt('yOrN');
    answer = READLINE.question().toLowerCase();
  }
  if ((CONTINUE_RESPONSES.indexOf(answer.toLowerCase()) % 2) > 0) {
    return false;
  }
  return true;
}

//calculator run loop
prompt("welcome");
prompt("emptyLine");
chooseLanguage();
while (true) {
  //clear console and then run calculator
  console.clear();
  runCalculator();

  prompt("anotherCalculation");
  if (!performAnotherCalculation()) {
    prompt("goodbye");
    break;
  }
}