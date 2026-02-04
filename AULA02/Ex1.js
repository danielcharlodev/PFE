function converter() {
  const celsius = Number(document.getElementById("celsius").value);
  const resultado = document.getElementById("resultado");

  const fahrenheit = celsius * 1.8 + 32;

  resultado.innerHTML = `${celsius}°C = ${fahrenheit.toFixed(1)}°F`;

  if (fahrenheit > 80) {
    document.body.style.backgroundColor = "coral";
  } else {
    document.body.style.backgroundColor = "lightskyblue";
  }
}
