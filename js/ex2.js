//takes user input and print numbers to the page
//keep business logic from display logic
function fizzBuzz() {
    let startNum = parseInt(document.getElementById("numOne").value);
    let endNum = parseInt(document.getElementById("numTwo").value);
    let numbers = getRange(startNum, endNum + 1);
    displayData(numbers);
}

//gets the range of numbers
function getRange(start, end) {
    let numberArray = [];
    for (let index = start; index < end; index++) {
        //fizzbuzz go here
        numberArray.push(index);
    }
    return numberArray;
}

//use this for fizbuzz and morage calc
//displays numbers on the page
function displayData(numbers) {
    const rowTemplate = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    let fizzNum = parseInt(document.getElementById("multFizz").value);
    let buzzNum = parseInt(document.getElementById("multBuzz").value);

    // this makes display numbers truly dynamic 
    //creates a clone of content in rowTemplate, selects all td elements, then gets length number
    let colCount = rowTemplate.content.cloneNode(true).querySelectorAll("td").length;
    //ImportNode does same as cloneNode except import can reach outside of file (if you have template file)

    //clears the table resultsBody
    resultsBody.innerHTML = "";

    // loops over rows
    for (let rowIndex = 0; rowIndex < numbers.length; rowIndex += colCount) {
        let dataRow = rowTemplate.content.cloneNode(true);
        //returns an array of columns from the template
        let cols = dataRow.querySelectorAll("td");
        // loop over columns
        for (let colIndex = 0; colIndex < cols.length; colIndex++) {
            let myValue = numbers[rowIndex + colIndex];
            if (typeof myValue === "undefined") {
                myValue = "";
            } else if (myValue % fizzNum == 0 && myValue % buzzNum == 0) {
                cols[colIndex].classList.add("boldBoth");
                myValue = "FizzBuzz";
            }
            //major hint for fizzbuzz
            //makes even numbers bold
            else if (myValue % fizzNum == 0) {
                cols[colIndex].classList.add("boldBuzz");
                myValue = "Fizz";
            } else if (myValue % buzzNum == 0) {
                cols[colIndex].classList.add("boldFizz");
                myValue = "Buzz";
            }
            // sets td's content 
            cols[colIndex].textContent = myValue;
        }
        //add the row to the page
        resultsBody.appendChild(dataRow);
    }
}