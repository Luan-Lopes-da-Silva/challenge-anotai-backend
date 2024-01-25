'use client'
import { useEffect, useRef } from "react"

export default function LayoutAdminDashboard({
    children,
  }: {
    children: React.ReactNode
  }) {

    const nameRef = useRef<HTMLSpanElement>(null)
    const ownerId = useRef<HTMLSpanElement>(null)

    useEffect(()=>{
        if(localStorage.getItem('Usuario Logado')){
            const localUser = JSON.parse(localStorage.getItem('Usuario Logado'))
            if(nameRef.current && ownerId.current){
                nameRef.current.innerText= localUser.name
                ownerId.current.innerText = localUser.Ownerid
            }
        }else{
            alert('Você não esta logado')
            window.location.href = '/login'
        }
    })


    return(
        <>
        <header>
            <nav>
                <ul>
                    <li>Criar Produto</li>
                    <li>Criar Categoria</li>
                </ul>
            </nav>
            <div>
                <span ref={nameRef}></span>
                <span ref={ownerId}></span>
            </div>
        </header>
        <main>{children}</main>
        </>
    )
  }