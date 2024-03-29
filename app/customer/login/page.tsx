'use client'

import { Customer } from "@/app/types/types"
import { FormEvent, useState } from "react"
import style from '@/app/styles/login.module.scss'
import Image from "next/image"
import bg from '@/public/Rectangle 16.png'

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function loginCustomer(ev:FormEvent) {
       ev.preventDefault() 
       const getCustomerDb = await fetch('http://localhost:3333/users')
       const conversedDb:Customer[] = await getCustomerDb.json()
       const filterEmail = conversedDb.filter(customer=>(customer.email === email))
       const filterCustomer = filterEmail.filter(customer=>(customer.password === password))
    
       if(filterCustomer.length>0){
        localStorage.setItem('Usuario Logado',JSON.stringify(filterCustomer[0]))
        setTimeout(() => {
            window.location.href = '/customer/marketplace'
        }, 2000);
       }else{
        alert('Usuario não encontrado')
       }
    }
    return(
        <div className={style.main}>
        <Image
        width={800}
        height={800}
        alt="bg"
        src={bg}
        />
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
        </div>
      
    )
}