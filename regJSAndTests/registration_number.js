function registration() {

    var existingReg = {};
    var existingReg2 = {};
    var newList = [];
    let h;
    var newArr = [];
    var newArr1 = [];

    function errors(regNo) {
        if (regNo == null || regNo.length < 4) {
            return "Please enter valid registration number";
        }
        if (regNo.startsWith('CA') || regNo.startsWith('CJ') || regNo.startsWith('CK')) {
            return null;
        }

        else return "Please enter valid registration number";

    }

    function regList(regNo) {
        var regNo = regNo.toUpperCase();

        if (regNo == null || regNo.length < 4 || regNo.length > 10) {
            // return null;
        }
        else if (existingReg[regNo] === undefined && regNo.startsWith('CA') || regNo.startsWith('CJ') || regNo.startsWith('CK')) {
            existingReg[regNo] = 0;
            return regNo;
        }

        else if (existingReg[regNo] == 0) {
            // return null;
        }

        else {
            existingReg2[regNo] = {};
            // return null;
        }

    }

    function getReg() {
        return existingReg;
    }

   
    function filterTown(townString) {
         h = Object.keys(existingReg);

        var newList = h.toString().split(',');

        for (var i = 0; i < newList.length; i++) {
            var anotherNewList = newList[i].trim();
            if (anotherNewList.startsWith(townString)) {

                newArr.push(anotherNewList);
            }

            else if(!anotherNewList.startsWith(townString)){
                newArr1.push(anotherNewList);
            }
            else return null;
        }
    }

    function getKeys() {
        return Object.keys(existingReg);
    
        }
    

    function getArr() {
        return newArr;
    }
    function getList() {

    }

    return {

        errors,
        regList,
        getReg,
        getKeys,
        filterTown,
        getList,
        getArr,
    }
}