'use client'
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import cartImg from '@/public/shopping_bag_FILL0_wght400_GRAD0_opsz24.svg'
import searchImg from '@/public/search_FILL0_wght400_GRAD0_opsz24.svg'
import style from '@/app/styles/customerDashboard.module.scss'
import { GetCartItems, GetCustomer } from "../utils/getLocalStorage"
import Link from "next/link"
import menuSvg from '@/public/more_vert_FILL0_wght400_GRAD0_opsz24.svg'
import { Product } from "../types/types"
import { SearchResults } from "../components/SearchResults"
import SearchBar from "../components/SearchInput"

export default function LayoutCustomer({
    children,
  }: {
    children: React.ReactNode
  }) {

    const countRef = useRef<HTMLSpanElement>(null)
    const refAvatar = useRef<HTMLDivElement>(null)
    const refHideMenu = useRef<HTMLDivElement>(null)
    const [search,setSearch] = useState('')
    const [searchProduct,setSearchProduct] = useState<Product[] | undefined>([])
    const testRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        function insertInfos(){
        const getLocalUser = GetCustomer()
            if(getLocalUser && refAvatar.current){
                const imgAvatar = document.createElement('img')
                imgAvatar.style.width = '60px'
                imgAvatar.style.height = '60px'
                imgAvatar.alt = 'Avatar photo'
                imgAvatar.src = getLocalUser.avatar
                imgAvatar.style.borderRadius = '50%'
                imgAvatar.style.objectFit = 'cover'

                const imgMenu = document.createElement('img')
                imgMenu.style.width = '40px'
                imgMenu.style.height = '40px'
                imgMenu.alt = 'Menu svg'
                imgMenu.src = menuSvg.src
                imgMenu.style.cursor = 'pointer'
                imgMenu.addEventListener('click',expandMenu)
                refAvatar.current.append(imgAvatar,imgMenu)
            }    
        }

        function insterInCart(){
            if(countRef.current){
                const localCart = GetCartItems()
                countRef.current.innerText = `${localCart.length}`
            }
        }

        insertInfos()
        insterInCart()
    },[])
    
    let count = 1
    
    function expandMenu(){
    count++
    if(count%2 === 0){
        if(refHideMenu.current && refAvatar.current){
        refHideMenu.current.style.display = 'block'
        refAvatar.current.style.backgroundColor = 'white'
        }
    }else{
        if(refHideMenu.current && refAvatar.current){
            refHideMenu.current.style.display = 'none'
            refAvatar.current.style.backgroundColor = 'transparent'
        }
    }
    }

    function Logout(){
        localStorage.removeItem('Usuario Logado')
        setTimeout(() => {
            window.location.href = 'login'
        }, 2000);
    }

 

    async function handleSearch(searchTerm:string){
        if(searchTerm!==''){
        const getDb = await fetch('http://localhost:3333/products')
        const convertDb:Product[] = await getDb.json()
        const searchProductInDb = convertDb.filter(product=>(product.title.startsWith(search)))
        setSearchProduct(searchProductInDb)
        setSearch(searchTerm)
       }
    }


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
                <ul className={style.others}>
                    <div className={style.search}>
                   <SearchBar onSearch={handleSearch}/>
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
                    <div className={style.avatar} ref={refAvatar}>
                    </div>

                    <div className={style.hide} ref={refHideMenu}>
                        <ul>
                            <li>MEU PERFIL</li>
                            <li onClick={Logout}>LOGOUT</li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </header>        
        
        {search!==''?
        (
            <SearchResults searchProduct={searchProduct}/>
        ):(
        <main>{children}</main>
        )}
        </>
    )
  }