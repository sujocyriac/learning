

export enum Category {
    Electronics = "Electronics",
    Clothing = "Clothing",
    Home = "Home" 
}

export interface Product {
    id: number;
    name: string;
    price: number;
    productCategory: Category;
}