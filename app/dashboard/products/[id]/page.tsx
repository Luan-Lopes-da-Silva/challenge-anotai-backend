'use client'

import { Product } from "@/app/types/types"
import { FormEvent, useEffect, useRef, useState } from "react"
import style from '@/app/styles/productPage.module.scss'


export default function Page({params}:any){
    const refTitle = useRef<HTMLHeadingElement>(null) 
    const refDescription = useRef<HTMLParagraphElement>(null) 
    const refPrice = useRef<HTMLSpanElement>(null) 
    const refInputTitle = useRef<HTMLInputElement>(null)
    const refInputCategory = useRef<HTMLInputElement>(null)
    const refInputDescription = useRef<HTMLTextAreaElement>(null)
    const refInputPrice = useRef<HTMLInputElement>(null)
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')

    useEffect(()=>{
    async function getProductFromId() {
    const callDb =  await fetch(`http://localhost:3333/products/${params.id}`)
    const dbConversed:Product[] = await callDb.json()
    
    if(refTitle.current && refDescription.current && refPrice.current){
        refTitle.current.innerText = dbConversed[0].title
        refDescription.current.innerText = dbConversed[0].description
        refPrice.current.innerText = dbConversed[0].price
    }
    }

    getProductFromId()
    })

    async function changeData(ev:FormEvent) {
        ev.preventDefault()
        
        const updateProduct = await fetch(`http://localhost:3333/products/${params.id}`,{
           method: "PUT",
           body: JSON.stringify(
             {title,description,price,category}
           ),
           headers:{
             "Content-Type": "application/json"
           }
        }) 
        if(updateProduct.status === 200){
            alert('Produto atualizado com sucesso')
            setTimeout(() => {
                location.reload()
            }, 2000);
        }else{
            alert('Erro na requisição')
        }


    }

return(
    <>
    <main className={style.main}>
    <div>
        <h1 ref={refTitle}></h1>
        <p ref={refDescription}></p>
        <span ref={refPrice}></span>
    </div>
    <form onSubmit={(ev)=>changeData(ev)} className={style.form}>
        <label htmlFor="">Titulo do produto</label>
        <input 
        type="text" 
        value={title}
        onChange={(ev)=>setTitle(ev.currentTarget.value)}
        />
        <label htmlFor="">Descrição do produto</label>
        <textarea 
        name="" 
        id="" 
        cols={30}
        rows={10}
        value={description}
        onChange={(ev)=>setDescription(ev.currentTarget.value)}
        ></textarea>
        <label htmlFor="">Categoria do produto</label>
        <input 
        type="text" 
        value={category}
        onChange={(ev)=>setCategory(ev.currentTarget.value)}
        />
        <label htmlFor="">Preço do produto</label>
        <input 
        type="text" 
        value={price}
        onChange={(ev)=>setPrice(ev.currentTarget.value)}
        />
        <button>Atualizar produto</button>
    </form>
    </main>
    </>
)
}