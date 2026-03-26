function Agenda() {
let hora = Number(document.getElementById("hora").value);
let prioridade = Number(document.getElementById("prioridade").value);
let turno;

if(hora <0 || hora >23) {
alert("horario invalido")
} else if (hora >=0 && hora <=11) {
   turno = 'manha';
} else if (hora >=12 && hora <=17) {
    turno = 'tarde';
} else {
    turno = 'noite';
}

if (prioridade <=0 || prioridade >10) {
    alert("numero invalido");
} else if (prioridade > 8 && turno == 'manha' || turno == 'tarde') {
    alert("TAREFA CRÍTICA/URGENTE");
} else if (prioridade >=7 && prioridade <=9 && turno == 'manha' || turno == 'tarde'){
    alert("TAREFA IMPORTANTE");
} else {
    alert("TAREFA NÃO IMPORTANTE");
}
}