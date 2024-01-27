import { Owner } from "../types/types"

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