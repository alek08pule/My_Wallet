document.addEventListener("DOMContentLoaded", () => {
  const homePage = document.querySelector("#homePage");
  const listsPage = document.querySelector("#listPage");

  document.querySelector("#homeLink").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.remove("hidden");
    listsPage.classList.add("hidden");
  });
  document.querySelector("#homeLinkMobile").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.remove("hidden");
    listsPage.classList.add("hidden");
  });
  document.querySelector("#listsLink").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hidden");
    listsPage.classList.remove("hidden");
  });
  document.querySelector("#listsLinkMobile").addEventListener("click", (e) => {
    e.preventDefault();
    homePage.classList.add("hidden");
    listsPage.classList.remove("hidden");
  });
});
// -----------------------variables--------------------
let amountEarnedValue = document.querySelector("#amound_earned");
let amountAvailableValue = document.querySelector("#amound_available");
let amountSpentValue = document.querySelector("#amound_spent");
const categoryIncome = document.getElementById("categoryIncome");
const categoryExpense = document.getElementById("categoryExpense");
let error = document.getElementById("error");
const addButton = document.getElementById("add");

let itemListIn = document.getElementById("item-income-list");
let itemListEx = document.getElementById("item-expense-list");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let incomeList = document.getElementById("income_container");
let expenseList = document.getElementById("expense_container");

let descriptionInput = document.getElementById("description");
let amountInput = document.getElementById("amount");
// // --------------load data from localStorage---------------

var latestValues = { earned: 0, available: 0, spent: 0 };
var incomesArray;
var expensesArray;
var lenIn;
var lenEx;
function loadLatestValues() {
  const loadSTORAGEvalues = localStorage.getItem("latestValues");
  if (loadSTORAGEvalues) {
    latestValues = JSON.parse(loadSTORAGEvalues);
  } else {
    latestValues = { earned: 0, available: 0, spent: 0 };
  }
}
function loadIncomes() {
  const loadSTORAGEin = localStorage.getItem("incomes");
  if (loadSTORAGEin) {
    incomesArray = JSON.parse(loadSTORAGEin);
    lenIn = loadSTORAGEin.length;
    setTimeout(function () {
      loadIncomesArray(incomesArray);
    }, 200);
  } else {
    incomesArray = [];
    lenIn = 0;
  }
}
function loadExpenses() {
  const loadSTORAGEex = localStorage.getItem("expenses");
  if (loadSTORAGEex) {
    expensesArray = JSON.parse(loadSTORAGEex);
    lenEx = loadSTORAGEex.length;
    setTimeout(function () {
      loadExpensesArray(expensesArray);
    }, 200);
  } else {
    expensesArray = [];
    lenEx = 0;
  }
}
loadLatestValues();
loadIncomes();
loadExpenses();

function getLatestValue(latestValues) {
  if (amountEarnedValue) {
    amountEarnedValue.textContent = latestValues.earned;
  }
  if (amountAvailableValue) {
    amountAvailableValue.textContent = latestValues.available;
  }
  if (amountSpentValue) {
    amountSpentValue.innerHTML = latestValues.spent;
  }
  if (latestValues.earned == 0) {
    p1.innerHTML = "Items not found";
  } else {
    p1.innerHTML = "";
  }
  if (latestValues.spent == 0) {
    p2.innerHTML = "Items not found";
  } else {
    p2.innerHTML = "";
  }
}
getLatestValue(latestValues);
// _____________________save inputs___________________
addButton.addEventListener("click", function () {
  if (description === "" || amount === "" || !isCategorySelected()) {
    error.innerHTML = "Please fill out all the required fields.";
    return;
  }
  saveInputValues();
  clearInputs();
  loadIncomesArray();
  loadExpensesArray();
});

function saveInputValues() {
  const description = descriptionInput.value;
  const amount = amountInput.value;
  if (description == "" || amount == "") {
    return;
  }

  let type;
  if (categoryIncome.checked) {
    type = "income";
  } else if (categoryExpense.checked) {
    type = "expense";
  }

  const item = {
    id: Math.floor(Math.random() * 1000000),
    type: type,
    description: description,
    amount: amount,
  };
  if (type == "income") {
    incomesArray.push(item);
    localStorage.setItem("incomes", JSON.stringify(incomesArray));
  } else {
    expensesArray.push(item);
    localStorage.setItem("expenses", JSON.stringify(expensesArray));
  }
  updateValues(item);
}
function isCategorySelected() {
  return categoryIncome.checked || categoryExpense.checked;
}
function clearInputs() {
  descriptionInput.value = "";
  amount.value = "";
  categoryIncome.checked = false;
  categoryExpense.checked = false;
  error.innerHTML = "";
}

// _____________update values____________________
let earned = latestValues.earned;
let available = latestValues.available;
let spent = latestValues.spent;
function updateValues(item) {
  if (item.type == "income") {
    if (item.description == "deleted") {
      earned = latestValues.earned - parseInt(item.amount);
    } else {
      earned = latestValues.earned + parseInt(item.amount);
    }
  }
  if (item.type == "expense") {
    if (item.description == "deleted") {
      spent = latestValues.spent - parseInt(item.amount);
    } else {
      spent = latestValues.spent + parseInt(item.amount);
    }
  }

  available = earned - spent;
  amountEarnedValue.innerHTML = earned;
  amountAvailableValue.innerHTML = available;
  amountSpentValue.innerHTML = spent;
  latestValues.earned = earned;
  latestValues.available = available;
  latestValues.spent = spent;
  if (latestValues.earned == 0) {
    p1.innerHTML = "Items not found";
  } else {
    p1.innerHTML = "";
  }
  if (latestValues.spent == 0) {
    p2.innerHTML = "Items not found";
  } else {
    p2.innerHTML = "";
  }

  localStorage.setItem("latestValues", JSON.stringify(latestValues));
}

// ___________________create lists_________________________

function loadIncomesArray() {
  itemListIn.innerHTML = "";
  incomesArray.forEach((item) => {
    const div = document.createElement("div");
    div.classList = "listOfIncomes";
    div.id = item.id;
    let itemId = item.id;
    div.innerHTML = `
      <div class="type">${item.type}</div>
      <div class="description">
      <h4>${item.description}</h4>
    </div>
       <div class="symbol-amount">
        <span>$</span>
      
      <span class="income_amount">${item.amount}</span></div>
      <button class="delete-btn"><i class="fa fa-xmark"></i></button>`;
    itemListIn.appendChild(div);

    let newItem = {
      id: item.id,
      type: item.type,
      description: "deleted",
      amount: item.amount,
    };
    const deleteBtn = div.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      const divToDelete = document.getElementById(itemId);
      divToDelete.remove();
      deleteItemIncome(itemId);
      updateValues(newItem);
    });

    return itemId;
  });
}

function loadExpensesArray() {
  loadExpenses();
  itemListEx.innerHTML = "";
  expensesArray.forEach((item) => {
    const div = document.createElement("div");
    div.classList = "listOfExpenses";
    div.id = item.id;
    let itemId = item.id;
    div.innerHTML = `
      <div class="type">${item.type}</div>
      <div class="description">
      <h4>${item.description}</h4>
    </div>
       <div class="symbol-amount">
        <span>$</span>
      <span class="income_amount">${item.amount}</span></div>
      <button class="delete-btn"><i class="fa fa-xmark"></i></button>`;
    itemListEx.appendChild(div);
    let newItem = {
      id: item.id,
      type: item.type,
      description: "deleted",
      amount: item.amount,
    };
    const deleteBtn = div.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      const divToDelete = document.getElementById(itemId);
      divToDelete.remove();
      deleteItemExpense(itemId);
      updateValues(newItem);
    });

    return itemId;
  });
}
// -------------delete objects--------------
function deleteItemIncome(itemId) {
  let index = incomesArray.findIndex((item) => item.id == itemId);
  if (index !== -1) {
    incomesArray.splice(index, 1);
    localStorage.setItem("incomes", JSON.stringify(incomesArray));
  }
}
function deleteItemExpense(itemId) {
  let index = expensesArray.findIndex((item) => item.id == itemId);
  if (index !== -1) {
    expensesArray.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expensesArray));
  }
}
