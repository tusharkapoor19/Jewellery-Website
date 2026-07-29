import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types";

import "./ProductGrid.css";

interface ProductGridProps {

    products: Product[];

}

const ProductGrid = ({ products }: ProductGridProps) => {

    if(products.length===0){

        return(

            <div className="empty-products">

                <h2>

                    No Products Found

                </h2>

                <p>

                    Please check back later.

                </p>

            </div>

        );

    }

    return(

        <section className="product-grid">

            {

                products.map(product=>(

                    <ProductCard

                        key={product.productID}

                        product={product}

                    />

                ))

            }

        </section>

    );

};

export default ProductGrid;