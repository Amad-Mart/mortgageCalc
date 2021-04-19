let mortgageArray = [{
    month: 12,
    payment: 10,
    principal: 5,
    interest: .35,
    totalInterest: 26,
    balance: 1200
}];

// function buildPaymentSchedule(mort) {

//     let buildMonth = 0;
//     let buildTerm = mort.totalMonthlyPayment;
//     let buildRate = mort.intRate;
//     let buildLoan = mort.balance;
//     let buildTotalInt = 0;
//     let buildPrincipal = 0;
//     let buildBalance = buildLoan;
//     let buildPrincipalPay = 0;
//     let buildMonthlyInt = 0;
//     let mortArray = [];

//     for (let i = 1; i <= month; i++) {
//         const dataRow = document.importNode(template.content, true);

//         dataRow.getElementById("month").textContent = mortgageArray[i].month;
//         dataRow.getElementById("payment").textContent = mortgageArray[i].totalMonthlyPayment;
//         dataRow.getElementById("interest").textContent = mortgageArray[i].principal;
//         dataRow.getElementById("principal").textContent = mortgageArray[i].interest;
//         dataRow.getElementById("totalInterest").textContent = mortgageArray[i].totalInterest;
//         dataRow.getElementById("balance").textContent = mortgageArray[i].loanAmount;

//         resultsBody.appendChild(dataRow);
//     }
// }

// paymentArray = getPayments();
// displayData(paymentArray);


/* for (let i = 0; i < filteredEvents.length; i++) {
//     // i think .attendance is an issue
//     currentAttendance = filteredEvents[i].attendance;
//     total += currentAttendance;

//     if (most < currentAttendance) {
//         most = currentAttendance;
//     }

//     if (least > currentAttendance || least < 0) {
//         least = currentAttendance;
//     }
// }
// average = total / filteredEvents.length;
// document.getElementById("total").innerHTML = total.toLocaleString();
// document.getElementById("most").innerHTML = most.toLocaleString();
// document.getElementById("least").innerHTML = least.toLocaleString();
// document.getElementById("average").innerHTML = average.toLocaleString(
//     undefined, {
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//     }
 );*/

//}
function makeMortgage() {
    let balance = document.getElementById("loanData").value;
    let term = document.getElementById("monthData").value;
    let rate = document.getElementById("rateData").value;

    let repoLoan = calcLoan(balance, term, rate);
    displayData(repoLoan, balance);
}

function calcLoan(balance, term, rate) {

    let monthlyPay = calcPayment(balance, term, rate);
    let remainingBalance = balance;
    let totalInterest = 0;
    // let totalPrincipal = 0;
    let repo = [];

    for (let i = 1; i <= term; i++) {
        let obj = {};
        // let payMonth = i;
        let payInterest = calcInterest(remainingBalance, rate);
        let principalPayment = calcPrinipal(monthlyPay, payInterest);

        // let repoInterest = payInterest;
        obj["month"] = i;
        obj["payment"] = monthlyPay;
        obj["principal"] = principalPayment;
        obj["interest"] = payInterest;
        obj["totalInterest"] = totalInterest += payInterest;
        obj["balance"] = remainingBalance -= monthlyPay

        repo.push(obj);
    }
    return repo;
}

function getPayments(balance, term, rate) {
    let repo = [];
    let totalInterest = 0;
    let prevBalance = balance;
    for (let i = 1; i <= term; i++) {
        let interest = calcInterest(prevBalance, rate);
        let principal = calcPayment(payment, interest);
        totalInterest += interest;
        remainingBalance -= principal;
        prevBalance = remainingBalance;
        repo.push(new row(i, payment, principal, interest, totalInterest, remainingBalance));
    }
    return repo;
}
loadMortgageBook();

function loadMortgageBook() {
    let mortBook = [];
    mortBook = getData();
    displayData(mortBook);
}

function getData() {
    let mortBook = JSON.parse(localStorage.getItem("mortgageArray")) || [];

    if (mortBook.length == 0) {
        mortBook = mortgageArray;
        localStorage.setItem("mortgageArray", JSON.stringify(mortgageArray));
    }
    return mortBook;
}

function saveData() {
    //grab the events out of local storage
    let dataBook = JSON.parse(localStorage.getItem("mortgageArray")) || mortgageArray;

    // create new object
    let obj = {};

    //assign that new object new attributes! wow
    obj["month"] = month;
    obj["payment"] = totalMonthlyPayment;
    obj["principal"] = totalMonthlyPayment;

    dataBook.push(obj);

    localStorage.setItem("dataBook", JSON.stringify(dataBook));

    // Access the values fromthe form by ID and add an objecet to the array.
    displayData(dataBook);
}

function calcPayment(balance, term, intRate) {
    let term2 = term * -1;
    let rate = intRate / 1200;
    let payment = balance * rate / (1 - Math.pow((1 + rate), term2));
    return payment;
}

function calcInterest(prevBalance, rate) {
    return prevBalance * (rate / 12);
}

function calcPrinipal(payment, interest) {
    return payment - interest;
}

function displayData(dataBook, balance) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    resultsBody.innerHTML = "";

    for (let i = 0; i < dataBook.length; i++) {
        const dataRow = document.importNode(template.content, true);
        // let cols = dataRow.querySelectorAll("td");
        //= mortgageArray[i].month;
        //`$${mortgageArray[i].payment.toFixed(2)}`; }

        dataRow.getElementById("month").textContent = dataBook[i].month;
        dataRow.getElementById("payment").textContent = `$${dataBook[i].payment.toFixed(2)}`;
        dataRow.getElementById("principal").textContent = `$${dataBook[i].principal.toFixed(2)}`;
        dataRow.getElementById("interest").textContent = `$${dataBook[i].interest.toFixed(2)}`;
        dataRow.getElementById("totalInterest").textContent = `$${dataBook[i].totalInterest.toFixed(2)}`;
        dataRow.getElementById("balance").textContent = `$${dataBook[i].balance.toFixed(2)}`;
        if (i == dataBook.length - 1) {
            document.getElementById("monthlyPayment").innerText = `$${payment.toFixed(2)}`;
            document.getElementById("totalPrincipal").innerText = `$${balance}`;
            document.getElementById("totalInterest").innerText = `$${dataBook[i].totalInterest.toFixed(2)}`;
            document.getElementById("totalCost").innerText = `$${(balance + dataBook[i].totalInterest).toFixed(2)}`;
        }
        //append all nodes to to resultsBody
        resultsBody.appendChild(dataRow);
    }

}