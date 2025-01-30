

// 'use client';
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { ChevronRight, GalleryVertical, LayoutGrid, SlidersHorizontal } from 'lucide-react';
// import { client } from '@/sanity/lib/client';
// import Link from 'next/link';
// import Swal from 'sweetalert2';
// import { Product } from '@/types/products';
// import { addToCart } from '../actions/action';

// // Fetch products from Sanity
// const fetchProducts = async (): Promise<Product[]> => {
//   const query = `*[_type == "product"]{
//     category,
//     _id,
//     price,
//     description,
//     stockLevel,
//     "imagePath": image.asset->url,
//     discountPercentage,
//     isFeaturedProduct,
//     name
//   }`;
//   return await client.fetch(query);
// };

// const Page = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       const fetchedProducts = await fetchProducts();
//       setProducts(fetchedProducts);
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
//     <div className="mx-auto">
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

//       {/* Filter Section */}
//       <div className="bg-palePink py-4 lg:px-20 px-4 flex justify-between">
//         <div className="flex lg:gap-x-7 gap-x-4">
//           <div className="flex gap-x-4 items-center">
//             <SlidersHorizontal />
//             <span className="text-2xl font-semibold">Filter</span>
//           </div>
//           <LayoutGrid />
//           <GalleryVertical />
//           <div className="border-r-2 h-10 border-gray-500" />
//           <p className="lg:text-lg text-sm">Showing 1–16 of {products.length} results</p>
//         </div>
//         <div className="lg:flex hidden gap-x-8">
//           <div className="flex gap-x-4 items-center">
//             <p className="text-lg">Show</p>
//             <div className="bg-white px-4 py-3 text-gray-500">16</div>
//           </div>
//           <div className="flex gap-x-4 items-center">
//             <p className="text-lg">Sort by</p>
//             <span className="bg-white py-3 pr-16 pl-4 text-gray-500">Default</span>
//           </div>
//         </div>
//       </div>

//       {/* Product Section */}
//       <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="m-2 bg-slate-50 rounded-lg p-2 w-[80vw] md:w-auto">
//             <Link href={`/products/${product._id}`}>


//               <Image
//                 src={product.imagePath || '/default-image.png'}
//                 //src={product.imagePath ? product.imagePath : '/default-image.png'}

//                 width={200}
//                 height={200}
//                 alt={product.productName || 'product Image'}
//                 className="rounded-xl w-[80vw]"
//               />
//             </Link>
//             <div className="mt-8">
//               <button
//                 onClick={(e) => handleAddToCart(e, product)}
//                 className="w-full bg-gradient-to-r text-white from-blue-600 to-purple-500 py-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
//               >
//                 Add to Cart
//               </button>
//             </div>
//             <div className="text-xl pt-3">{product.productName}</div>
//             <div className="font-bold text-lg text-end">{product.price}$</div>
//             <div className="text-lg font-semibold text-red-400">
//               <span>Stock:</span> {product.stockLevel}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Section */}
//       <div className="flex lg:gap-x-8 gap-x-6 my-8">
//         <span className="lg:px-6 px-4 lg:py-4 py-2 rounded-lg text-xl bg-light_skin cursor-pointer">1</span>
//         <span className="lg:px-6 px-4 lg:py-4 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">2</span>
//         <span className="lg:px-6 px-4 lg:py-4 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">3</span>
//         <span className="lg:px-7 px-[20px] lg:py-4 py-2 rounded-lg text-xl bg-paleSkin cursor-pointer">Next</span>
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
//import ProductListing from '@/components/ProductListing';
import SearchAndFilter from '@/components/SearchAndFilter';
//import CartPage from '../cart/page';

// Fetch products from Sanity
const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]{
    category,
    _id,
    price,
    description,
    stockLevel,
    "imagePath": image.asset->url,
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
    <div className="mx-auto px-4">
      {/* Top Name Section */}
      <div className="bg-[url('/Rectangle-1.png')] bg-cover bg-center h-[400px] my-8 flex justify-center items-center">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-slate-50 rounded-lg p-4 w-[280px] h-[380px] flex flex-col items-center">
            <Link href={`/products/${product._id}`}>

            
            <Image
  src={ 
    typeof product.imagePath === 'string' 
      ? product.imagePath 
      : (product.imagePath?.asset?.url || '/default-image.png') 
  }
  width={250}
  height={250}
  alt={product.productName || 'Product Image'}
  className="rounded-xl object-cover w-[250px] h-[250px]"
/>










               {/* <Image
                src={product.imagePath || '/default-image.png'}
                width={250}
                height={250}
                alt={product.productName || 'Product Image'}
                className="rounded-xl object-cover w-[250px] h-[250px]"
              />  */}
            </Link>
            <div className="text-lg font-semibold mt-2">{product.productName}</div>
            <div className="font-bold text-lg text-end">${product.price}</div>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="mt-2 w-full bg-gradient-to-r text-white from-blue-600 to-purple-500 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
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




