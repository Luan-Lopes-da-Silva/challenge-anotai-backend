'use client'
import { NewProduct, Product } from "@/app/types/types"
import Image from "next/image"
import { FormEvent, useEffect,useRef, useState } from "react"
import style from '@/app/styles/pageProduct.module.scss'
import LayoutCustomer from "@/app/layouts/LayoutCostumer"
import { GetCartItems, GetCustomer } from "@/app/utils/getLocalStorage"
import {Toaster, toast} from 'react-hot-toast'
import CountCartItem from "@/app/utils/countCart"
import Link from "next/link"
import cartImg from '@/public/shopping_bag_FILL0_wght400_GRAD0_opsz24.svg'
import menuSvg from '@/public/more_vert_FILL0_wght400_GRAD0_opsz24.svg'


export default function Page({params}:any){
    const refName = useRef<HTMLHeadingElement>(null)
    const refPhoto =useRef<HTMLImageElement>(null)
    const refPrice = useRef<HTMLSpanElement>(null)
    const [quantity,setQuantity] = useState(0)
    const refCount = useRef<HTMLSpanElement>(null)
    const refAvatar = useRef<HTMLDivElement>(null)
    const refHideMenu = useRef<HTMLDivElement>(null)

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
    

    useEffect(()=>{

        function countItems(){
            const getItemsCart = CountCartItem()

            if(!localStorage.getItem('cart-items')){
                if(refCount.current){
                    refCount.current.innerText = `0`
                    }
            }
            if(refCount.current){
            refCount.current.innerText = `${getItemsCart}`
            }
        }

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

    async function productInfos() {
        const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
        const conversedProduct:Product[] = await dbProduct.json()    
        if(refName.current && refPhoto.current && refPrice.current){
            refName.current.innerText = conversedProduct[0].title 
            refPhoto.current.style.width = '500px'
            refPhoto.current.style.height = '500px'
            refPhoto.current.alt = 'Product photo'
            refPhoto.current.src = conversedProduct[0].photo
            refPrice.current.innerText = conversedProduct[0].price
        
            if(Number(conversedProduct[0].quantity) === 0){
                if (refPrice.current) {
                    refPrice.current.innerText = 'Produto Esgotado'
                }
            }
        
        }       
    }

    insertInfos()
    productInfos()
    countItems()
    },[])

    async function buyProduct(ev:FormEvent) {
    ev.preventDefault()
    const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
    const conversedProduct:Product[] = await dbProduct.json() 
    }

    async function addInCart(){
    const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
    const conversedProduct:Product[] = await dbProduct.json() 
    const newArray = []


    const newItem:NewProduct = {
    photo: conversedProduct[0].photo,
    price : conversedProduct[0].price,
    quantity : `${quantity}`,
    title : conversedProduct[0].title,
    id: conversedProduct[0].id
    } 
    
    const cartItemsLocal = GetCartItems()
    const sameItem = cartItemsLocal.filter(carItem=>(carItem.id === newItem.id))
    

    
    if(sameItem.length>0){
        const sameItemQuantity:NewProduct = {
            id:sameItem[0].id,
            photo: sameItem[0].photo,
            price: sameItem[0].price,
            title: sameItem[0].title,
            quantity : `${Number(sameItem[0].quantity) + quantity}`
        }

        const sameItemIndex = cartItemsLocal.findIndex(function(element){
            return element.id === newItem.id
        })
    
        cartItemsLocal.splice(sameItemIndex,1)
    
        cartItemsLocal.push(sameItemQuantity)

        for(let i=0; i<cartItemsLocal.length;i++){
            newArray.push(cartItemsLocal[i])
            localStorage.setItem('cart-items',JSON.stringify(newArray))
        }

       
        }else if(cartItemsLocal.length>0){
            for(let i=0; i<cartItemsLocal.length;i++){
                newArray.push(cartItemsLocal[i])
            }
                newArray.push(newItem)
                localStorage.setItem('cart-items',JSON.stringify(newArray))
               
        }else{
            newArray.push(newItem)
            localStorage.setItem('cart-items',JSON.stringify(newArray))
        }

        const getCart = CountCartItem()
        if(refCount.current){
            refCount.current.innerText = `${getCart}`
        }

        toast.success('Item adicionado ao carrinho com sucesso')

        }
    
    return(
        <>
        <Toaster position="bottom-right"/>
        <header className={style.header}>
            <nav>
                <h1>LOGO</h1>
                <ul>
                    <li>HOME</li>
                    <li>PRODUCTS</li>
                    <li>ABOUT US</li>
                </ul>
                <ul className={style.others}>
                    <div className={style.cart}>
                        <Link href={'/customer/marketplace/cartPage'}>
                        <Image
                        src={cartImg}
                        width={22}
                        height={22}
                        alt="cart svg"
                        />
                        <span ref={refCount}>
                        </span>
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
        <main>
        <section className={style.product}>
            <article>
                <Image
                alt="Product Photo"
                src={''}
                ref={refPhoto}
                width={500}
                height={500}
                />
                
            </article>
            <article className={style.secondColumn}>
                <h1 ref={refName}></h1>
                <span ref={refPrice} style={{display:'block'}}></span>
                <form onSubmit={(ev)=>buyProduct(ev)}>
                <label htmlFor="">Quantidade</label>
                <input 
                type="number" 
                value={quantity}
                onChange={(ev)=>setQuantity(Number(ev.currentTarget.value))}
                />
                <div className={style.buttons}>
                <button>Comprar</button>
                <button onClick={addInCart}>Adicionar no carrinho</button>
                </div>
                </form>
             
              
            </article>
        </section>
        </main>
        </>
    )
}

