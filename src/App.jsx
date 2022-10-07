import { useState, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Saludo from './components/layout/Saludo'
import Container from './components/layout/Container'
import {validaciones} from './auxs/utils'


function App() {

  const { alerta } = validaciones

  const [count, setCount] = useState(0)

  //** funcion alerta */
  //const alerta = (mensaje = "algo") => alert("mensaje")
  
  

  return (
    <>

      <Container mensaje="este componente tiene children">

        <p>asaluasdasd</p>
        <p>asaluasdasd</p>
        <p>asaluasdasd</p>
        <p>asaluasdasd</p>

      </Container>

      <Saludo texto={"saludo inicial"}/>

      <Saludo />

      <button onClick={()=>alerta("hacer algo")}>
        hacer algo
      </button>
    </>
  )
}

export default App
