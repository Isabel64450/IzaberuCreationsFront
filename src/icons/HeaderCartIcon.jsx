import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import axiosInstance from '../api/axiosInstance';
import { CartContext } from '../contex/CartContex';

function HeaderCartIcon() {
  const { itemCount } = useContext(CartContext);

  

  return (
    <Link to="/cart" className="relative text-white hover:text-[#84a98c] transition">
      <FaShoppingCart size={22} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{itemCount}</span>
      )}
    </Link>
  );
}

export default HeaderCartIcon; 

