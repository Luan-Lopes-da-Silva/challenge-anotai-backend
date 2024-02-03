'use client'

import LayoutCustomer from "@/app/layouts/LayoutCostumer";
import { FormEvent, useEffect, useRef, useState } from "react";
import style from '@/app/styles/finalForms.module.scss'
import { GetCartItems } from "@/app/utils/getLocalStorage";
import { Product } from "@/app/types/types";    
import boleto from '@/public/gerar-boleto-com-codigo-de-barras.png'
import Image from "next/image";
import pixSvg from '@/public/qr-pix.svg'

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
    const [ownerCard,setOwnerCard] = useState('')
    const [cvv,setCvv] = useState('')
    const [expireDate,setExpireDate] = useState('')
    const [tab,setTab] = useState('BOLETO')
    const [pix,setPix] = useState('')
    const[ticket,setTicket] = useState('')

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
        if(ticket!=='' || numberCard!=='' && ownerCard!=='' && cvv!=='' && expireDate!==''|| pix!==''){
            const cartItems = GetCartItems()
            for(let i = 0; i<cartItems.length; i++){
             const callApi = await fetch(`http://localhost:3333/products/${cartItems[i].id}`)
           const apiConversed:Product[] = await callApi.json()
           
           const quantitys = cartItems[i].quantity
       
           const account = Number(apiConversed[0].quantity) - Number(quantitys)
           
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
          alert('Pedido feito com sucesso')
            setTimeout(() => {
            window.location.reload()    
        }, 1000);
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
                <div>
            <div className={style.headerTable}>
                <span onClick={(ev)=>setTab(ev.currentTarget.innerText)}>BOLETO</span>
                <span onClick={(ev)=>setTab(ev.currentTarget.innerText)} >CARTÃO DE CREDITO</span>
                <span onClick={(ev)=>setTab(ev.currentTarget.innerText)}>PIX</span>
            </div>
            <div>
                {tab==='BOLETO'?(
                <div>
                    <Image
                    alt="boleto img"
                    width={400}
                    height={300}
                    src={boleto}
                    onClick={(ev)=>setTicket(ev.currentTarget.src)}
                    />
                    <button>FINALIZAR PEDIDO</button>
                </div>
                ):(
                <div></div>
                )}

                {tab==='CARTÃO DE CREDITO'?(
                <div>
                    <label htmlFor="">Numero Cartão</label>
                    <input 
                    type="text"  
                    placeholder="Numero cartão (APENAS NUMEROS)"
                    value={numberCard}
                    onChange={(ev)=>setNumberCard(ev.currentTarget.value)}
                    />
                    <label htmlFor="">Nome titular do cartão</label>
                    <input 
                    type="text"  
                    placeholder="Nome do titular"
                    value={ownerCard}
                    onChange={(ev)=>setOwnerCard(ev.currentTarget.value)}
                    />
                    <label htmlFor="">CVV</label>
                    <input 
                    type="text"  
                    placeholder="Codigo de segurança"
                    value={cvv}
                    onChange={(ev)=>setCvv(ev.currentTarget.value)}
                    />
                    <label htmlFor="">DATA DE VALIDADE</label>
                    <input 
                    type="text"  
                    placeholder="Data de validade (MM/YYYY)"
                    value={expireDate}
                    onChange={(ev)=>setExpireDate(ev.currentTarget.value)}
                    />
                    <button>FINALIZAR PEDIDO</button>
                </div>
                ):(
                <div></div>
                )} 

                {tab==='PIX'?(
                <div>
                    <p>O seu QR CODE tem duração de até 30 minutos depois desse tempo você tera que gerar um novo pedido.</p>
                    <Image
                    alt="qr-code img"
                    width={400}
                    height={300}
                    src={pixSvg}
                    onClick={(ev)=>setPix(ev.currentTarget.src)}
                    />
                       <p>Codigo pix: ed5c04515aa9e3a87d54dc2fbd76da339f0ba0dc5f54deb97212
                       ceea0f2ecab35a8270f9a89a16f1b0fbb76aa74c4d6008f54d67
                       1ce2cf6eee74de9d012f0bd6da5f5fa7fc18e478b9396e59e7db
                       280dbacc2b66beb978c6dc97941f324bea0c44192b2b421fdc9e
                       79a44843748f310644ed255a0a9fa7d8de05eeaadd91a99e04a5</p>
                    <button>FINALIZAR PEDIDO</button>
                </div>
                ):(
                <div></div>
                )}   
            </div>
        </div>
            </form>
        </main>
    </LayoutCustomer>
    )
}