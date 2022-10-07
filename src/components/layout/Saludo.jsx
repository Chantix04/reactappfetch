import React from 'react'

const Saludo = (props) => {
  
  const {texto = "default texto"} = props
  
  return (
    <p>{texto}</p>
  )
}

export default Saludo