function filtrarAgenda() {

    let agendaHorarios = [8, 12, 25, 15, -2, 20]
    let contagemValidos = 0
    let mensagem = document.getElementById('mensagem')
    mensagem.innerHTML = ('')

    for (h of agendaHorarios) {
        if (h > 0 && h < 23) {
            mensagem.innerHTML +=`Horario marcado para ${h} horas! <br>`
            contagemValidos++;
        } else {
            mensagem.innerHTML +=`${h} horas não é um horario valido <br>`
        }
    }

    mensagem.innerHTML +=`Numeros Validos: ${contagemValidos}`
}