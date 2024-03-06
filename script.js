const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter text and value");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

// Generate ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add Transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Delete Transaction by ID
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    Init();
}

// Update Values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = formatNumber(amounts.reduce((acc, item) => (acc += item), 0));
    const income = formatNumber(amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0));
    const expense = formatNumber(amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Helper function to format numbers with two decimal places
function formatNumber(number) {
    return number.toFixed(2);
}

// Initialize App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener("submit", addTransaction)