
const Container = (props) => {
   //** children es una palabra reservada */
   //** hace referencia al "contenido" del padre */
   //** ademas este comp. recibe un prop llamado mensaje */
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

