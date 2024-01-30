'use client'
import { Product } from "@/app/types/types"
import Image from "next/image"
import { FormEvent, useEffect,useRef, useState } from "react"

export default function Page({params}:any){
    const refName = useRef<HTMLHeadingElement>(null)
    const refPhoto =useRef<HTMLImageElement>(null)
    const refPrice = useRef<HTMLSpanElement>(null)
    const refDescription = useRef<HTMLParagraphElement>(null)
    const refQuantity =  useRef<HTMLSpanElement>(null)
    const [quantity,setQuantity] = useState(0)
    useEffect(()=>{
    async function productInfos() {
        const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
        const conversedProduct:Product[] = await dbProduct.json()
        
        
        if(refName.current && refPhoto.current && refDescription.current && refPrice.current && refQuantity.current){
            refName.current.innerText = conversedProduct[0].title 
            refPhoto.current.style.width = '500px'
            refPhoto.current.style.height = '500px'
            refPhoto.current.alt = 'Product photo'
            refPhoto.current.src = conversedProduct[0].photo
            refDescription.current.innerText = conversedProduct[0].description
            refPrice.current.innerText = conversedProduct[0].price
            if(Number(conversedProduct[0].quantity) === 0){
                refQuantity.current.innerText = `Produto Esgotado`
            }else{
                refQuantity.current.innerText = `Peças restantes : ${conversedProduct[0].quantity}`

            }
        }
    }
    productInfos()
    },[])

    async function buyProduct(ev:FormEvent) {
    ev.preventDefault()
    const dbProduct = await fetch(`http://localhost:3333/products/${params.id}`)
    const conversedProduct:Product[] = await dbProduct.json()
    const account = Number(conversedProduct[0].quantity) - quantity
    const updateQuantity = await fetch(`http://localhost:3333/quantity/${params.id}`,{
        method: "PUT",
        body: JSON.stringify({
            quantity: `${account}`
        }),
        headers:{
          "Content-Type": "application/json"
        }
      })
      
      if (updateQuantity.status === 200) {
          alert('Produto comprado com sucesso')
          setTimeout(() => {
            location.reload()
          }, 2000);
      } else {
          alert('Erro no servidor')
      }
    }
    return(
        <main>
        <section>
            <article>
                <h1 ref={refName}></h1>
                <Image
                alt="Product Photo"
                src={''}
                ref={refPhoto}
                width={500}
                height={500}
                />
                <p ref={refDescription}></p>
            </article>
            <article>
                <span ref={refPrice} style={{display:'block'}}></span>
                <span ref={refQuantity} style={{display:'block'}}></span>
                <form onSubmit={(ev)=>buyProduct(ev)}>
                <input 
                type="number" 
                value={quantity}
                onChange={(ev)=>setQuantity(Number(ev.currentTarget.value))}
                />
                <button>Comprar</button>
                </form>
             
              
            </article>
        </section>
        </main>
    )
}