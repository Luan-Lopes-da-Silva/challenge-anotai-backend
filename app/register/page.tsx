'use client'

import { FormEvent, useRef, useState } from "react";
import style from '@/app/styles/register.module.scss'

export default function Page(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [url,setUrl] = useState('')
    const refInput = useRef<HTMLInputElement>(null)

    function handleFile(){
      if(refInput.current){
          if(refInput.current.files){
              const file = refInput.current.files[0]
              const reader = new FileReader()
          
              reader.onload = function (event) {
                  if(event.target){
                  const dataURL = event.target.result;
                  const base64String = dataURL?.toString()
                  if(base64String){
                      setUrl(base64String)
                  }
                  }
              };

              reader.readAsDataURL(file)
          }
         
      }
  }

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
            {name,email,password,ownerID:aleatoryID,avatar:url}
          ),
          headers:{
            "Content-Type": "application/json"
          }
        })
        
    }
    return(
        <main className={style.main}>
        <form onSubmit={(ev)=>createOwner(ev)} >
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
        <label htmlFor="avatar" className={style.label}>ENVIAR FOTO</label>
        <input 
        type="file" 
        name="avatar" 
        id="avatar" 
        onChange={handleFile}
        ref={refInput}
        />
        <button>Criar</button>
        </form>
        </main>
    )
}