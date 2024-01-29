'use client'

import { Category, Product } from "@/app/types/types"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import style from '@/app/styles/productPage.module.scss'
import LayoutAdminDashboard from "@/app/layouts/LayoutDashboard"


export default function Page({params}:any){
    const refTitle = useRef<HTMLHeadingElement>(null) 
    const refDescription = useRef<HTMLParagraphElement>(null) 
    const refPrice = useRef<HTMLSpanElement>(null) 
    const productImgRef = useRef<HTMLImageElement>(null)
    const refForm = useRef<HTMLFormElement>(null)
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')

    useEffect(()=>{
    async function getProductFromId() {
    const callDb =  await fetch(`http://localhost:3333/products/${params.id}`)
    const dbConversed:Product[] = await callDb.json()
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
    button.innerText = 'Atualizar produto'
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
    
    if(refTitle.current && refDescription.current && refPrice.current && productImgRef.current){
        refTitle.current.innerText = dbConversed[0].title
        refDescription.current.innerText = dbConversed[0].description
        refPrice.current.innerText = dbConversed[0].price
        productImgRef.current.style.width = '300px'
        productImgRef.current.style.height = '300px'
        productImgRef.current.alt = 'Product Image'
        productImgRef.current.src = dbConversed[0].photo
    }
    }

    getProductFromId()
    },[])

    async function deleteProduct() {
        const deleteProduct = await fetch(`http://localhost:3333/product/${params.id}`,{
           method: "DELETE",
        }) 
        
        if(deleteProduct.status === 200){
        alert('Produto deletado com sucesso')
        setTimeout(() => {
        window.location.href = '/dashboard'  
        }, 2000);
        }else{
        alert('Erro no servidor')
        }
    }

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
    <LayoutAdminDashboard>
    <main className={style.main}>
    <div>
        <h1 ref={refTitle}></h1>
        <img ref={productImgRef}/>
        <p ref={refDescription}></p>
        <span ref={refPrice}></span>
    </div>
    <form onSubmit={(ev)=>changeData(ev)} className={style.form} ref={refForm}>
        <h2>Atualizar produto</h2>
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
        <label htmlFor="">Preço do produto</label>
        <input 
        type="text" 
        value={price}
        onChange={(ev)=>setPrice(ev.currentTarget.value)}
        />
    </form>
        <button onClick={deleteProduct}>Deletar produto</button>
    </main>
    </LayoutAdminDashboard>
)
}