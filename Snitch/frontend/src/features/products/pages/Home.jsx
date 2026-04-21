import React, { useEffect, useState, useMemo } from 'react';
import { useProducts } from '../hook/useProducts';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─── Product Card ──────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const img1 = product.images?.[0]?.url;
  const img2 = product.images?.[1]?.url;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
        {img1 ? (
          <>
            <img
              src={img1}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered && img2 ? 'opacity-0' : 'opacity-100'}`}
            />
            {img2 && (
              <img
                src={img2}
                alt={product.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest font-bold">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-[13px] md:text-[14px] font-semibold text-gray-900 group-hover:underline underline-offset-2 leading-snug mb-1 capitalize">
        {product.title}
      </h3>
      <p className="text-[13px] md:text-[14px] text-gray-800">
        Rs.{' '}
        {Number(product.price?.amount).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

/* ─── Home Page ─────────────────────────────────────────────── */
const Home = () => {
  const { handleGetAllProducts } = useProducts();
  const products = useSelector(state => state.product.products);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const displayProducts = useMemo(() => {
    if (!products) return [];
    if (!activeCategory) return products;
    return products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [products, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-20">
        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[15px] font-bold uppercase tracking-widest text-black">
            {activeCategory ? activeCategory : 'All Products'}
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            {displayProducts?.length || 0} items
          </span>
        </div>

        {/* Grid */}
        {(!displayProducts || displayProducts.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-400 gap-3">
            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            <p className="text-sm tracking-wide">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-5 md:gap-y-12">
            {displayProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;