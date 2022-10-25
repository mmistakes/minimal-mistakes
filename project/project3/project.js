const currencyRatio = {
  USD: {
    KRW: 1433.25,
    USD: 1,
    VND: 24852.50,
    unit: "달러"
  },
  KRW: {
    KRW: 0.00070,
    USD: 1,
    VND: 17.34,
    unit: "원"
  },
  VND: {
    KRW: 0.058,
    USD: 0.000040,
    VND: 1,
    unit: "동"
  },
};

let unitWords = ["", "만", "억", "조", "경"];
let splitUnit = 10000;
let tobtn = document.getElementById("to-btn")
let frombtn = document.getElementById("form-btn");
let fromCurrency = 'USD'
let toCurrency = 'KRW'

document
  .querySelectorAll("#from-currency-list a")
  .forEach(menu => menu.addEventListener("click", function(){
    document.getElementById('from-btn').textContent=this.textContent;
    fromCurrency = this.textContent
    convert("from")
  })
);

document
  .querySelectorAll("#to-currency-list a")
  .forEach(menu => menu.addEventListener("click", function(){
    document.getElementById('to-btn').textContent = this.textContent;
    toCurrency = this.textContent;
    convert("from")
  })
);

function convert(type){
  let amount = 0;
  if (type == "from") {
    amount = document.getElementById("from-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency]
    document.getElementById("to-input").value = convertedAmount
    renderKoreanNumber(amount, convertedAmount);
} else {
    amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("from-input").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}

function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
  readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent = 
  readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}
