'use client'

import { Category, Owner } from "@/app/types/types"
import { FormEvent, useEffect, useRef, useState } from "react"
import style from '@/app/styles/createProduct.module.scss'
import LayoutAdminDashboard from "@/app/layouts/LayoutDashboard"
import GetLocalStorage from "@/app/utils/getLocalStorage"

export default function Page(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')
    const [quantity,setQuantity] = useState('')
    const refInput = useRef<HTMLInputElement>(null)
    const [url,setUrl] = useState('')
    const refForm = useRef<HTMLFormElement>(null)


    useEffect(()=>{
        async function RenderInputs(){
            const categoryDb = await fetch("http://localhost:3333/categorys")
            const categoryConversed:Category[] = await categoryDb.json()
            
            const selectInput = document.createElement('select')
            selectInput.value = category
            selectInput.addEventListener("change",(ev:any)=>{
                if(ev){
                    setCategory(ev.currentTarget.value)
                }
            })
            const button = document.createElement('button')
            button.innerText = 'Criar produto'
            const label = document.createElement('label')
            label.innerText = 'Categoria do produto'
            const firstOption = document.createElement('option')
            firstOption.value = 'Selecione uma categoria'
            firstOption.text = 'Selecione uma categoria'
        
            selectInput.append(firstOption)
        
            for(let i=0; i<categoryConversed.length;i++){
                const options = document.createElement('option')
                options.value = categoryConversed[i].title
                options.text = categoryConversed[i].title
        
            selectInput.append(options)
            }
        
            if(refForm.current){
                refForm.current.append(label,selectInput,button)
            }
        }
        RenderInputs()
    }
    
    ,[])
    
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


    async function createProduct(ev:FormEvent){
    ev.preventDefault()
    const dbCategory = await fetch('http://localhost:3333/categorys')
    const converseDb:Category[] = await dbCategory.json()
    const filterCategory = converseDb.filter(categoryItem=>(categoryItem.title === category))
    
    
    if(filterCategory.length>0){
        const localUser = GetLocalStorage()
                    const createProduct = await fetch(`http://localhost:3333/product`,{
                    method: "POST",
                    body: JSON.stringify(
                    {title,description,price,category,ownerID:localUser.ownerid,photo:url,quantity}
                    ),
                    headers:{
                    "Content-Type": "application/json"
                    }
                    }) 
                    if(createProduct.status === 201){
                    alert('Produto criada com sucesso')
                    }else{
                    alert('Erro na requisição')
                    }

    }
}



    return(
        <>
        <LayoutAdminDashboard>
        <main className={style.main}>
        <h1>Registrar produto</h1>
        <form onSubmit={(ev)=>createProduct(ev)} ref={refForm}>
            <label htmlFor="">Titulo do produto</label>
            <input 
            type="text" 
            value={title}
            onChange={(ev)=>setTitle(ev.currentTarget.value)}
            />
            <label htmlFor="photo" className={style.photo}>Enviar foto do produto</label>
            <input 
            type="file" 
            name="photo" 
            id="photo" 
            ref={refInput}
            onChange={handleFile}
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
            <label htmlFor="">Quantidade em estoque</label>
            <input 
            type="number" 
            value={quantity}
            onChange={(ev)=>{setQuantity(ev.currentTarget.value)}}
            />
        </form>
        </main>
        </LayoutAdminDashboard>
        </>
    )
}

