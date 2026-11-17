function calculateBill() {
  var billInput = document.getElementById("bill");
  var peopleInput = document.getElementById("people");
  var tipRate = Number(document.getElementById("tip").value);

  var bill = Number(billInput.value);
  var people = Number(peopleInput.value);

  // Clear old error styling
  billInput.classList.remove("invalid");
  peopleInput.classList.remove("invalid");

  // Validation
  var problems = [];

  if (billInput.value === "" || isNaN(bill) || bill <= 0) {
    problems.push("Total bill must be a number greater than 0.");
    billInput.classList.add("invalid");
  }

  if (peopleInput.value === "" || isNaN(people) || people < 1 || !Number.isInteger(people)) {
    problems.push("Number of people must be a whole number of 1 or more.");
    peopleInput.classList.add("invalid");
  }

  var errorBox = document.getElementById("errors");
  var output = document.getElementById("output");

  if (problems.length > 0) {
    errorBox.innerHTML = "<ul><li>" + problems.join("</li><li>") + "</li></ul>";
    errorBox.classList.remove("hidden");
    output.innerHTML = "";
    return;
  }

  errorBox.classList.add("hidden");

  // Calculation
  var tipAmount = bill * tipRate / 100;
  var totalWithTip = bill + tipAmount;
  var perPerson = totalWithTip / people;

  output.innerHTML =
    '<div class="result">' +
    "<p>Tip: " + tipAmount.toFixed(2) + "</p>" +
    "<p>Total with tip: " + totalWithTip.toFixed(2) + "</p>" +
    "<p><strong>Each person pays: " + perPerson.toFixed(2) + "</strong></p>" +
    "</div>";
}

document.getElementById("calculate").onclick = function () {
  calculateBill();
};
