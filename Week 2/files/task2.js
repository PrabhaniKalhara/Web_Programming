var items = []; // each item: { name: "...", cost: 0 }

function showErrors(problems) {
  var errorBox = document.getElementById("errors");
  errorBox.innerHTML = "";
  var list = document.createElement("ul");
  problems.forEach(function (p) {
    var li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
  errorBox.appendChild(list);
  errorBox.classList.remove("hidden");
}

function clearErrors() {
  document.getElementById("errors").classList.add("hidden");
  document.getElementById("itemName").classList.remove("invalid");
  document.getElementById("itemCost").classList.remove("invalid");
  document.getElementById("people").classList.remove("invalid");
}

function renderItems() {
  var list = document.getElementById("itemList");
  list.innerHTML = "";
  items.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item.name + " - " + item.cost.toFixed(2); // textContent keeps user text safe
    list.appendChild(li);
  });
}

function addItem() {
  var nameInput = document.getElementById("itemName");
  var costInput = document.getElementById("itemCost");
  var name = nameInput.value.trim();
  var cost = Number(costInput.value);

  clearErrors();
  var problems = [];

  if (name === "") {
    problems.push("Item name cannot be empty.");
    nameInput.classList.add("invalid");
  }
  if (costInput.value === "" || isNaN(cost) || cost <= 0) {
    problems.push("Item cost must be a number greater than 0.");
    costInput.classList.add("invalid");
  }

  if (problems.length > 0) {
    showErrors(problems);
    return;
  }

  items.push({ name: name, cost: cost });
  nameInput.value = "";
  costInput.value = "";
  renderItems();
}

function calculateBill() {
  var peopleInput = document.getElementById("people");
  var people = Number(peopleInput.value);
  var tipRate = Number(document.getElementById("tip").value);
  var output = document.getElementById("output");

  clearErrors();
  var problems = [];

  if (items.length === 0) {
    problems.push("Add at least one menu item.");
  }
  if (peopleInput.value === "" || isNaN(people) || people < 1 || !Number.isInteger(people)) {
    problems.push("Number of people must be a whole number of 1 or more.");
    peopleInput.classList.add("invalid");
  }

  if (problems.length > 0) {
    showErrors(problems);
    output.innerHTML = "";
    return;
  }

  // The bill is the sum of all items
  var bill = 0;
  items.forEach(function (item) {
    bill += item.cost;
  });

  var tipAmount = bill * tipRate / 100;
  var totalWithTip = bill + tipAmount;
  var perPerson = totalWithTip / people;

  output.innerHTML =
    '<div class="result">' +
    "<p>Bill (sum of items): " + bill.toFixed(2) + "</p>" +
    "<p>Tip: " + tipAmount.toFixed(2) + "</p>" +
    "<p>Total with tip: " + totalWithTip.toFixed(2) + "</p>" +
    "<p><strong>Each person pays: " + perPerson.toFixed(2) + "</strong></p>" +
    "</div>";
}

document.getElementById("addItem").onclick = addItem;
document.getElementById("calculate").onclick = calculateBill;
