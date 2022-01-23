// Get elements
const addValor = document.querySelector(".btn");
const form = document.querySelector("#form");
const balance = document.querySelector("#balance");
const transactions = document.querySelector("#transactions");
const amount = document.querySelector("#amount");
const text = document.querySelector("#text");

let despesas = [];
let receitas = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (amount.value === "" || text.value === "") {
        alert("inputs empty");
        clearInputs();
    } else {
        let valor = Number(document.querySelector("#amount").value.replace(",", ".")).toFixed(2);

        if (Number(valor) > 0) {
            receitas.push(Number(valor))
        } else if (Number(valor) < 0) {
            despesas.push(Number(valor))
        }

        updateUI(Number(valor));
    }
});

// Atualizando a UI
const updateUI = function (valor) {
    let item = text.value;

    let lista = `
        <li class="${valor > 0 ? "plus" : "minus"}">
            ${item} <span>R$ ${valor}</span><button class="delete-btn">x</button>
        </li>
    `

    transactions.insertAdjacentHTML("beforeend", lista);

    let removeItem = document.querySelectorAll(".delete-btn");

    removeItem.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let classItem = e.target.parentElement.className

            let valueItem = e.target.parentElement.firstElementChild.outerText.replace("R$", "")

            if (classItem === "plus") {
                receitas = receitas.filter((val) => val !== Number(valueItem));

                e.target.parentElement.remove();
                
                calc();
            }

            if (classItem === "minus") {
                despesas = despesas.filter((val) => val !== Number(valueItem));

                e.target.parentElement.remove()

                calc();
            }
        })
    })

    calc();
    clearInputs();
}

// Fazendo calculos
const calc = function () {
    let out = document.querySelector("#money-minus")
    let inside = document.querySelector("#money-plus");

    let totalDespesas = null;
    let totalReceitas = null;

    if (despesas == false) {
        out.textContent = "- R$0.00"
    } else {
        let calcDespesas = despesas.reduce((acc, val) => acc + val).toFixed(2);
        out.textContent = `R$${calcDespesas}`;
        totalDespesas = calcDespesas;
    }

    if (receitas == false) {
        inside.textContent = "+ R$0.00"
    } else {
        let calcReceitas = receitas.reduce((acc, val) => acc + val).toFixed(2)
        inside.textContent = `R$ ${calcReceitas}`;
        totalReceitas = calcReceitas;
    }

    if (totalReceitas || totalDespesas) {
        balance.textContent = `R$ ${(Number(totalReceitas) + Number(totalDespesas)).toFixed(2)}`
    } else {
        balance.textContent = "R$ 0.00"
    }
}

const clearInputs = function () {
    amount.value = "" 
    text.value = ""
}