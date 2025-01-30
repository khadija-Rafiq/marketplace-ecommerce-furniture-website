

// 'use client'; // Required for React hooks in Next.js

// import { useState, useEffect } from "react";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";


// interface Product {
//     category: string;
//     id: string;
//     price: number;
//     description: string;
//     stockLevel: number;
//     imagePath: string;
//     discountPercentage: number;
//     isFeaturedProduct: number;
//     name: string;
//     image: any;
//     _id: string;
//     sizes: string[];
// }

// interface PageProps {
//   params: { id: string };
// }

// // Page component (no async here)
// const Page = ({ params }: PageProps): JSX.Element => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [cart, setCart] = useState<Product[]>([]);

//   // Fetch product data inside useEffect
//   useEffect(() => {
//     const fetchProduct = async () => {
//       const query = `*[ _type == "product" && _id == $id]{
//         name,
//         "id": _id,
//         price,
//         description,
//         category,
//         "image": image.asset._ref
//       }[0]`;
      
//       const fetchedProduct: Product | null = await client.fetch(query, { id: params.id });
//       setProduct(fetchedProduct);
//     };
//     fetchProduct();
//   }, [params.id]);

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-2xl font-semibold text-gray-600">Product not found</h1>
//       </div>
//     );
//   }

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to the cart!`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Product Image */}
//           <div className="flex justify-center">
//             <Image
//               src={urlFor(product.image).url()}
//               alt={product.name}
//               width={500}
//               height={500}
//               className="object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
//             />
//           </div>

//           {/* Product Details */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
//               <p className="mt-4 text-gray-600">{product.description}</p>
//               <p className="text-3xl mt-6 font-bold text-gray-900">$ {product.price}</p>
//             </div>

//             {/* Size Options */}
//             <div className="mt-8">
//               <span className="font-semibold text-lg text-gray-800">Select Size:</span>
//               <div className="flex space-x-3 mt-3">
//                 {["L", "XL", "XS"].map((size) => (
//                   <button
//                     key={size}
//                     className="px-5 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Options */}
//             <div className="mt-6">
//               <span className="font-semibold text-lg text-gray-800">Choose Color:</span>
//               <div className="flex space-x-4 mt-3">
//                 {["#000", "#FFD700", "#800080"].map((color) => (
//                   <div
//                     key={color}
//                     className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transform transition-transform"
//                     style={{ backgroundColor: color }}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <div className="mt-8"> 
//               <button
//                 onClick={() => addToCart(product)}
//                 className="w-full bg-gradient-to-r font-semibold text-white from-blue-600 to-purple-500 py-2 -x-4 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
//               >
//                 Add to Cart
//               </button>
//             </div> 
//           </div> 
//         </div>
//       </div>

//       {/* Cart Summary */}
//       {cart.length > 0 && (
//         <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
//           <h2 className="font-bold text-lg">Cart</h2>
//           <ul className="mt-2">
//             {cart.map((item, index) => (
//               <li key={index} className="flex justify-between text-gray-800">
//                 <span>{item.name}</span>
//                 <span>${item.price}</span>
//               </li>
//             ))}
//           </ul>
//           <p className="mt-4 font-bold">Total: ${cart.reduce((total, item) => total + item.price, 0)}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;



'use client'; // Required for React hooks in Next.js

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Image {
  asset: {
    _ref: string;
  };
}

interface Product {
  category: string;
  id: string;
  price: number;
  description: string;
  stockLevel: number;
  imagePath: string;
  discountPercentage: number;
  isFeaturedProduct: number;
  name: string;
  image: Image; // Updated from `any` to `Image`
  _id: string;
  sizes: string[];
}

interface PageProps {
  params: { id: string };
}

// Page component (no async here)
const Page = ({ params }: PageProps): JSX.Element => {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  // Fetch product data inside useEffect
  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[ _type == "product" && _id == $id]{
        name,
        "id": _id,
        price,
        description,
        category,
        "image": image.asset._ref
      }[0]`;
      
      const fetchedProduct: Product | null = await client.fetch(query, { id: params.id });
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-600">Product not found</h1>
      </div>
    );
  }

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <p className="text-3xl mt-6 font-bold text-gray-900">$ {product.price}</p>
            </div>

            {/* Size Options */}
            <div className="mt-8">
              <span className="font-semibold text-lg text-gray-800">Select Size:</span>
              <div className="flex space-x-3 mt-3">
                {["L", "XL", "XS"].map((size) => (
                  <button
                    key={size}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div className="mt-6">
              <span className="font-semibold text-lg text-gray-800">Choose Color:</span>
              <div className="flex space-x-4 mt-3">
                {["#000", "#FFD700", "#800080"].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transform transition-transform"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8"> 
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r font-semibold text-white from-blue-600 to-purple-500 py-2 -x-4 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div> 
          </div> 
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-bold text-lg">Cart</h2>
          <ul className="mt-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between text-gray-800">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${cart.reduce((total, item) => total + item.price, 0)}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
