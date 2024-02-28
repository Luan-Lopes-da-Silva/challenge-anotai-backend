'use client'

import { Product } from "@/app/types/types"
import { useEffect, useRef,useState } from "react"
import style from '@/app/styles/marketplace.module.scss'
import Link from "next/link"
import { GetCartItems, GetCustomer } from "@/app/utils/getLocalStorage"
import cartImg from '@/public/shopping_bag_FILL0_wght400_GRAD0_opsz24.svg'
import menuSvg from '@/public/more_vert_FILL0_wght400_GRAD0_opsz24.svg'
import Image from "next/image"
import { SearchResults } from "@/app/components/SearchResults"

export default function Market(){
    const productsContainer = useRef<HTMLDivElement>(null)

    const countRef = useRef<HTMLSpanElement>(null)
    const refAvatar = useRef<HTMLDivElement>(null)
    const refHideMenu = useRef<HTMLDivElement>(null)
    const [search,setSearch] = useState('')
    const [test,setTest] = useState('')
    const [searchProduct, setSearchProduct] = useState<Product[]>([]);
    const refInput = useRef<HTMLInputElement>(null)
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

            async function renderProducts() {
                const productsDb = await fetch('http://localhost:3333/products')
                const dbConversed:Product[] = await productsDb.json() 
                for(let i = 0; i<dbConversed.length;i++){
                 const productContainer = document.createElement('article')
                 productContainer.id = dbConversed[i].id
                 const nameProduct = document.createElement('h3')
                 nameProduct.innerText = dbConversed[i].title
        
                 const photoProduct = document.createElement('img')
                 photoProduct.style.width = '100px'
                 photoProduct.style.height = '100px'
                 photoProduct.style.objectFit = 'cover'
                 photoProduct.style.border = '2px solid #8ECAE6'
                 photoProduct.style.borderRadius = '8px'
                 photoProduct.alt = 'Product photo'
                 photoProduct.src = dbConversed[i].photo
                 photoProduct.src = dbConversed[i].photo
        
                 const priceProduct = document.createElement('p')
                 priceProduct.innerText = dbConversed[i].price
        
                 const button = document.createElement('button')
                 button.innerHTML = `<a href='marketplace/product/${dbConversed[i].id}'>VER PRODUTO</a>`
        
                 productContainer.append(nameProduct,photoProduct,priceProduct,button)
        
                 if(productsContainer.current){
                     productsContainer.current.append(productContainer) 
                 }
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
        renderProducts()
    },[])

    async function renderProducts() {
        const productsDb = await fetch('http://localhost:3333/products')
        const dbConversed:Product[] = await productsDb.json() 
        for(let i = 0; i<dbConversed.length;i++){
         const productContainer = document.createElement('article')
         productContainer.id = dbConversed[i].id
         const nameProduct = document.createElement('h3')
         nameProduct.innerText = dbConversed[i].title

         const photoProduct = document.createElement('img')
         photoProduct.style.width = '100px'
         photoProduct.style.height = '100px'
         photoProduct.style.objectFit = 'cover'
         photoProduct.style.border = '2px solid #8ECAE6'
         photoProduct.style.borderRadius = '8px'
         photoProduct.alt = 'Product photo'
         photoProduct.src = dbConversed[i].photo
         photoProduct.src = dbConversed[i].photo

         const priceProduct = document.createElement('p')
         priceProduct.innerText = dbConversed[i].price

         const button = document.createElement('button')
         button.innerHTML = `<a href='marketplace/product/${dbConversed[i].id}'>VER PRODUTO</a>`

         productContainer.append(nameProduct,photoProduct,priceProduct,button)

         if(productsContainer.current){
             productsContainer.current.append(productContainer) 
         }
        }
     }
   
    let count = 1
    
    function expandMenu(){
    count++
    if(count%2 === 0){
        if(refHideMenu.current && refAvatar.current){
        refHideMenu.current.style.display = 'block'
        refAvatar.current.style.backgroundColor = '#3E7994'
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

 

    async function handleSearch(ev:any){
        setTest(ev.currentTarget.value)
        if(ev.currentTarget.value !==''){
            const getDb = await fetch('http://localhost:3333/products')
            const convertDb:Product[] = await getDb.json()
            const searchProductInDb = convertDb.filter(product=>(product.title.startsWith(search)))
            setSearchProduct(searchProductInDb)  
        }else{
            renderProducts()
        }
    }
    
    return(
        <div>
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
                    <input 
                    type="text"  
                    placeholder="FAÇA SUA PESQUISA"
                    value={search}
                    onChange={(ev)=>setSearch(ev.currentTarget.value)}
                    onKeyUp={(ev)=>handleSearch(ev)}
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
        {test!==''?(
            <SearchResults searchProduct={searchProduct}/>
        ):(
           <main  className={style.main}>
            <div ref={productsContainer}></div>
           </main> 
        )}
        </div>
    )
}