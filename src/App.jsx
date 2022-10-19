import { useState, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Saludo from './components/layout/Saludo'

import { diccionario } from './auxs/library'

import Container from './components/layout/Container'

function App() {

  const saludar = function() { alert("saluando") }

  const saludarDos = function(mensaje) { alert(mensaje) }

  /* estas funciones HACEN uso del diccionario */
  const esNulo = () => {
    const resultado = diccionario["nullish"]([1,100,0])
    console.log(resultado)
  } 

  const esMenorA100 = () => {
    const resultado = diccionario['menorA100'](105)
    console.log("imprime si es V o F ", resultado)
  }
  
  return (
      <>
        {/* uso de children */}
        <Container mensaje="este componente tiene children">
          <p>mensaje 1</p>
          <p>mensaje 2</p>
          <p>mensaje 3</p>
          <p>mensaje 4</p>
        </Container>

        {/* estas son las diferentes formas de ejecutar codigo de funciones ⬇ */}

        <button onClick={saludar}>
          hola 1
        </button>

        <button onClick={()=>saludarDos("hola a todos")}>
          hola 2
        </button> 

        <button onClick={esNulo}>
          es nulo? 
        </button>

        <button onClick={esMenorA100}>
          menor a 100 
        </button>
        
        {/* funciones que SI reciben callbacks ⬇ */}
    
        {/* podemos usar el diccionario directamente en el boton */}
        <button 
          onClick={()=> {
            const resultado = diccionario['menorA100'](80)
            console.log("imprime si es V o F ", resultado)
          }
        }>
          menor a 100 *
        </button>


      </>
  )
}

export default App
