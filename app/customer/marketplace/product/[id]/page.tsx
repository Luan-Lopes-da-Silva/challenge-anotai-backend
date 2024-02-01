'use client'
import { NewProduct, Product } from "@/app/types/types"
import Image from "next/image"
import { FormEvent, useEffect,useRef, useState } from "react"
import style from '@/app/styles/pageProduct.module.scss'
import LayoutCustomer from "@/app/layouts/LayoutCostumer"

type ArrayType = NewProduct[]
export default function Page({params}:any){
    const refName = useRef<HTMLHeadingElement>(null)
    const refPhoto =useRef<HTMLImageElement>(null)
    const refPrice = useRef<HTMLSpanElement>(null)
    const refDescription = useRef<HTMLParagraphElement>(null)
    const refQuantity =  useRef<HTMLSpanElement>(null)
    const [quantity,setQuantity] = useState(0)
    const [myProducts,setMyProducts]= useState<ArrayType>([])

    useEffect(()=>{
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
    productInfos()
    },[])

    async function buyProduct(ev:FormEvent) {
    ev.preventDefault()
    const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
    const conversedProduct:Product[] = await dbProduct.json() 
    }

    async function addInCart(){
    const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
    const conversedProduct:Product[] = await dbProduct.json() 
    
    const newItem:NewProduct = {
    photo: conversedProduct[0].photo,
    price : conversedProduct[0].price,
    quantity : `${quantity}`,
    title : conversedProduct[0].title,
    id: conversedProduct[0].id
    } 
    
    const adicionarItem = () => {
        setMyProducts((prevArray) => [...prevArray, newItem]);
    };

    adicionarItem()

    localStorage.setItem('cart-items',JSON.stringify(myProducts))
    }
    
    return(
        <LayoutCustomer>
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
        </LayoutCustomer>
    )
}