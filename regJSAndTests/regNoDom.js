var textBoxRef = document.querySelector(".textBox");
var addBtnRef = document.querySelector(".addBtn");
var outputRef = document.querySelector(".regList");
var errorRef = document.querySelector(".error");
var addShowBtnRef = document.querySelector(".addShowBtn");
var viewAllRef = document.querySelector(".addView");
var resetRef = document.querySelector(".reset");

var myVar;
var dataFromLocal;
var newList = [];
var existingReg = dataFromLocal || {};

var regInstance = registration(dataFromLocal);

if (localStorage['reg']) {

    existingReg = JSON.parse(localStorage['reg']);

    h = Object.keys(existingReg);

    h.forEach(function (element) {
        var regPlate = document.createElement("span");
        regPlate.innerHTML = element;
        document.body.appendChild(regPlate);
    });
}

function setTimer() {
    myVar = setTimeout(function () {
        errorRef.innerHTML = null;
    }, 2000);
}

function regNumber() {
    var regNo = textBoxRef.value;

    setTimer();

    if (regNo == null || regNo.length < 4 || regNo.length > 10) {

        errorRef.classList.add('danger');
        errorRef.innerHTML = regInstance.errors(regNo);
    }

    if (existingReg[regNo] == 0) {
        errorRef.innerHTML = "You have already entered this registration number";
        errorRef.classList.add('danger');
    }
    else if (existingReg[regNo] === undefined && regNo.startsWith('CA') || regNo.startsWith('CJ') || regNo.startsWith('CK')) {
        var regPlate = document.createElement("span");
        existingReg[regNo] = 0;

        regPlate.innerHTML = regInstance.regList(regNo);

        document.body.appendChild(regPlate);

        localStorage['reg'] = JSON.stringify(existingReg);
    }
    else {
        errorRef.innerHTML = regInstance.errors(regNo);
        errorRef.classList.add('danger');
        regPlate.innerHTML = null;
    }
    regNo.value = null;
}

function showBtn(existingReg) {

    var elem = document.getElementsByTagName("span"), index;

    for (index = elem.length - 1; index >= 0; index--) {
        elem[index].parentNode.removeChild(elem[index]);
    }

    setTimer();
    var radio = document.querySelector("input[name='langRadioBtn']:checked");

    if (!radio) {
        errorRef.classList.add('danger');
        errorRef.innerHTML = "Please choose a town";
    }

    if (radio) {

        var langValue = radio.value;

        radio.checked = false;

        if (localStorage['reg']) {

            existingReg = JSON.parse(localStorage['reg']);

            h = Object.keys(existingReg);

            h.forEach(function (element) {
                if (element.startsWith(langValue)) {
                    var regPlate = document.createElement("span");
                    regPlate.innerHTML = element;
                    document.body.appendChild(regPlate);
                }
            });
        }
    }
}

function viewAll(){
    var elem = document.getElementsByTagName("span"), index;

    for (index = elem.length - 1; index >= 0; index--) {
        elem[index].parentNode.removeChild(elem[index]);
    }
    if (localStorage['reg']) {
        existingReg = JSON.parse(localStorage['reg']);
        h = Object.keys(existingReg);
        h.forEach(function (element) {
            var regPlate = document.createElement("span");
            regPlate.innerHTML = element;
            document.body.appendChild(regPlate);
        });
    }
}

function reset(){
    var elem = document.getElementsByTagName("span"), index;

    for (index = elem.length - 1; index >= 0; index--) {
        elem[index].parentNode.removeChild(elem[index]);
    }

    localStorage.clear();
    location.reload();
}

addBtnRef.addEventListener('click', regNumber);
addShowBtnRef.addEventListener('click', showBtn);
viewAllRef.addEventListener('click',viewAll);
resetRef.addEventListener('click',reset)