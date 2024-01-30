'use client'

import { Product } from "@/app/types/types"
import { useEffect, useRef } from "react"

export default function Market(){
    const productsContainer = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        async function renderProducts() {
           const productsDb = await fetch('http://localhost:3333/products')
           const dbConversed:Product[] = await productsDb.json() 
           for(let i = 0; i<dbConversed.length;i++){
            const productContainer = document.createElement('article')
            productContainer.id = dbConversed[i].id
            const nameProduct = document.createElement('h3')
            nameProduct.innerText = dbConversed[i].title

            const photoProduct = document.createElement('img')
            photoProduct.style.width = '100px'
            photoProduct.style.height = '100px'
            photoProduct.alt = 'Product photo'
            photoProduct.src = dbConversed[i].photo

            const priceProduct = document.createElement('p')
            priceProduct.innerText = dbConversed[i].price

            const button = document.createElement('button')
            button.innerHTML = `<a href='marketplace/product/${dbConversed[i].id}'>VER PRODUTO</a>`

            productContainer.append(nameProduct,photoProduct,priceProduct,button)

            if(productsContainer.current){
                productsContainer.current.append(productContainer) 
            }
           }
        }

        renderProducts()
    })
    return(
        <>
        <div ref={productsContainer}></div>
        </>
    )
}