'use client'

import LayoutCustomer from "@/app/layouts/LayoutCostumer";
import { GetCartItems } from "@/app/utils/getLocalStorage";
import { useEffect, useRef } from "react";
import style from '@/app/styles/cart.module.scss'
import Link from "next/link";
import './globals.css'

export default function Page(){
    const tableContainer = useRef<HTMLDivElement>(null)
    const productDetailsContainer = useRef<HTMLDivElement>(null)
    const spanEmpty = useRef<HTMLSpanElement>(null)
    const deliveryRef = useRef<HTMLParagraphElement>(null)
    const cartSumary = useRef<HTMLDivElement>(null)
    const totalWithoutDelivery = useRef<HTMLParagraphElement>(null)
    const totalWithDelivery = useRef<HTMLParagraphElement>(null)
    function formatarNumeroComVirgulas(numero:number) {
       
        let numeroString = numero.toString();
      
       
        let negativo = false;
        if (numeroString[0] === '-') {
          negativo = true;
          numeroString = numeroString.slice(1); // Remove o sinal negativo temporariamente
        }
      
      
        const partes = numeroString.split('.');
        let parteInteira = partes[0];
        const parteDecimal = partes[1] || '';
      
       
        const tamanhoParteInteira = parteInteira.length;
        let contador = 0;
        let resultado = '';
        for (let i = tamanhoParteInteira - 1; i >= 0; i--) {
          resultado = parteInteira[i] + resultado;
          contador++;
      
        
          if (contador % 3 === 0 && i !== 0) {
            resultado = ',' + resultado;
          }
        }
      
        
        if (negativo) {
          resultado = '-' + resultado;
        }
      
        if (parteDecimal) {
          resultado += '.' + parteDecimal;
        }
      
        return resultado;
      }

    useEffect(()=>{
        async function cartDetails() {
        const localCart = GetCartItems()
        const totalArray = []
        if(localCart.length>0){
            if(tableContainer.current && spanEmpty.current && productDetailsContainer.current){
                tableContainer.current.style.display = 'block'
                spanEmpty.current.innerText = ''

                for(let i=0; i<localCart.length;i++){

                const isolatedPrice = localCart[i].price
                const firstRegex = isolatedPrice.replace(/[R$]/gm,'')
                const finalRegex = firstRegex.replace(/,\d{1,}/gm,'')
                const account = Number(finalRegex) * Number(localCart[i].quantity)    
                
                totalArray.push(account)
                const rowProduct = document.createElement('article')
                
                const photoContainer = document.createElement('div')
                const productPhoto = document.createElement('img')
                productPhoto.style.width = '100px'
                productPhoto.style.height = '100px'
                productPhoto.alt = 'product photo'
                productPhoto.src = localCart[i].photo

                const productName = document.createElement('p')
                productName.innerText = localCart[i].title
                
                const productQuantity = document.createElement('span')
                productQuantity.innerText = localCart[i].quantity

                const productPrice = document.createElement('span')
                productPrice.innerText = localCart[i].price
                const totalPrice = document.createElement('span')
                totalPrice.innerText = `R$ ${account},00`
                
                
                photoContainer.append(productPhoto,productName)
                rowProduct.append(photoContainer,productQuantity,productPrice)
                productDetailsContainer.current.append(rowProduct)
                }
            }
        }else{
            if(tableContainer.current && spanEmpty.current){
                tableContainer.current.style.display = 'none'
                spanEmpty.current.innerText = 'Carrinho vazio'
            }
        } 
        const reduceTotal = totalArray.reduce((acc,cur)=>{
            return acc+cur
        },0)

        const formatedNumber = formatarNumeroComVirgulas(reduceTotal)
        
        if(totalWithoutDelivery.current && totalWithDelivery.current && deliveryRef.current){
            totalWithoutDelivery.current.innerText = `R$ ${formatedNumber}`
            const value = deliveryRef.current.innerText 
            const withoutCoin = value.replace(/R\$/gm,'')
            const withoutSeparator = withoutCoin.replace(/,\d{1,}/gm,'')
            const valueWithDelivery = Number(reduceTotal)+Number(withoutSeparator)
            const formateDelivery = formatarNumeroComVirgulas(valueWithDelivery)
            totalWithDelivery.current.innerText = `R$ ${formateDelivery}`
        } 
        }

        cartDetails()
    })
    return(
        <LayoutCustomer>
            <div className={style.container}>
            <h2>Carrinho</h2>
            <main>
                <span ref={spanEmpty}></span>
                <div ref={tableContainer} className={style.table}>
                    <div className={style.headerTable}>
                        <span>Detalhes do produto</span>
                        <span>Quantidade</span>
                        <span>Preço</span>
                    </div>
                    <section ref={productDetailsContainer} className={style.detailsProduct}>
                    </section>
                </div>

                <div className={style.cartSummary} ref={cartSumary}>
                    <h4>Resumo do Carrinho</h4>
                    <span></span>

                    <div>
                    <p>Subtotal</p>
                    <p ref={totalWithoutDelivery}></p>
                    </div>

                    <div>
                    <p>Entrega</p>
                    <p ref={deliveryRef}>R$ 10,00</p>
                    </div>

                    <div>
                    <p>Total</p>
                    <p ref={totalWithDelivery}></p>
                    </div>

                    <button><Link href={'cartPage/finalforms'}>CHECK OUT</Link></button>
                </div>
            </main>
            </div>
        </LayoutCustomer>
    )
}