const expenseInput = document.querySelector("#form-exp");
const priceInput = document.querySelector("#form-price");
const formBtn = document.querySelector(".add-btn");
const list = document.querySelector("#list");
const totalSpan = document.querySelector("#total-info");
const statusInput = document.querySelector("#status");
const nameInput = document.querySelector("#name-input");
const selectInput = document.querySelector("select");

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectInput.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(e) {
  total += Number(e);
  totalSpan.innerText = total;
}

function addExpense(e) {
  e.preventDefault();
  if (!expenseInput.value && !priceInput.value) return;

  const expenseDiv = document.createElement("div");
  expenseDiv.classList.add("expense");
  if (statusInput.checked) {
    expenseDiv.classList.add("paid");
  }

  expenseDiv.innerHTML = `
  <h2 class="exp-title">${expenseInput.value}</h2>
  <h2 class="exp-price">${priceInput.value}</h2>
  <div class="buttons">
      <img id="payment" src="/img/card.png" >
      <img id="delete" src="/img/delete.png" >
  </div>

  `;
  list.appendChild(expenseDiv);
  updateTotal(priceInput.value);

  expenseInput.value = "";
  priceInput.value = "";
  statusInput.checked = false;
}

function handleClick(e) {
  const element = e.target;

  if (element.id === "delete") {
    const inclusiveElement = element.parentElement.parentElement;
    //add animation to deleted element
    inclusiveElement.classList.add("fall");
    //animation end
    inclusiveElement.addEventListener("transitionend", () => {
      inclusiveElement.remove();
    });

    const price = +inclusiveElement.querySelector(".exp-price").innerText;
    total -= price;
    totalSpan.innerText = total;
  }

  if ((element.id = "payment")) {
    const inclusiveElement = element.parentElement.parentElement;
    inclusiveElement.classList.toggle("paid");
  }
}

// save username
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("username", e.target.value);
});
const username = localStorage.getItem("username");
nameInput.value = username;

//filter section

function handleFilter(e) {
  const items = list.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "All":
        item.style.display = "flex";
        break;

      case "Paid":
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;

      case "Not-paid":
        // kodlar
        if (!item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}
