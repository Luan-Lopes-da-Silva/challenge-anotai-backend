import { useRef } from "react";
import { Product } from "../types/types";
import Link from "next/link";
import style from '@/app/styles/marketplace.module.scss'

export function SearchResults({ searchProduct }: { searchProduct: Product[] }) {
    const testRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={testRef} className={style.main}>
            {searchProduct.map(product => (
                <article key={product.id} className={style.articleSearch}>
                    <h3>{product.title}</h3>
                    <img style={{ width: '90px', height: '90px' }} src={product.photo} alt="Product photo" />
                    <span>{product.price}</span>
                    <button>
                        <Link href={`/marketplace/product/${product.id}`}>VER PRODUTO</Link>
                    </button>
                </article>
            ))}
        </div>
    );
}