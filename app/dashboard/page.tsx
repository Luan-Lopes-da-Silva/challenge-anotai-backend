'use client'

import { useEffect, useRef } from "react";
import LayoutAdminDashboard from "../layouts/LayoutDashboard";
import { Category, Owner, Product } from "../types/types";
import style from '@/app/styles/dashboardUser.module.scss'


export default function Page(){
    const categorysContainer = useRef<HTMLDivElement>(null)
    const productsContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        async function printInfos() {
        const localUser:Owner = JSON.parse(localStorage.getItem('Usuario Logado'))
        const dbCategorys = await fetch('http://localhost:3333/categorys')
        const dbCategorysConversed:Category[] = await dbCategorys.json()
        const filterCategorys = dbCategorysConversed.filter(categorys=>(categorys.ownerid === localUser.Ownerid))
        const dbProducts = await fetch('http://localhost:3333/products')
        const dbProductsConversed:Product[] = await dbProducts.json()
        const filterProducts = dbProductsConversed.filter(products=>(products.ownerid === localUser.Ownerid))

        for (let i = 0; i<filterCategorys.length; i++){
            const filterQuantityOfProductS = filterProducts.filter(product=>(product.category === filterCategorys[i].title))
            
            const cardContainer  = document.createElement('div')
            cardContainer.id = filterCategorys[i].id

            const nameCategory = document.createElement('h3')
            nameCategory.innerText = filterCategorys[i].title

            const descriptionCategory = document.createElement('p')
            descriptionCategory.innerText = filterCategorys[i].description

            const quantitySpan = document.createElement('span')
            quantitySpan.innerText = `Quantidade de produtos nessa categoria: ${filterQuantityOfProductS.length} produtos`

            cardContainer.append(nameCategory,descriptionCategory,quantitySpan)

            if(categorysContainer.current){
                categorysContainer.current.append(cardContainer)
            }
        }

        for(let i=0; i<filterProducts.length; i++){
            const cardContainer  = document.createElement('div')
            cardContainer.id = filterProducts[i].id

            const titleProduct = document.createElement('h3')
            titleProduct.innerText = filterProducts[i].title

            const descriptionProduct = document.createElement('p')
            descriptionProduct.innerText = filterProducts[i].description
            
            const categoryProduct = document.createElement('span')
            categoryProduct.innerText = `Categoria do produto : ${filterProducts[i].category}`

            const priceSpan = document.createElement('span')
            priceSpan.innerText = `Preço do produto ${filterProducts[i].price}`

            const button = document.createElement('button')
            button.innerHTML = `<a href ="dashboard/products/${filterProducts[i].id}">VER PRODUTO</a>` 

            cardContainer.append(titleProduct,descriptionProduct,categoryProduct,priceSpan,button)

            if(productsContainer.current){
                productsContainer.current.append(cardContainer)
            }
        }
        }
        printInfos()
        
    },[])

    return(
        <>
        <LayoutAdminDashboard>
        <main className={style.main}>
            <div className={style.cards}>
                <div className={style.container}>
                <h1>Categorias cadastradas</h1>
                <div  ref={categorysContainer}>
                </div>
                </div>

                <div className={style.container}>
                <h1>Produtos cadastrados</h1>
                <div ref={productsContainer}>
                </div>
                </div>
            </div>
        </main>
        </LayoutAdminDashboard>
        </>
    )
}