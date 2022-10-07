import React from 'react'

const Container = (props) => {

   const {children, mensaje} = props

   return (
      <div 
         style={{"backgroundColor":"red", "width":"200px"}}
      >
      
         <h3>{mensaje}</h3>

         {children}

      </div>
   )
}

export default Container