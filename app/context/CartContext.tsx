import { createContext, useContext,useEffect,useState} from "react";
import { GetCartItems } from "../utils/getLocalStorage";
import { NewProduct } from "../types/types";


type CartContextType = {
    numItensCart:number,
    updateCartNumber:()=>void,
    addToCart:(item:NewProduct)=>void
}

const CartContext = createContext<CartContextType|undefined>(undefined)

export const CartProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [numItensCart,setNumItensCart] = useState<NewProduct[]>([])
  

    useEffect(()=>{
    const cartItems = GetCartItems()
    setNumItensCart(cartItems)  
    },[])

    const addToCart = (item:NewProduct)=>{
        setNumItensCart((prevItems)=>[...prevItems,item])

        const localStoraItems = GetCartItems()
        localStoraItems.push(item)    
    }

    const value:CartContextType={
        numItensCart:numItensCart.length,
        updateCartNumber:()=>{

        },
        addToCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>


    
}

export const useCart = ():CartContextType=>{
    const context = useContext(CartContext)
    if(!context){
        throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
    }

    return context
}