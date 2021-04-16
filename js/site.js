let mortgageArray = [{
        month: 12,
        payment: 10,
        principal: 5,
        interest: .35,
        totalInterest: 26,
        balance: 1200
    }

];
/*var filteredEvents = eventsArray;

function buildDropDown() {
    var eventDD = document.getElementById("eventDropDown");
    // this creates distinctEvents to a new Set() of elements with .city
    let distinctEvents = [...new Set(eventsArray.map((events) => events.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats();
    displayData();
}*/

function buildPaymentSchedule() {

    let month = parseInt(document.getElementById("monthData").value);
    let rate = parseInt(document.getElementById("rateData").value);
    let loanAmount = parseInt(document.getElementById("loanData").value);
    let totalMonthlyPayment = (loanAmount) * (rate / 1200) / (1 - (1 + rate / 1200) ^ (-month));
    resultsBody.innerHTML = "";

    for (let i = 0; i <= month; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = addressBook[i].name;
        dataRow.getElementById("payment").textContent = addressBook[i].city;
        dataRow.getElementById("interest").textContent = addressBook[i].state;
        dataRow.getElementById("principal").textContent = addressBook[i].email;
        dataRow.getElementById("totalInterest").textContent = addressBook[i].email;
        dataRow.getElementById("balance").textContent = addressBook[i].email;

        resultsBody.appendChild(dataRow);
    }

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

}
/*
//get the events for the selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    // possible error here
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || eventsArray;
    filteredEvents = curEvents;
    document.getElementById("statsHead").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
                if (event.city == city) {
                    return event;

                }
            });
        }
        displayStats();
    }
*/

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

function saveAddress() {
    //grab the events out of local storage
    let addressBook = JSON.parse(localStorage.getItem("mortgageArray")) || mortgageArray;
    // create new object
    let obj = {};

    //assign that new object new attributes! wow
    obj["month"] = document.getElementById("monthData").value;
    obj["payment"] = document.getElementById("newCity").value;
    obj["principal"] = document.getElementById("newState").value;
    obj["interest"] = document.getElementById("newState").value;
    obj["totalInterest"] = document.getElementById("newEmail").value;
    obj["balance"] = document.getElementById("newPhone").value;

    addressBook.push(obj);

    localStorage.setItem("addressArray", JSON.stringify(addressBook));

    // Access the values fromthe form by ID and add an objecet to the array.
    displayData(addressBook);
}

function displayData(addressBook) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");
    //clear table first
    resultsBody.innerHTML = "";
    for (let i = 0; i < addressBook.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("name").textContent = addressBook[i].name;
        dataRow.getElementById("city").textContent = addressBook[i].city;
        dataRow.getElementById("state").textContent = addressBook[i].state;
        dataRow.getElementById("email").textContent = addressBook[i].email;
        dataRow.getElementById("phone").textContent = formatPhoneNumber(addressBook[i].phone);

        resultsBody.appendChild(dataRow);
    }
}

function formatPhoneNumber(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}