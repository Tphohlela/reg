var textBoxRef = document.querySelector(".textBox");
var addBtnRef = document.querySelector(".addBtn");
var outputRef = document.querySelector(".regList");
var errorRef = document.querySelector(".error");
var addShowBtnRef = document.querySelector(".addShowBtn");

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

function myFunction() {
    myVar = setTimeout(function () {
        errorRef.innerHTML = null;
    }
        , 2000);
}

function regNumber() {
    var regNo = textBoxRef.value;

    localStorage.clear();

    myFunction();

    if (regNo == null || regNo.length < 4 || regNo.length > 10) {

        errorRef.classList.add('danger');
        errorRef.innerHTML = regInstance.errors(regNo);
    }

    if (existingReg[regNo] == 0) {
        errorRef.innerHTML = "You have already entered this registration number";
        errorRef.classList.add('danger');
        regPlate.innerHTML = null;

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

function showBtn() {

    myFunction();

    var regNo = textBoxRef.value;

    var radio = document.querySelector("input[name='langRadioBtn']:checked");

    if (!radio) {

        errorRef.classList.add('danger');
        errorRef.innerHTML = "Please choose a town";
    }

    // if (radioBtnEng) {

    //     var langValue = radioBtnEng.value;

    //     radioBtnEng.checked = false;
    //     emptyStringRef.classList.add('danger');  
    //     emptyStringRef.innerHTML = greetingsInstance.errors(name,langValue);


    //     helloPlusName.innerHTML = greetingsInstance.greetings1(name,langValue)

    //     localStorage['names'] = JSON.stringify(namesGreeted);
    //     var list = Object.keys(dataFromLocal).length;
    //     counterRef.innerHTML = list;
    //     succesGreetingRef.classList.add('success')
    //     succesGreetingRef.innerHTML = greetingsInstance.successGreeting(name);

    // }
    regPlate.innerHTML = regInstance.getArr(regNo);

}

addBtnRef.addEventListener('click', regNumber);
addShowBtnRef.addEventListener('click', showBtn);