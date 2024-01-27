'use client'

import { Owner } from "@/app/types/types"
import { FormEvent, useState } from "react"
import style from '@/app/styles/createCategory.module.scss'
import LayoutAdminDashboard from "@/app/layouts/LayoutDashboard"

export default function Page(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')

    async function createCategory(ev:FormEvent) {
     ev.preventDefault()
     const localUser:Owner = JSON.parse(localStorage.getItem('Usuario Logado'))
     const createCategory = await fetch(`http://localhost:3333/category`,{
        method: "POST",
        body: JSON.stringify(
          {title,description,ownerID:localUser.Ownerid}
        ),
        headers:{
          "Content-Type": "application/json"
        }
  }) 
  if(createCategory.status === 201){
      alert('Categoria criada com sucesso')
  }else{
      alert('Erro na requisição')
  }
    }
    return(
      <LayoutAdminDashboard>
       <main className={style.main}>
       <h1>Registrar categoria</h1>
        <form onSubmit={(ev)=>createCategory(ev)}>
            <label htmlFor="">Titulo da categoria</label>
            <input 
            type="text" 
            value={title}
            onChange={(ev)=>setTitle(ev.currentTarget.value)}
            />
            <label htmlFor="">Descrição da categoria</label>
            <textarea 
            name="" 
            id="" 
            cols={30} 
            rows={10}
            value={description}
            onChange={(ev)=>setDescription(ev.currentTarget.value)}
            ></textarea> 
            <button>Criar categoria</button>   
        </form>
       </main>
        </LayoutAdminDashboard>
    )
}