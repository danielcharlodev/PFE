function Financeiro() {
let salario = parseFloat(document.getElementById("salario").value);
    let aluguel = parseFloat(document.getElementById("aluguel").value);
    let alimentacao = parseFloat(document.getElementById("alimentacao").value);
    let lazer = parseFloat(document.getElementById("lazer").value);

    let despesas = aluguel + alimentacao + lazer;
    let saldo = salario - despesas;

    if(saldo > 0) {
        alert("saldo positivo")
    } else if (saldo == 0) {
        alert("no limite")
    } else {
        alert("saldo negativo")
    }
}