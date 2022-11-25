import Image from 'next/image'
import Link from "next/link";
import type { Url } from 'url'

type Products = {
  products: {
    featuredImage?: { url: Url };
    title?: string;
    priceRange?: { maxVariantPrice: { amount: GLfloat } };
  }
};

export default function ProductsList({ products }: Products) {
  return (
    <div className="container grid grid-cols-2 gap-1 mx-auto place-items-center space-y-2 lg:space-y-0 lg:grid-cols-4">
      {products.map((product) => (
        <div className="w-full rounded text-center" key={product.handle}>
          <Link
            className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
            href={`/products/${product.handle}`}
          >
            <Image
              src={`${product.featuredImage.url}`}
              alt={product.title}
              loading="lazy"
              width={250}
              height={250}
              className="m-auto"
            />
            <p>{product.title}</p>
            <p>$ {product.priceRange.maxVariantPrice.amount}</p>
          </Link>
        </div>
      ))}
    </div>
  )
};