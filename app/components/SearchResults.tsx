import { useRef } from "react";
import { Product } from "../types/types";
import Link from "next/link";

export function SearchResults({ searchProduct }: { searchProduct: Product[] }) {
    const testRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={testRef}>
            {searchProduct.map(product => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <img style={{ width: '90px', height: '90px' }} src={product.photo} alt="Product photo" />
                    <span>{product.price}</span>
                    <button>
                        <Link href={`/marketplace/product/${product.id}`}>VER PRODUTO</Link>
                    </button>
                </div>
            ))}
        </div>
    );
}