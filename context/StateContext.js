"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1);


  

  useEffect(() => {
    if(typeof window === 'undefined') return;

    const storedItems = localStorage.getItem('item');
    const storedPrice = localStorage.getItem('totalPrice');
    const storedQty = localStorage.getItem('totalQty');

    if(storedItems) {
      try{
        const parsed = JSON.parse(storedItems);
        if(Array.isArray(parsed)) setCartItems(parsed);
      } catch{
        console.error(' Invalid JON in localStorage for "item" ');
      }
    }

    if(storedPrice) setTotalPrice(parseFloat(storedPrice) || 0);
    if(storedQty) setTotalQuantities(parseInt(storedQty) || 0);
  }, []);


  useEffect(() => {
    if(typeof window === 'undefined') return;

    localStorage.setItem('item', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toString());
    localStorage.setItem('totalQty', totalQuantities.toString());

  }, [cartItems, totalPrice, totalQuantities]);




  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => prevQty > 1 ? prevQty - 1 : 1);
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {

      const updatedCartItems = cartItems?.map((cartProduct) => 
        cartProduct._id === product._id 
        ? {...cartProduct, quantity: cartProduct.quantity + quantity} 
        : cartProduct
      );
       
      setCartItems(updatedCartItems);
    } else{
        setCartItems([...cartItems, { ...product, quantity }]);
    }

    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onBuyNow = (product, quantity) => {
    setShowCart(true);
    onAdd(product, quantity);
  }
   const toggleCartItemQty = (id, value) => {
    const product = cartItems.find((item) => item._id === id);

    if (!product) return;

    if (value === "inc") {
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setTotalPrice((prev) => prev + product.price);
      setTotalQuantities((prev) => prev + 1);
    }

    if (value === "dec" && product.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      setTotalPrice((prev) => prev - product.price);
      setTotalQuantities((prev) => prev - 1);
    }
  };

  const onRemove = (id) => {
    const product = cartItems.find((item) => item._id === id);
    
    if(!product) return;

    setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== id));

    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price * product.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity);
  }

  const onClearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onBuyNow,
        toggleCartItemQty,
        onRemove,
        onClearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
