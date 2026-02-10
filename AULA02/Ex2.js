const inpNome = document.getElementById("inpNome");
    const inpCargo = document.getElementById("inpCargo");
    const selCor = document.getElementById("selCor");
    const outNome = document.getElementById("outNome");
    const outCargo = document.getElementById("outCargo");

    function atualizar() {
      outNome.innerText = inpNome.value.trim() || "Seu Nome";
      outCargo.innerText = inpCargo.value.trim() || "Seu Cargo";
      document.documentElement.style.setProperty("--cor", selCor.value);
    }

    inpNome.oninput = atualizar;
    inpCargo.oninput = atualizar;
    selCor.oninput = atualizar;

    atualizar();