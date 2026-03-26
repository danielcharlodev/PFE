function agendaCompromisso() {
  let mensagem = document.getElementById('mensagem3');
  mensagem.innerHTML = '';

  const dataHoje = new Date();
  const dataEvento = new Date(2026, 2, 26);

  const ms = dataEvento - dataHoje;
  const dias = ms / 86400000;
  const diasArredondados = Math.ceil(dias);

  mensagem.innerHTML += `Diferença de ${ms} ms entre os dias! <br>`;
  mensagem.innerHTML += `Faltam ${diasArredondados} dias para o evento! <br>`;
}
