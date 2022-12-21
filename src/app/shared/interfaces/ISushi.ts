export interface ISushi {
    id: string,
    name: string,
    price: number,
    oldPrice?: number,
    weight: number,
    img: string,
    bigImg: string,
    composition: string,
    
}

export interface ICartSushi {
    id: string,
    name: string,
    price: number,
    img: string,
    category: string,
    counter: number
}