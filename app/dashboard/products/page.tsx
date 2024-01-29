'use client'

import LayoutAdminDashboard from "@/app/layouts/LayoutDashboard";
import { Product } from "@/app/types/types";
import GetLocalStorage from "@/app/utils/getLocalStorage";
import { useEffect, useRef } from "react";

export default function Page(){
    const refContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        async function renderProducts() {
            const getProduts = await fetch('http://localhost:3333/products')
            const productConversed:Product[] = await getProduts.json()
            const localStorage = GetLocalStorage()
            const filterProducts = productConversed.filter(product=>(product.ownerid === localStorage.ownerid))
           

            const table = document.createElement('table')

            const tHeader = document.createElement('tr')
            const tdName = document.createElement('td')
            tdName.innerText = 'Nome do produto'
            const tdDescription = document.createElement('td')
            tdDescription.innerText = 'Descrição do produto'
            const tdPrice = document.createElement('td')
            tdPrice.innerText = 'Preço do produto'
            const tdQuantity = document.createElement('td')
            tdQuantity.innerText = 'Quantidade do produto'

            const tdImage = document.createElement('td')
            tdImage.innerText = 'Imagem do produto'

            tHeader.append(tdName,tdDescription,tdPrice,tdQuantity,tdImage)
            table.append(tHeader)

            if(refContainer.current){
                refContainer.current.append(table)
            }

            for(let i = 0;i<filterProducts.length;i++){
                const rows = document.createElement('tr')

                const tdNameDB = document.createElement('td')
                tdNameDB.innerText = filterProducts[i].title
                const tdDescriptionDB = document.createElement('td')
                tdDescriptionDB.innerText = filterProducts[i].description
                const tdPriceDB = document.createElement('td')
                tdPriceDB.innerText = filterProducts[i].price
                const tdQuantityDB = document.createElement('td')
                tdQuantityDB.innerText = filterProducts[i].quantity

                const tdImageDB = document.createElement('td')
                const img = document.createElement('img')
                img.src = filterProducts[i].photo
                img.style.width = "90px"
                img.style.height = "90px"
                const button = document.createElement('button')
                button.innerHTML = `<a href='products/${filterProducts[i].id}'}>VER PRODUTO</a>`

                tdImageDB.append(img,button)

                rows.append(tdNameDB,tdDescriptionDB,tdPriceDB,tdQuantityDB,tdImageDB)
                table.append(rows)
            if(refContainer.current){
                refContainer.current.append(table)
            }
            }
        }

        renderProducts()
    })
    return(
       <LayoutAdminDashboard>
       <div ref={refContainer}></div>
       </LayoutAdminDashboard>
    )
}