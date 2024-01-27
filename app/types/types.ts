export type Owner = {
    id: string | number
    name : string
    email : string
    password : string
    Ownerid : string
}

export type Product = {
    id : string
    title : string
    description : string
    price : string
    category : string
    ownerid : string
}

export type Category = {
    id : string
    title : string
    description : string
    ownerid : string
}