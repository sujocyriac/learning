import { getProductDetails } from "./product";
import { Category} from "./product.type";

const productId = 1;
const product = getProductDetails(productId);

if (product?.productCategory === Category.Electronics) {
     console.log(`Product ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Category: ${product.productCategory}`);
}
