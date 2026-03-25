import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Saudacao() {
  return (
    <div style={{ backgroundColor: '#0059ff', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#ffffff' }}>Olá, Professor!</h2>
      <p>Este componente foi criado separadamente.</p>
    </div>
  )
}

function Detalhes({ nome, cargo }) {
  return (
    <div style={{ backgroundColor: '#494343', padding: '5px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{color:'white' , marginTop: '10px'}}>Nome: {nome}</h2>
      <h3 style={{color:'white'}}>Cargo: {cargo}</h3>
      <p style={{color:'white' , marginBottom: '10px'}}>Aprendendo React no Senai</p>
    </div>
  )
}

function Fimpagina() {
  return (
    <div style={{ background: 'linear-gradient(to right, yellow, green, blue)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#ffffff' }}>Brasil x França</h2>
      <h2 style={{ color: '#ffffff' }}>26/03/2026</h2>
      <p style={{ color: '#ffffff' }} >Brasil vence por 3x2</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>Olá, Charlo Lindão dos Reacts!</h1>
      <p>Voce esta alterando os primeiros componentes.</p>

      <div style={{ padding: '20px' }}>
        <h1>Minha Primeira Aula de React</h1>
        <hr />

        {/*3. Aqui nós "chamamos" o componente que criamos acima*/}
        <Saudacao />
        <Detalhes nome="Daniel" cargo="Elétrica" />
        <Fimpagina />

        <h3 style={{ color: '#ffffff' }}>SENAI LIMEIRA</h3>
        <p>Feito por Charlo.</p>
      </div>
    </div>
  )
}
export default App
