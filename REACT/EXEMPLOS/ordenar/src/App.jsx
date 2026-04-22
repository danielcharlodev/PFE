import { useState } from 'react'

function App() {
  const nomes = ['Carlos', 'Ana', 'Bruno']

  const ordenado = [...nomes].sort()

  return (
    <div>
      {ordenado.map((nome, i) => (
        <p key={i}>{nome}</p>
      ))}
    </div>
  )
}

export default App