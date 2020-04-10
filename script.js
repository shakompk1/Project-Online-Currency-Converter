//Переменные Валюты
let firstCurrency = "RUB";
let secondCurrency = "USD";

let objConvert;
//Переменные выбора валюты и inpute
let firstChooseCurrency = document.querySelectorAll('.converBlockOne .chooseCurrency input');
let firstMultiCurrency = document.querySelector('.converBlockOne select');

let secondChooseCurrency = document.querySelectorAll('.converBlockTwo .chooseCurrency input');
let secondMultiCurrency = document.querySelector('.converBlockTwo select');

let numberConverAdd = document.querySelector('#numberConverAdd')
let numberConverShow = document.querySelector('#numberConverShow')

let oneByOneConvert = document.querySelector('.oneByOneConvert');
let secondBySecondConvert = document.querySelector('.secondBySecondConvert');

let swap = document.querySelector('.swap');

//Ивенты перменных выбора валюты
firstChooseCurrency.forEach(event => {
    event.addEventListener('click', takeFirstCurrency);
});

firstMultiCurrency.addEventListener('change', takeFirstCurrency);

secondChooseCurrency.forEach(event => {
    event.addEventListener('click', takeSecondCurrency);
});
secondMultiCurrency.addEventListener('change', takeSecondCurrency);

numberConverAdd.addEventListener('click', inputOne);
numberConverShow.addEventListener('click', inputTwo)

swap.addEventListener('click', swaper)

takeCurrencyOnline()
//Функии для нахождение валюты и управление цветами
function takeFirstCurrency(event) {
    firstChooseCurrency.forEach(event => {
        event.classList.remove('ativebutton');
    });
    firstMultiCurrency.classList.remove('ativebutton');
    event.target.classList.add('ativebutton');
    firstCurrency = event.target.value;
    check();
};

function takeSecondCurrency(event) {
    secondChooseCurrency.forEach(event => {
        event.classList.remove('ativebutton');
    });
    secondMultiCurrency.classList.remove('ativebutton');
    event.target.classList.add('ativebutton');
    secondCurrency = event.target.value;
    check();
};
//Проверка валют
function check() {
    if (firstCurrency == secondCurrency) {
        numberConverShow.value = +numberConverAdd.value;
        converOneByOne(1);
    } else {
        takeCurrencyOnline();
    }
}
//Функция нахождения данных в интренете
function takeCurrencyOnline() {
    let numberConvert = fetch(`https://api.ratesapi.io/api/latest?base=${firstCurrency}&symbols=${secondCurrency}`)
    numberConvert.then((resolt) => resolt.json())
        .then(
            (result) => {
                objConvert = result;
                convertInputOne();
            }
        )
};
//Инпуты работают
function inputOne() {
    numberConverAdd.oninput = convertInputOne;
};
function inputTwo() {
    numberConverShow.oninput = convertInputTwo;
};
//Конвертация
function convertInputOne() {
    numberConverShow.value = +(numberConverAdd.value * ((objConvert.rates[secondCurrency] == undefined) ? 1 : objConvert.rates[secondCurrency])).toFixed(4);
    converOneByOne(objConvert.rates[secondCurrency]);
};
function convertInputTwo() {
    numberConverAdd.value = +(numberConverShow.value / ((objConvert.rates[secondCurrency] == undefined) ? 1 : objConvert.rates[secondCurrency])).toFixed(4);
    converOneByOne(objConvert.rates[secondCurrency]);
};
//Нижний текст
function converOneByOne(objConvert) {
    oneByOneConvert.innerHTML = `1 ${firstCurrency} = ${((objConvert == undefined) ? 1 : objConvert).toFixed(4)} ${secondCurrency}`;
    secondBySecondConvert.innerHTML = `1 ${secondCurrency} = ${(1 / objConvert).toFixed(4)}  ${firstCurrency}`;
}
//Свапает
function swaper() {
    let numbTwo = numberConverShow.value;
    let numbOne = numberConverAdd.value;

    numberConverAdd.value = numbTwo;
    numberConverShow.value = numbOne;

    let firstInfo = 0;
    let secondInfo = 0;
    firstChooseCurrency.forEach((item, i) => {
        if (item.classList.contains('ativebutton')) {
            firstInfo = i;
            item.classList.remove('ativebutton')
        }
    });
    secondChooseCurrency.forEach((item, i) => {
        if (item.classList.contains('ativebutton')) {
            secondInfo = i;
            item.classList.remove('ativebutton')

        }
    });
    firstChooseCurrency.forEach((item, i) => {
        if (i == secondInfo) {
            item.classList.add('ativebutton');
            firstCurrency = item.value;
        }
    });
    secondChooseCurrency.forEach((item, i) => {
        if (i == firstInfo) {
            item.classList.add('ativebutton');
            secondCurrency = item.value;
            check();
        }
    })
    console.log(firstInfo);
    console.log(secondInfo);
};
