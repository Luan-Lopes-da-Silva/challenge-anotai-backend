'use client'

import { FormEvent, useState } from "react";

export default function Page(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function generateAleatoryHex(){
        const hexCharacter = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
        let aleatoryHex = '#'
      
        for (let i = 0; i<6; i++){
          const aleatoryIndex = Math.floor(Math.random()* hexCharacter.length)
          aleatoryHex += hexCharacter.charAt(aleatoryIndex)
        }
        return aleatoryHex
    }

    async function createOwner(ev:FormEvent) {
    ev.preventDefault()
    const aleatoryID = generateAleatoryHex()
    const createOwner = await fetch(`http://localhost:3333/owners`,{
          method: "POST",
          body: JSON.stringify(
            {name,email,password,ownerID:aleatoryID}
          ),
          headers:{
            "Content-Type": "application/json"
          }
        })
        
    }
    return(
        <>
        <form onSubmit={(ev)=>createOwner(ev)}>
        <label htmlFor="">Name</label>
        <input 
        type="text" 
        value={name}
        onChange={(ev)=>setName(ev.currentTarget.value)}
        />
        <label htmlFor="">Email</label>
        <input 
        type="text" 
        value={email}
        onChange={(ev)=>setEmail(ev.currentTarget.value)}
        />
        <label htmlFor="">Password</label>    
        <input 
        type="password" 
        value={password}
        onChange={(ev)=>setPassword(ev.currentTarget.value)}
        />
        <button>Criar</button>
        </form>
        </>
    )
}