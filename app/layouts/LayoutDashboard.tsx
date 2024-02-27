'use client'
import { useEffect, useRef } from "react"
import style from '@/app/styles/layoutUser.module.scss'
import Link from "next/link"
import Image from "next/image"
import menuIcon from '@/public/more_vert_FILL0_wght400_GRAD0_opsz24.svg'
import GetLocalStorage from "../utils/getLocalStorage"

export default function LayoutAdminDashboard({
    children,
  }: {
    children: React.ReactNode
  }) {

    const nameRef = useRef<HTMLSpanElement>(null)
    const ownerId = useRef<HTMLSpanElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const openTogle =  useRef<HTMLDivElement>(null)
    const hideMenu =  useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(localStorage.getItem('Usuario Logado')){
            const localUser = GetLocalStorage()
            if(nameRef.current && ownerId.current && imgRef.current){
                nameRef.current.innerText= localUser.name
                ownerId.current.innerText = localUser.ownerid
                imgRef.current.style.width = '50px'
                imgRef.current.style.height = '50px'
                imgRef.current.alt = 'User photo'
                imgRef.current.src = localUser.avatar
            }
        }else{
            alert('Você não esta logado')
            window.location.href = '/login'
        }
    })


    function Logout(){
        alert('Você foi desconectado')
        localStorage.removeItem('Usuario Logado')
    setTimeout(() => {
       location.href = '/login'
    }, 1000);
    }

    let count = 1
    function expandMenu(){
    count++
    if(count%2==0){
        if(openTogle.current && hideMenu.current){
            openTogle.current.style.backgroundColor = '#3E7994'
            hideMenu.current.style.display = 'flex'
        }
    }else{
        if(openTogle.current && hideMenu.current){
            openTogle.current.style.backgroundColor = 'initial'
            hideMenu.current.style.display = 'none'
        }
    }
    }


    return(
        <>
        <header className={style.header}> 
            <nav>
                <ul>
                    <Link href={'/dashboard'}>Home</Link>
                    <Link href={'/dashboard/createproduct'}>Criar Produto</Link>
                    <Link href={'/dashboard/createcategory'}>Criar Categoria</Link>
                </ul>

               
                <div className={style.userInfos} ref={openTogle}>
                 <span ref={nameRef}></span>
                 <img  ref={imgRef}/>
                 <span ref={ownerId}></span>
                 <div className={style.toggle}>
                    <Image
                    alt="menu"
                    src={menuIcon}
                    width={10}
                    height={50}
                    onClick={expandMenu}
                    ></Image>
           
                </div>
                </div>
                
             
                <div className={style.hide} ref={hideMenu}>
                    <ul>
                        <span onClick={Logout}>Logout</span>
                        <span>Meu Perfil</span>
                    </ul>
                </div>
            </nav>
        </header>
        <main>{children}</main>
        </>
    )
  }