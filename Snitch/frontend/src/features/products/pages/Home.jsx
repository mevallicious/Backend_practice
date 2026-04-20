import React, { useEffect, useState } from 'react';
import { useProducts } from '../hook/useProducts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

/* ─── Inline SVG Icons ──────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const UserIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const CartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

/* ─── Navbar ────────────────────────────────────────────────── */
const Navbar = () => {
  const navLinks = ['New Arrivals', 'Tees', 'Pants', 'Hoodies', 'Polos', 'Tank Tops', 'Accessories'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Left: Search */}
        <button className="text-gray-700 hover:text-black transition-colors p-1">
          <SearchIcon />
        </button>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-xl font-black uppercase tracking-[0.12em] border-2 border-black px-3 py-1 select-none">
            SNITCH
          </span>
        </Link>

        {/* Right: Account + Cart */}
        <div className="flex items-center gap-4 text-gray-700">
          <Link to="/login" className="hover:text-black transition-colors p-1">
            <UserIcon />
          </Link>
          <button className="hover:text-black transition-colors p-1 relative">
            <CartIcon />
          </button>
        </div>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex max-w-[1400px] mx-auto px-8 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 py-2.5 text-[13px] font-medium text-gray-700 whitespace-nowrap">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to="#"
              className={`hover:text-black transition-colors pb-2 border-b-2 ${
                i === 0 ? 'border-black text-black font-semibold' : 'border-transparent'
              }`}
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

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

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-20">
        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[15px] font-bold uppercase tracking-widest text-black">
            All Products
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            {products?.length || 0} items
          </span>
        </div>

        {/* Grid */}
        {(!products || products.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-400 gap-3">
            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            <p className="text-sm tracking-wide">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-5 md:gap-y-12">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;