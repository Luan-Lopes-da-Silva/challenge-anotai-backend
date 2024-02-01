import { Owner ,NewProduct, Customer} from "../types/types"

export default function GetLocalStorage(){
    const localStorageUser = localStorage.getItem('Usuario Logado')

    if(localStorageUser){
    const parseLocal:Owner = JSON.parse(localStorageUser) 
    return parseLocal
    }else{
    const userUndefined:Owner = {
    avatar : '',
    email: '',
    id : '',
    name : '',
    ownerid: '',
    password: ''
    }
    return userUndefined
    }
}

export function GetCustomer(){
    const localStorageUser = localStorage.getItem('Usuario Logado')

    if(localStorageUser){
    const parseLocal:Customer = JSON.parse(localStorageUser) 
    return parseLocal
    }else{
    const userUndefined:Customer = {
    email: '',
    id : '',
    name : '',
    password: '',
    avatar: ''
    }
    return userUndefined
    } 
}


export function GetCartItems(){
    const localStorageCart = localStorage.getItem('cart-items')

    if(localStorageCart){
        const localParse:NewProduct[] = JSON.parse(localStorageCart)
        return localParse
    }else{
        const localCartUndefined:NewProduct[] = []
        return localCartUndefined
    }
}