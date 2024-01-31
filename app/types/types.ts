export type Owner = {
    id: string | number
    name : string
    email : string
    password : string
    ownerid : string
    avatar : string
}

export type Product = {
    id : string
    title : string
    description : string
    price : string
    category : string
    ownerid : string
    photo: string
    quantity : string
}

export type Category = {
    id : string
    title : string
    description : string
    ownerid : string
}

export type Customer = {
    id: string
    name: string
    email: string
    password : string
}

export type NewProduct = {
    title : string
    price : string
    photo: string
    quantity : string
}