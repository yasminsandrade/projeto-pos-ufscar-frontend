export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}

export interface RawProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}