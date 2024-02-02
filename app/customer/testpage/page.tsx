'use client'
import { useState } from "react"

export default function Page(){
    const [tab,setTab] = useState('')
    return(
        <div>
            <div>
                <span onClick={(ev)=>setTab(ev.currentTarget.innerText)}>BOLETO</span>
                <span onClick={(ev)=>setTab(ev.currentTarget.innerText)} >CARTÃO DE CREDITO</span>
                <span onClick={(ev)=>setTab(ev.currentTarget.innerText)}>PIX</span>
            </div>
            <div>
                {tab==='BOLETO'?(
                <div><h1>BOLETO</h1></div>
                ):(
                <div></div>
                )}

                {tab==='CARTÃO DE CREDITO'?(
                <div><h1>Cartao de credito</h1></div>
                ):(
                <div></div>
                )} 

                {tab==='PIX'?(
                <div><h1>PIX</h1></div>
                ):(
                <div></div>
                )}   
            </div>
        </div>
    )
}