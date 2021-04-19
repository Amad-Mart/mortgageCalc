//this is where the values will be stored
let mortgageArray = [{
    month: 12,
    payment: 10,
    principal: 5,
    interest: .35,
    totalInterest: 26,
    balance: 1200
}];

//this is the first function called
function makeMortgage() {
    let balance = Number(document.getElementById("loanData").value);
    let term = Number(document.getElementById("monthData").value);
    let rate = Number(document.getElementById("rateData").value);

    let repoLoan = calcLoan(balance, term, rate);
    displayData(repoLoan, balance);
}

//this calculates aspects of loan
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

//this calculates the monthly payment
function calcPayment(balance, term, intRate) {
    let term2 = term * -1;
    let rate = intRate / 1200;
    let payment = balance * rate / (1 - Math.pow((1 + rate), term2));
    return payment;
}

//this calculates interest rate and returns it 
function calcInterest(prevBalance, rate) {
    return prevBalance * (rate / 12);
}

//this calculates interest prinipal and returns it
function calcPrinipal(payment, interest) {
    return payment - interest;
}

//this displays the data to the page
function displayData(dataBook, balance) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    resultsBody.innerHTML = "";

    for (let i = 0; i <= dataBook.length - 1; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = dataBook[i].month;
        dataRow.getElementById("payment").textContent = `$${dataBook[i].payment.toFixed(2)}`;
        dataRow.getElementById("principal").textContent = `$${dataBook[i].principal.toFixed(2)}`;
        dataRow.getElementById("interest").textContent = `$${dataBook[i].interest.toFixed(2)}`;
        dataRow.getElementById("totalInterest").textContent = `$${dataBook[i].totalInterest.toFixed(2)}`;
        dataRow.getElementById("balance").textContent = `$${dataBook[i].balance.toFixed(2)}`;
        if (dataBook[i].payment >= dataBook[i].balance) {
            dataRow.getElementById("payment").textContent = `$${dataBook[i].balance.toFixed(2)}`;
        }
        if (i == dataBook.length - 1) {
            document.getElementById("monthlyPayment").innerText = `$${dataBook[i].payment.toFixed(2)}`;
            document.getElementById("totalPrincipal").innerText = `$${balance}`;
            document.getElementById("totalInterest").innerText = `$${dataBook[i].totalInterest.toFixed(2)}`;
            document.getElementById("totalCost").innerText = `$${(balance + dataBook[i].totalInterest).toFixed(2)}`;
        }
        //append all nodes to to resultsBody
        resultsBody.appendChild(dataRow);
    }
}