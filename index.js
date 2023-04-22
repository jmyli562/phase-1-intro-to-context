// Your code here
function createEmployeeRecord(arr){
    const obj = {}

    obj.firstName = arr[0];
    obj.familyName = arr[1];
    obj.title = arr[2];
    obj.payPerHour = arr[3];
    obj.timeInEvents = [];
    obj.timeOutEvents = [];

    return obj;
}

function createEmployeeRecords(arr){
    let newArr = [];
    
    arr.map((records)=>{
        newArr.push(createEmployeeRecord(records));
    })

    return newArr;
}

function createTimeInEvent(obj, date){
    const newObj = {};
    newObj.type = "TimeIn";
    newObj.hour = parseInt(date.substr(11,4));
    newObj.date = date.substr(0,10); //2014-02-28

    const arr = obj.timeInEvents;
    arr.push(newObj);

    return obj;
}

function createTimeOutEvent(obj, date){
    const newObj = {};
    newObj.type = "TimeOut";
    newObj.hour = parseInt(date.substr(11,4));
    newObj.date = date.substr(0,10);

    const arr = obj.timeOutEvents;
    arr.push(newObj);
    
    return obj;
}

function hoursWorkedOnDate(obj, date){
    const timeInArr = obj.timeInEvents;
    const timeOutArr = obj.timeOutEvents;
    
    let hour1;
    let hour2;

    for(let element of timeInArr){
        if(element.date === date){
            hour1 = element.hour;
        }
    }

    for(let element of timeOutArr){
        if(element.date === date){
            hour2 = element.hour;
        }
    }

    const hoursWorked = hour2 - hour1;

    return hoursWorked/100;
}

function wagesEarnedOnDate(obj, date){
    let wageEarned;
    const hoursWorked = hoursWorkedOnDate(obj, date);
    return wageEarned = hoursWorked * obj.payPerHour;
}

function allWagesFor(obj){

    const timeInArr = obj.timeInEvents;
    const timeOutArr = obj.timeOutEvents;
    let finalWage = 0;
    
    timeInArr.forEach((record, index)=>{

        //const timeOut = timeOutArr[index];
        const wage = wagesEarnedOnDate(obj, record.date);
        finalWage = wage  + finalWage;

    })

    return finalWage;
}

function calculatePayroll(arr){
    let payroll = 0;
    
    payroll = arr.reduce((sum, currEmployee)=> sum + allWagesFor(currEmployee), 0);

    return payroll;
}

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
  ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
  ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
]

let rTimeData = [
  ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
  ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
]

sTimeData.forEach(function (d) {
  let [dIn, dOut] = d
  sRecord = createTimeInEvent(sRecord, dIn)
  sRecord = createTimeOutEvent(sRecord, dOut)
})

rTimeData.forEach(function (d, i) {
  let [dIn, dOut] = d
  rRecord = createTimeInEvent(rRecord, dIn)
  rRecord = createTimeOutEvent(rRecord, dOut)
})

let employees = [sRecord, rRecord]
let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0);

console.log(calculatePayroll(employees));
console.log(grandTotalOwed);