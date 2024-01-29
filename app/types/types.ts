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