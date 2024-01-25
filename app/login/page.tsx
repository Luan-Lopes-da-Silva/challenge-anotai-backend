'use client'

import { FormEvent } from "react"
import { Owner } from "../types/types"
import { useState } from "react"

export default function Page(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function login(ev:FormEvent) {
    ev.preventDefault()
    const db = await fetch('http://localhost:3333/owners')
    const conversedDb:Owner[] = await db.json()
    const emailFilter = conversedDb.filter(owner=>(owner.email === email))
    const passwordFilter = emailFilter.filter(owner=>(owner.password === password))

    if(passwordFilter.length>0){
      localStorage.setItem('Usuario Logado' , JSON.stringify({name:passwordFilter[0].name,email,Ownerid:passwordFilter[0].ownerid}))
      alert('Login efetuado com sucesso')  
    setTimeout(() => {
        window.location.href = '/dashboard'
    }, 2000);
    }
    }
    return(
        <>
        <form onSubmit={(ev)=>login(ev)}>
            <label htmlFor="">Email</label>
            <input 
            type="text" 
            value={email}
            onChange={(ev)=>setEmail(ev.currentTarget.value)}
            />
            <label htmlFor="">Senha</label>
            <input 
            type="password" 
            value={password}
            onChange={(ev)=>setPassword(ev.currentTarget.value)}
            />
            <button>Login</button>
        </form>
        </>
    )
}