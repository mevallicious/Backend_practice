import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../../products/components/Navbar';
import Footer from '../../products/components/Footer';
import { useCart } from '../hook/useCart';

const Cart = () => {
  const { handleGetCart } = useCart();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    handleGetCart();
  }, []);

  const total = cartItems?.reduce((acc, item) => acc + (item.price?.amount * item.quantity), 0) || 0;

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 md:px-12 py-12">
        <div className="flex items-end justify-between mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">Your cart</h1>
          <Link to="/" className="text-sm font-medium text-gray-600 underline hover:text-black">Continue shopping</Link>
        </div>

        {cartItems?.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-8 py-8 border-b border-gray-200">
              {cartItems.map((item, index) => {
                const product = item.product;
                const variantId = item.variant;
                // find variant details if needed (like size/color), but usually backend populates or we find from product.variants
                const variant = product?.variants?.find(v => v._id === variantId);
                const size = variant ? variant.size : 'S';
                const color = variant ? variant.color : 'Black'; // Fallback mapping

                return (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center">
                    
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-6 items-start">
                      <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                        {product?.images?.[0] ? (
                          <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 tracking-[0.1em] uppercase">URBANNEEDSINDIA</span>
                        <Link to={`/product/${product?._id}`} className="text-base font-black text-gray-900 hover:text-gray-600 uppercase">
                          {product?.title}
                        </Link>
                        <span className="text-sm text-gray-600 mt-1">Rs. {Number(item.price?.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        <span className="text-sm text-gray-500 mt-2">Size: {size.toUpperCase()}</span>
                        <span className="text-sm text-gray-500">Color: {color}</span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="col-span-3 flex items-center justify-center gap-4">
                      <div className="flex items-center border border-gray-300 w-fit h-10">
                        <button className="w-10 h-full flex justify-center items-center text-gray-500 hover:bg-gray-50 transition-colors">−</button>
                        <span className="w-10 h-full flex justify-center items-center text-sm font-medium border-x border-gray-300">{item.quantity}</span>
                        <button className="w-10 h-full flex justify-center items-center text-gray-500 hover:bg-gray-50 transition-colors">+</button>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors" title="Remove item">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M3 6h18M19 6l-1 14H6L5 6m4 0V4a2 2 0 012-2h2a2 2 0 012 2v2m-5 5v6m4-6v6"/>
                        </svg>
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="col-span-3 text-right">
                      <span className="text-base font-medium text-gray-900">
                        Rs. {(Number(item.price?.amount) * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Footer / Checkout section */}
            <div className="flex flex-col md:flex-row justify-between items-start mt-8 gap-8">
              <div className="w-full md:w-1/2">
                <p className="text-sm text-gray-600 mb-3 block">Order special instructions</p>
                <textarea 
                  className="w-full border border-gray-300 p-3 h-32 text-sm focus:outline-none focus:border-black transition-colors resize-y"
                  placeholder=""
                ></textarea>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-end">
                <div className="flex items-end gap-5 mb-4">
                  <span className="text-xl font-bold text-gray-900">Estimated total</span>
                  <span className="text-2xl font-light text-gray-800">
                    Rs. {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 text-right mb-6 max-w-sm">
                  Tax included. <Link to="#" className="underline text-gray-600">Shipping</Link> and discounts calculated at checkout.
                </p>
                <button className="w-full max-w-[300px] bg-black text-white text-[13px] font-bold uppercase tracking-[0.15em] py-4 hover:bg-gray-900 transition-colors active:scale-[0.99]">
                  Check out
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center flex flex-col items-center border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is currently empty.</h2>
            <Link to="/" className="bg-black text-white text-sm font-bold uppercase tracking-[0.1em] px-8 py-3 hover:bg-gray-900 transition-colors">
              Continue shopping
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
