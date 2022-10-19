
//podemos AGRUPAR nuestras funciones en un "DICCIONARIO" DE FUNCIONES
// Cada una de las propiedades tiene un valor el cual ejecuta una función.
// Esas funciones, como todas pueden o no recibir parámetros.
// El codigo que ejecuta retorna una valor.
export const diccionario = {
    
    'nullish' : (arreglo) => { //nullish retorna V o F
        const nuloVacio = arreglo.some(item=>
            item === null || 
            item === "" || 
            item === 0 || 
            item.length === 0
            ) 
        if(nuloVacio)console.info('si nuloVacio es V entonces el array tiene elementos nulos o vacios', nuloVacio)
        return nuloVacio
    },
    'menorA100': (numero) => { //retorna V o F de acuerdo al numero
        /* if(numero < 100){
            return true
        }else{
            return false
        } */
        return numero < 100 ? true : false
    }

}



