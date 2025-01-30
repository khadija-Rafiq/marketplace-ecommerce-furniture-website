

import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: any; // Adjust type based on your actual Sanity schema
  price: number;
}

const ProductListing = ({ product }: { product: Product }) => {
  return (
    <div>
      {/* Product Card */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <Link href={`/Product/${product.id}`}>
          <Image
            src={urlFor(product.image).url()} // Ensure URL conversion
            alt={product.name}
            height={300}
            width={300}
            className="h-[250px] w-full object-cover"
            priority // Improves image loading performance
          />
        </Link>
        {/* Product Details */}
        <div className="p-4 text-center">
          <p className="text-lg font-medium text-gray-800">{product.name}</p>
          <h3 className="text-xl font-semibold text-gray-900 mt-2">
            ${product.price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
