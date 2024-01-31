'use client'
import Image from "next/image"
import { useEffect, useRef } from "react"
import cartImg from '@/public/shopping_bag_FILL0_wght400_GRAD0_opsz24.svg'
import search from '@/public/search_FILL0_wght400_GRAD0_opsz24.svg'
import style from '@/app/styles/customerDashboard.module.scss'
import { GetCartItems } from "../utils/getLocalStorage"
import Link from "next/link"

export default function LayoutCustomer({
    children,
  }: {
    children: React.ReactNode
  }) {

    const countRef = useRef<HTMLSpanElement>(null)

    useEffect(()=>{
        function insterInCart(){
            if(countRef.current){
                const localCart = GetCartItems()
                countRef.current.innerText = `${localCart.length}`
            }
        }

        insterInCart()
    })

    return(
        <>
        <header className={style.header}>
            <nav>
                <h1>LOGO</h1>
                <ul>
                    <li>HOME</li>
                    <li>PRODUCTS</li>
                    <li>ABOUT US</li>
                </ul>
                <ul>
                    <div className={style.search}>
                    <input type="text" />
                    <Image
                    src={search}
                    width={18}
                    height={18}
                    alt="search svg"
                    />
                    </div>
                    <div className={style.cart}>
                        <Link href={'/customer/marketplace/cartPage'}>
                        <Image
                        src={cartImg}
                        width={22}
                        height={22}
                        alt="cart svg"
                        />
                        <span ref={countRef}></span>
                        </Link>
                   
                    </div>
                </ul>
            </nav>
        </header>        
        <main>{children}</main>
        </>
    )
  }