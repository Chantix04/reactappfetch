const option = 'all' ;
const option2 = 'funcionA'
export const filterDictionary = {
    all : ' All items ' ,
    funcionA : (option) => { console.log('imprime el tipo de peticion que acabas de enviar', option)  } ,
    category2 : ' Category2 items ' ,
    category3 : ' Category3 items ' ,
    category4 : ' Category4 items '
}
console.log(filterDictionary[option]) // === All items
const resultado = filterDictionary['funcionA'](option2)
console.log(resultado) // === imprime lo q le pasas