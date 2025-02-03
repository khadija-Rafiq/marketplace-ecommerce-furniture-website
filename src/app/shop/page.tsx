

// 'use client';
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { ChevronRight } from 'lucide-react';
// import { client } from '@/sanity/lib/client';
// import Link from 'next/link';
// import Swal from 'sweetalert2';
// import { Product } from '@/types/products';
// import { addToCart } from '../actions/action';
// import SearchAndFilter from '@/components/SearchAndFilter';

// // Fetch products from Sanity
// const fetchProducts = async (): Promise<Product[]> => {
//   const query = `*[_type == "product"]{
//     category,
//     _id,
//     price,
//     description,
//     stockLevel,
//      "imagePath": image.asset->url,
//      image,
//     discountPercentage,
//     isFeaturedProduct,
//     name
//   }`;
//   return await client.fetch(query);
// };

// const Page = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       const fetchedProducts = await fetchProducts();
//       setProducts(fetchedProducts);
//       setFilteredProducts(fetchedProducts);
//     };
//     getProducts();
//   }, []);

//   const handleAddToCart = (e: React.MouseEvent, product: Product) => {
//     e.preventDefault();
//     Swal.fire({
//       position: 'top-right',
//       icon: 'success',
//       title: `${product.productName} added to cart`,
//       showConfirmButton: false,
//       timer: 1000,
//     });
//     addToCart(product);
//   };

//   return (
//     <div className="mx-auto px-4">
//       {/* Top Name Section */}
//       <div className="bg-[url('/Rectangle-1.png')] bg-cover bg-center h-[400px] my-8 flex justify-center items-center">
//         <div className="flex flex-col justify-center items-center">
//           <Image src="/Group-55.png" width={100} height={100} alt="shop" />
//           <p className="flex text-xl justify-center items-center">
//             <strong>Home</strong>
//             <ChevronRight /> Shop
//           </p>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <SearchAndFilter products={products} onFilteredProducts={setFilteredProducts} />

//       {/* Product Listing */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
//         {filteredProducts.map((product) => (
//           <div key={product._id} className="bg-slate-50 rounded-lg p-4 w-[280px] h-[380px] flex flex-col items-center">
//             <Link href={`/products/${product._id}`}>
            
//             <Image
//             src={product.imagePath || ""}
//   width={250}
//   height={250}
//   alt={product.productName || 'Product Image'}
//   className="rounded-xl object-cover w-[250px] h-[250px]"
// />
//             </Link>
//             <div className="text-lg font-semibold mt-2">{product.productName}</div>
//             <div className="font-bold text-lg text-end">${product.price}</div>
//             <button
//               onClick={(e) => handleAddToCart(e, product)}
//               className="mt-2 w-full bg-gradient-to-r text-white from-blue-600 to-purple-500 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Section */}
//       <div className="flex justify-center gap-4 my-8">
//         <span className="px-6 py-2 rounded-lg text-xl bg-light_skin cursor-pointer">1</span>
//         <span className="px-6 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">2</span>
//         <span className="px-6 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">3</span>
//         <span className="px-6 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">Next</span>
//       </div>
//     </div>
//   );
// };

// export default Page;








'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Product } from '@/types/products';
import { addToCart } from '../actions/action';
import SearchAndFilter from '@/components/SearchAndFilter';

// Fetch products from Sanity
const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]{
    category,
    _id,
    price,
    description,
    stockLevel,
     "imagePath": image.asset->url,
     image,
    discountPercentage,
    isFeaturedProduct,
    name
  }`;
  return await client.fetch(query);
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    getProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: `${product.productName} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <div className="mx-auto px-4 max-w-screen-2xl">
      {/* Top Name Section */}
      <div className="bg-[url('/Rectangle-1.png')] bg-cover bg-center h-[300px] sm:h-[400px] my-8 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <Image src="/Group-55.png" width={100} height={100} alt="shop" />
          <p className="flex text-xl justify-center items-center">
            <strong>Home</strong>
            <ChevronRight /> Shop
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchAndFilter products={products} onFilteredProducts={setFilteredProducts} />

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-slate-50 rounded-lg p-4 w-full max-w-[300px] flex flex-col items-center h-full min-h-[450px]">
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.imagePath || ""}
                width={250}
                height={250}
                alt={product.productName || 'Product Image'}
                className="rounded-xl object-cover w-full h-[250px]"
              />
            </Link>
            <div className="text-lg font-semibold mt-2 text-center">{product.productName}</div>
            <div className="font-bold text-lg text-end">${product.price}</div>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="mt-auto w-full bg-gradient-to-r text-white from-blue-600 to-purple-500 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center gap-4 my-8">
        <span className="px-6 py-2 rounded-lg text-xl bg-light_skin cursor-pointer">1</span>
        <span className="px-6 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">2</span>
        <span className="px-6 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">3</span>
        <span className="px-6 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">Next</span>
      </div>
    </div>
  );
};

export default Page;
