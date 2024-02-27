'use client'

import { useEffect, useRef } from "react";
import LayoutAdminDashboard from "../layouts/LayoutDashboard";
import { Category, Product } from "../types/types";
import style from '@/app/styles/dashboardUser.module.scss'
import GetLocalStorage from "../utils/getLocalStorage";


export default function Page(){
    const categorysContainer = useRef<HTMLDivElement>(null)
    const productsContainer = useRef<HTMLDivElement>(null)
    const errorHeading = useRef<HTMLHeadingElement>(null)

    useEffect(()=>{
        async function printInfos() {
            try {
                const localUser = GetLocalStorage()
                const dbCategorys = await fetch('http://localhost:3333/categorys')
                const dbCategorysConversed:Category[] = await dbCategorys.json()
                const filterCategorys = dbCategorysConversed.filter(categorys=>(categorys.ownerid === localUser.ownerid))
                const dbProducts = await fetch('http://localhost:3333/products')
                const dbProductsConversed:Product[] = await dbProducts.json()
                const filterProducts = dbProductsConversed.filter(products=>(products.ownerid === localUser.ownerid))
              
            
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

                if(filterProducts.length>0){
                    if(errorHeading.current){
                        errorHeading.current.innerText = ''
                    }
                    
                    for(let i=0; i<filterProducts.length; i++){
                        const cardContainer  = document.createElement('article')
                        cardContainer.id = filterProducts[i].id
            
                        const titleProduct = document.createElement('p')
                        titleProduct.innerText = filterProducts[i].title
            
                        const productImage = document.createElement('img')
                        productImage.style.width = '200px'
                        productImage.style.height = '200px'
                        productImage.style.objectFit = 'cover'
                        productImage.alt = 'Product image'
                        productImage.src = filterProducts[i].photo
            
                  
            
                        const priceSpan = document.createElement('span')
                        priceSpan.innerText = `${filterProducts[i].price}`
            
                        const button = document.createElement('button')
                        button.innerHTML = `<a href ="dashboard/products/${filterProducts[i].id}">VER PRODUTO</a>` 
            
                        cardContainer.append(titleProduct,productImage,priceSpan,button)
            
                        if(productsContainer.current){
                            productsContainer.current.append(cardContainer)
                        }
                    }
                }else{
                    if(errorHeading.current){
                        errorHeading.current.innerText = 'Nenhum produto cadastrado'
                    }
                }
          
            } catch (error) {
                console.log(error)
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
                <div ref={productsContainer} className={style.product}>
                    <h2 ref={errorHeading}></h2>
                </div>
                </div>
            </div>
        </main>
        </LayoutAdminDashboard>
        </>
    )
}