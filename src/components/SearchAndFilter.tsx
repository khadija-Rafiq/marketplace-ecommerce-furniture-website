"use client";

import React, { useState } from "react";
import { Product } from "@/types/products";

interface SearchAndFilterProps {
  products: Product[];
  onFilteredProducts: (filtered: Product[]) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  products,
  onFilteredProducts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Example range: $0 - $1000

  // Get unique categories
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  // Filter products based on criteria
  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    onFilteredProducts(filtered);
  };

  // Update filters and trigger filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleFilter();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    handleFilter();
  };

  const handlePriceChange = (index: number, value: number) => {
    const updatedRange = [...priceRange];
    updatedRange[index] = value;
    setPriceRange(updatedRange);
    handleFilter();
  };

  return (
    <div className="bg-palePink py-4 lg:px-20 px-4 flex flex-col gap-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full lg:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Price Range Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Price:</span>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded-lg shadow-sm focus:outline-none"
            placeholder="Min"
          />
          <span className="text-gray-600">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded-lg shadow-sm focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
