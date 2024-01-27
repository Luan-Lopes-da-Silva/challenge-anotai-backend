'use client'

import { Category, Owner } from "@/app/types/types"
import { FormEvent, useState } from "react"
import style from '@/app/styles/createProduct.module.scss'
import LayoutAdminDashboard from "@/app/layouts/LayoutDashboard"

export default function Page(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')


    async function createProduct(ev:FormEvent){
    ev.preventDefault()
    const dbCategory = await fetch('http://localhost:3333/categorys')
    const converseDb:Category[] = await dbCategory.json()
    const filterCategory = converseDb.filter(categoryItem=>(categoryItem.title === category))
    
    if(filterCategory.length>0){
        const localUser:Owner = JSON.parse(localStorage.getItem('Usuario Logado'))
        const createProduct = await fetch(`http://localhost:3333/product`,{
           method: "POST",
           body: JSON.stringify(
             {title,description,price,category,ownerID:localUser.Ownerid}
           ),
           headers:{
             "Content-Type": "application/json"
           }
     }) 
     if(createProduct.status === 201){
         alert('Categoria criada com sucesso')
     }else{
         alert('Erro na requisição')
     }
    }else{
        alert('Categoria não encontrada')
    }
    }


    return(
        <>
        <LayoutAdminDashboard>
        <main className={style.main}>
        <h1>Registrar produto</h1>
        <form onSubmit={(ev)=>createProduct(ev)}>
            <label htmlFor="">Titulo do produto</label>
            <input 
            type="text" 
            value={title}
            onChange={(ev)=>setTitle(ev.currentTarget.value)}
            />
            <label htmlFor="">Descrição do produto</label>
            <textarea 
            name="" id="" 
            cols={30} 
            rows={10}
            value={description}
            onChange={(ev)=>setDescription(ev.currentTarget.value)}
            ></textarea>
            <label htmlFor="">Preço do produto</label>
            <input 
            type="text" 
            value={price}
            onChange={(ev)=>setPrice(ev.currentTarget.value)}
            />
            <label htmlFor="">Categoria do produto</label>
            <input 
            type="text" 
            value={category}
            onChange={(ev)=>setCategory(ev.currentTarget.value)}
            />
            <button>Criar produto</button>
        </form>
        </main>
        </LayoutAdminDashboard>
        </>
    )
}