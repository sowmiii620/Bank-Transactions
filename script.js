const loginPage = document.getElementById("loginPage");
const createPage = document.getElementById("createPage");
const app = document.querySelector(".app");
const welcomeText = document.getElementById("welcomeText");
const balanceValue = document.querySelector(".balance__value");
const body = document.querySelector("body");

const date = document.querySelector(".date");

let currentUser = null;



// SHOW CREATE PAGE
function showCreate() {
  loginPage.style.display = "none";
  createPage.style.display = "block";
}

// CREATE ACCOUNT
function createAccount() {

  date.textContent = new Date().toLocaleDateString();
  document.body.style.backgroundColor = "#d5c5d5ff";

  const username = document.getElementById("newUser").value.trim();
  const password = document.getElementById("newPass").value;

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    alert("User already exists");
    return;
  }

  const newUser = {
    username,
    password,
    balance: 0
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showApp(newUser);
}

// LOGIN
function login() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value;

  date.textContent = new Date().toLocaleDateString();
  document.body.style.backgroundColor = "#d5c5d5ff";
  app.style.display="block";
  

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Invalid login");
    return;
  }

  showApp(user);
}

// SHOW APP
function showApp(user) {
  currentUser = user;

  loginPage.style.display = "none";
  createPage.style.display = "none";
  app.style.display = "grid";

  welcomeText.textContent = `Welcome, ${user.username}`;
  balanceValue.textContent = `${user.balance}€`;
}

// LOGOUT
function logout() {
  app.style.display = "none";
  loginPage.style.display = "block";
  currentUser = null;
}

let movements = document.querySelector(".movements");

let loanAmount = document.querySelector('.form__input--loan-amount')
let btn = document.querySelector('.form__btn--loan');
let transferAmount = document.querySelector(".form__input--amount");
let transferButton = document.querySelector(".form__btn--transfer")
let inBtn = document.querySelector(".summary__value--in")

let row2 = document.querySelector(".movements__row-2");

let totalout = 0;

transferButton.addEventListener("click", () => {


    const transferAmountValue = Number(transferAmount.value);



    if (transferAmountValue > 0) {

      row2.style.display = "none";

        totalout += transferAmountValue;
        outValue.textContent = `${totalout}€`;

        // Update the balance
        let currentBalance = Number(balanceValue.textContent) || 0;
        currentBalance -= transferAmountValue;
        balanceValue.textContent = currentBalance;

        const movementsRow2 = document.createElement("div");
        const withdrawal = document.createElement("div");
        const movementsDate2 = document.createElement("div");
        const movementsValue2 = document.createElement("div");

        movementsRow2.classList.add('movements__row-2')
        withdrawal.classList.add("movements__type");
        withdrawal.classList.add("movements__type--withdrawal");
        movementsDate2.classList.add("movements__date-2");
        movementsValue2.classList.add("movements__value-2");

        withdrawal.textContent = "withdrawal",-1;
        movementsDate2.textContent = new Date().toLocaleDateString();
        movementsValue2.textContent = -transferAmountValue;

        movementsRow2.appendChild(withdrawal);
        movementsRow2.appendChild(movementsDate2);
        movementsRow2.appendChild(movementsValue2);

        movements.appendChild(movementsRow2);

        transferAmount.value = '';}
        else{
            alert("Please enter a valid loan amount.");
        }
});

const inValue = document.querySelector(".summary__value--in");
const outValue = document.querySelector(".summary__value--out");
const row1 = document.querySelector(".movements__row-1");

let totalIn = 0;
btn.addEventListener("click", () => {
    const loanAmountValue = Number(loanAmount.value);

     
    
    if (loanAmountValue > 0) {

       row1.style.display = "none";
  // UPDATE IN
       totalIn += loanAmountValue;
       inValue.textContent = `${totalIn}€`;


        // Update the balance
        let currentBalance = Number(balanceValue.textContent) || 0;
        currentBalance += loanAmountValue;
        balanceValue.textContent = currentBalance;

        // Create a new movement entry
        const movementsRow = document.createElement("div");
        const deposit = document.createElement("div");
        const movementsDate = document.createElement("div");
        const movementsValue = document.createElement("div");
        
        movementsRow.classList.add('movements__row-1')
        deposit.classList.add("movements__type");
        deposit.classList.add("movements__type--deposit");
        movementsDate.classList.add("movements__date-1");
        movementsValue.classList.add("movements__value-1");

        deposit.textContent = "Deposit",+1;
        movementsDate.textContent = new Date().toLocaleDateString();
        movementsValue.textContent = loanAmountValue;

        movementsRow.appendChild(deposit);
        movementsRow.appendChild(movementsDate);
        movementsRow.appendChild(movementsValue);
        
        movements.appendChild(movementsRow); // Append the movement to the movements container

        // Clear the loan amount input
        loanAmount.value = '';
        
    } else {
        alert("Please enter a valid loan amount.");

    }
   

});
