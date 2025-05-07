import { Product, Category} from "./product.type";


export const productData: Product[] = [
    { id: 1, name: "Laptop", price: 1000, productCategory: Category.Electronics },
    { id: 2, name: "Phone", price: 500, productCategory: Category.Electronics },
    { id: 3, name: "Tablet", price: 300, productCategory: Category.Clothing },
];

export function getProductDetails(productId: number): Product | undefined {
    return productData.find(product => product.id === productId);
}