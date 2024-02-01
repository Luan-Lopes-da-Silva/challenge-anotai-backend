'use client'

import LayoutCustomer from "@/app/layouts/LayoutCostumer";
import { FormEvent, useEffect, useRef, useState } from "react";
import style from '@/app/styles/finalForms.module.scss'
import { GetCartItems } from "@/app/utils/getLocalStorage";
import { Product } from "@/app/types/types";

export default function Page(){
    const refFirstForm = useRef<HTMLFormElement>(null)
    const refSecondForm = useRef<HTMLFormElement>(null)
    const refLastForm = useRef<HTMLFormElement>(null)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [street,setStreet] = useState('')
    const [neighborhood,setNeighborhood] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [numberCard,setNumberCard] = useState('')
    const [flagCard,setFlagCard] = useState('')
    const [terms,setTerms] = useState('')


    function formFocus(ev:any){
        setName(ev.currentTarget.value)
        if(refSecondForm.current && refLastForm.current){
            refSecondForm.current.style.opacity = '0.5'
            refLastForm.current.style.opacity = '0.5'
        }
    }

    function firstStep(ev:FormEvent){
    ev.preventDefault()
    if(name!='' && email!=''){
        if(refFirstForm.current && refSecondForm.current){
            refFirstForm.current.style.opacity = '0.5'
            refSecondForm.current.style.opacity = '1.0'
        }
    }else{
        alert('Preencha todos os campos')
    }
   
    }

    function secondStep(ev:FormEvent){
        ev.preventDefault()
        if (street!='' && neighborhood!='' && city!='' && state!='') {
            if(refLastForm.current && refSecondForm.current){
                refSecondForm.current.style.opacity = '0.5'
                refLastForm.current.style.opacity = '1.0'
            }
        } else {
            alert('Preencha todos os campos') 
        }
        
    }

    async function finishOrder(ev:FormEvent){
        ev.preventDefault()
       if(numberCard!='' && flagCard!='' && terms!=''){
       const cartItems = GetCartItems()
       for(let i = 0; i<cartItems.length; i++){
        const callApi = await fetch(`http://localhost:3333/products/${cartItems[i].id}`)
        const apiConversed:Product[] = await callApi.json() 
        if(cartItems[i].id === cartItems[i].id){
        const wishedProperty = 'quantity'
        const quantitys = cartItems.map(cartItem=>cartItem[wishedProperty])
        const result = quantitys.reduce((acc,cur)=>{
            return Number(acc) + Number(cur)
        },0)
    
        const account = Number(apiConversed[i].quantity) - result
        
      const changeQuantity = await fetch(`http://localhost:3333/quantity/${cartItems[i].id}`,{
          method: "PUT",
          body: JSON.stringify(
            {
              quantity:`${account}`
            }
          ),
          headers:{
            "Content-Type": "application/json"
          }
        })

    localStorage.removeItem('cart-items')
        }
       }
       }else{
        alert('Preencha todos os campos') 
       }
    }
    return(
    <LayoutCustomer>
        <div className={style.title}><h1>Finalizar pedido</h1></div>
        <main className={style.main}>
            <form onSubmit={(ev)=>firstStep(ev)} ref={refFirstForm}>
                <h2>Dados Pessoais</h2>
                <label htmlFor="">Nome</label>
                <input 
                type="text"
                value={name}
                onChange={(ev)=>formFocus(ev)}
                />
                <label htmlFor="">Email</label>
                <input 
                type="text" 
                value={email}
                onChange={(ev)=>setEmail(ev.currentTarget.value)}
                />
                <button>PROXIMO FORM</button>
            </form>
            <form onSubmit={(ev)=>secondStep(ev)} ref={refSecondForm}>
                <h2>Dados de Entrega</h2>
                <label htmlFor="">Nome da Rua</label>
                <input 
                type="text" 
                value={street}
                onChange={(ev)=>setStreet(ev.currentTarget.value)}
                />
                <label htmlFor="">Bairro</label>
                <input 
                type="text" 
                value={neighborhood}
                onChange={(ev)=>setNeighborhood(ev.currentTarget.value)}
                />
                <label htmlFor="">Cidade</label>
                <input 
                type="text" 
                value={city}
                onChange={(ev)=>setCity(ev.currentTarget.value)}
                />
                <label htmlFor="">Estado</label>
                <input 
                type="text" 
                value={state}
                onChange={(ev)=>setState(ev.currentTarget.value)}
                />
                <button>PROXIMO FORM</button>
            </form>
            <form onSubmit={(ev)=>finishOrder(ev)} ref={refLastForm}>
                <h2>Dados de Pagamento</h2>
                <label htmlFor="">Numero do cartão de credito</label>
                <input 
                type="text" 
                value={numberCard}
                onChange={(ev)=>setNumberCard(ev.currentTarget.value)}
                />
                <label htmlFor="">Bandeira do cartão</label>
                <input 
                type="text" 
                value={flagCard}
                onChange={(ev)=>setFlagCard(ev.currentTarget.value)}
                />
                <label htmlFor="">Numero de Parcelas</label>
                <input 
                type="text" 
                value={terms}
                onChange={(ev)=>setTerms(ev.currentTarget.value)}
                />
                <button>FAZER PEDIDO</button>
            </form>
        </main>
    </LayoutCustomer>
    )
}