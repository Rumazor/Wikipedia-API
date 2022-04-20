export const getElement = (selection) =>{
    if(selection){
        const element = document.querySelector(selection)
        return element
    } else {
        throw console.error(error)
    }
}