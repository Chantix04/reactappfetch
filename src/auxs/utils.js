
//** validaciones de distintos tipos de inputs
export const validaciones = {
    
    //** valida de num. de exp. */
    valNumExp : (value) => {
        const resultado = /^[0-9]{0,6}$/.test(value)
        return resultado
    },
    //*val de texto mediano
    valTextoMediano: (value) => {
        if(value.length === 0){return true}
        if(value.length >= 100){return false}else{return true}
    },
    //** ❕ valida que el año no sea menor a 2019 o mayor al actual */
    
    valMax: (value) => {
        let resultado
        if(isNaN(value)){
            //console.info('🤮🤬no es un numero')
            //resultado = false
            return false
        }else{
            resultado = /^[0-9]{0,4}$/.test(value)
            return resultado
        }
    },
    valObjNullOrEmpty : (value) => {
        const arrayDeValores = Object.values(value)
        
        const nullishOrEmpty = arrayDeValores.some(item=>
            item === null || 
            item === "" || 
            item === 0 || 
            item.length === 0)

        if(nullishOrEmpty)console.info('NO SE PUEDE ENVIAR', nullishOrEmpty)
        
        return nullishOrEmpty
    },
    
    valExpteElect: (value) => {
        const resultado = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\/._-]{0,20}$/.test(value)
        return resultado
    }
}


