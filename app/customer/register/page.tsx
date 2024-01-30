'use client'

import { FormEvent, useRef, useState } from "react";
import style from '@/app/styles/registerCostumer.module.scss'

export default function Register(){
    const [avatar,setAvatar] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
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
                        setAvatar(base64String)
                    }
                    }
                };
  
                reader.readAsDataURL(file)
            }
           
        }
    }

    async function createCustomer(ev:FormEvent) {
        ev.preventDefault()
            const createCustomer = await fetch(`http://localhost:3333/user`,{
              method: "POST",
              body: JSON.stringify(
                {name,email,password,confirmPassword,avatar}
              ),
              headers:{
                "Content-Type": "application/json"
              }
            })
            
            if (createCustomer.status === 201) {
                alert('Usuario cadastrado com sucesso')
                setTimeout(() => {
                    window.location.href = '/customer/login'
                }, 2000);
            } else {
                alert('Erro no servidor')
            }
    }


    return(
       <main className={style.main}>
        <form className={style.form} onSubmit={(ev)=>createCustomer(ev)}>
        <label htmlFor="">Nome</label>
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
        <label htmlFor="">Senha</label>
        <input 
        type="text" 
        value={password}
        onChange={(ev)=>setPassword(ev.currentTarget.value)}
        />
        <label htmlFor="">Confirmar Senha</label>
        <input 
        type="text" 
        value={confirmPassword}
        onChange={(ev)=>setConfirmPassword(ev.currentTarget.value)}
        />
        <label htmlFor="">Avatar</label>
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