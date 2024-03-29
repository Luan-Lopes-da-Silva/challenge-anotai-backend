'use client'

import { FormEvent } from "react"
import { Owner } from "../types/types"
import { useState } from "react"
import style from '@/app/styles/login.module.scss'
import Image from "next/image"
import bg from '@/public/Rectangle 16.png'

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
      localStorage.setItem('Usuario Logado' , JSON.stringify({name:passwordFilter[0].name,email,ownerid:passwordFilter[0].ownerid,avatar:passwordFilter[0].avatar}))
      alert('Login efetuado com sucesso')  
    setTimeout(() => {
        window.location.href = '/dashboard'
    }, 2000);
    }
    }
    return(
        <>
        <div className={style.main}>
        <Image
        width={800}
        height={800}
        src={bg}
        alt="bg"
        />
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
        </div>
        </>
    )
}