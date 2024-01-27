'use client'
import { useEffect, useRef } from "react"
import style from '@/app/styles/layoutUser.module.scss'
import Link from "next/link"

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
        <header className={style.header}> 
            <nav>
                <ul>
                    <Link href={'/dashboard'}>Home</Link>
                    <Link href={'/dashboard/createproduct'}>Criar Produto</Link>
                    <Link href={'/dashboard/createcategory'}>Criar Categoria</Link>
                </ul>

                <div className={style.userInfos}>
                <span ref={nameRef}></span>
                <span ref={ownerId}></span>
            </div>
            </nav>
        </header>
        <main>{children}</main>
        </>
    )
  }