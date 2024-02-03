import { NewProduct } from "../types/types";
import { GetCartItems } from "./getLocalStorage";

export default function CountCartItem(){
const getItems:NewProduct[] = GetCartItems()
return getItems.length
}