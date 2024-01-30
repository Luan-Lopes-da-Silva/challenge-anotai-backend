'use client'

import { Customer } from "@/app/types/types"
import { FormEvent, useState } from "react"

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function loginCustomer(ev:FormEvent) {
       ev.preventDefault() 
       const getCustomerDb = await fetch('http://localhost:3333/users')
       const conversedDb:Customer[] = await getCustomerDb.json()
       const filterEmail = conversedDb.filter(customer=>(customer.email === email))
       const filterCustomer = filterEmail.filter(customer=>(customer.password === password))
       console.log(filterCustomer.length)
    
       if(filterCustomer.length>0){
        alert('Usuario encontrado')
        setTimeout(() => {
            window.location.href = '/customer/marketplace'
        }, 2000);
       }else{
        alert('Usuario não encontrado')
       }
    }
    return(
        <form onSubmit={(ev)=>loginCustomer(ev)}>
            <label htmlFor="">Email</label>
            <input 
            type="text"
            value={email}
            onChange={(ev)=>setEmail(ev.currentTarget.value)}
            />
            <label htmlFor="">Senha</label>
            <input 
            type="text" 
            value={password}
            onChange={(ev)=>setPassword(ev.currentTarget.value)}
            />
            <button>LOGAR</button>
        </form>
    )
}