'use client'

import { Category, Product } from "@/app/types/types"
import { FormEvent, useRef, useState,useEffect} from "react"

export default function Page({params}:any){
   const [title,setTitle] = useState('')
   const [description,setDescription] = useState('')
   const refTitle = useRef<HTMLHeadingElement>(null)
   const refDescription = useRef<HTMLSpanElement>(null)
   const refProducts = useRef<HTMLSpanElement>(null)

   useEffect(()=>{
    async function printInfos() {
        const getDb = await fetch(`http://localhost:3333/category/${params.id}`)
        const dbConversed:Category[] = await getDb.json()
        const getProducts = await fetch(`http://localhost:3333/products`)
        const productsConversed:Product[] = await getProducts.json()
        const filterProductsForCategory = productsConversed.filter(product=>(product.category === dbConversed[0].title)) 
     if(refTitle.current && refDescription.current && refProducts.current){
        refTitle.current.innerText = dbConversed[0].title
        refDescription.current.innerText = dbConversed[0].description
        refProducts.current.innerText = `Numero de produtos da categoria : ${filterProductsForCategory.length}`
     }   
    }
    printInfos()
   })

   async function deleteCategory(){
    const getDb = await fetch(`http://localhost:3333/category/${params.id}`)
    const dbConversed:Category[] = await getDb.json()
    const getProducts = await fetch(`http://localhost:3333/products`)
    const productsConversed:Product[] = await getProducts.json()
    const filterProductsForCategory = productsConversed.filter(product=>(product.category === dbConversed[0].title)) 
    const deleteCategory = await fetch(`http://localhost:3333/category/${params.id}`,{
        method:'DELETE'
    })
    for(let i=0;i<filterProductsForCategory.length;i++){
    const updateProducts = await fetch(`http://localhost:3333/products/${filterProductsForCategory[i].id}`,{
    method: "PUT",
    body: JSON.stringify(
    {title:filterProductsForCategory[i].title,description:filterProductsForCategory[i].description,category:'Genérico',price:filterProductsForCategory[i].price}
    ),
    headers:{
    "Content-Type": "application/json"
    }
    })
    }

    setTimeout(() => {
        window.location.href = '/dashboard'
    }, 1000);
   }

    async function updateCategory(ev:FormEvent) {
    ev.preventDefault()
    const getDb = await fetch(`http://localhost:3333/category/${params.id}`)
    const dbConversed:Category[] = await getDb.json()
    const getProducts = await fetch(`http://localhost:3333/products`)
    const productsConversed:Product[] = await getProducts.json()
    const filterProductsForCategory = productsConversed.filter(product=>(product.category === dbConversed[0].title)) 
    const updateCategory = await fetch(`http://localhost:3333/categoryupdate/${params.id}`,{
    method: "PUT",
    body: JSON.stringify(
    {title,description}
    ),
    headers:{
    "Content-Type": "application/json"
    }
    })
    for(let i=0;i<filterProductsForCategory.length;i++){
        const updateProducts = await fetch(`http://localhost:3333/products/${filterProductsForCategory[i].id}`,{
        method: "PUT",
        body: JSON.stringify(
        {title:filterProductsForCategory[i].title,description:filterProductsForCategory[i].description,category:title,price:filterProductsForCategory[i].price}
        ),
        headers:{
        "Content-Type": "application/json"
        }
        })
    }
    }
return(
    <>
    <h1 ref={refTitle}></h1>
    <span ref={refDescription}></span>
    <span ref={refProducts}></span>
    <button onClick={deleteCategory}>DELETAR CATEGORIA</button>
    <form onSubmit={(ev)=>updateCategory(ev)}>
        <label htmlFor="category">Nome Categoria</label>
        <input 
        type="text" 
        id="category" 
        name="category"
        value={title}
        onChange={(ev)=>setTitle(ev.currentTarget.value)}
        />
        <label htmlFor="description">Descrição da categoria</label>
        <textarea 
        name="description" 
        id="description" 
        cols={30} 
        rows={10}
        value={description}
        onChange={(ev)=>setDescription(ev.currentTarget.value)}
        ></textarea>
        <button>Atualizar categoria</button>
    </form>
    </>
)
}