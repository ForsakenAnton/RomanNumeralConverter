const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputParagraph = document.getElementById("output");

function makeAndGetPartOfResult(
    part,
    symbolBetweenOneAndThree,
    symbolFive,
    symbolBetweenSixAndEight,
    symbolNine) {

    let partResult = "";

    if (part === 0) {
        return "";
    }

    if (part >= 1 && part <= 3) {
        partResult = symbolBetweenOneAndThree.repeat(part);
    } else if (part === 4) {
        partResult = symbolBetweenOneAndThree + symbolFive;
    } else if (part == 5) {
        partResult = symbolFive;
    } else if (part >= 6 && part <= 8) {
        partResult = symbolFive + symbolBetweenSixAndEight.repeat(part - 5);
    } else if (part === 9) {
        partResult = symbolBetweenSixAndEight + symbolNine;
    }

    return partResult;
}

function convertFromRomanToNumeric(number) {
    let result = "";

    for (let i = 1000; i >= 1; i = i / 10) {
        let part = Math.floor(number / i);
        if (i === 1000) {
            result += makeAndGetPartOfResult(part, "M", "", "", "");
        } else if (i === 100) {
            result += makeAndGetPartOfResult(part, "C", "D", "C", "M");
        } else if (i === 10) {
            result += makeAndGetPartOfResult(part, "X", "L", "X", "C");
        } else if (i === 1) {
            result += makeAndGetPartOfResult(part, "I", "V", "I", "X");
        }

        number = number % i;
    }

    outputParagraph.textContent = result;
}

function checkUserInput() {
    const numberInt = parseInt(numberInput.value);

    if (!numberInput.value || isNaN(numberInt)) {
        outputParagraph.textContent = "Please enter a valid number";
        return;
    } else if (numberInt <= 0) {
        outputParagraph.textContent = "Please enter a number greater than or equal to 1";
        return;
    } else if (numberInt > 3999) {
        outputParagraph.textContent = "Please enter a number less than or equal to 3999";
        return;
    }

    convertFromRomanToNumeric(numberInt);
}


numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
});

convertBtn.addEventListener("click", () => {
    checkUserInput();
});