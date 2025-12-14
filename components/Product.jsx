import React from 'react';
import Image from 'next/image';
import { urlFor } from '../lib/client';
import Link from 'next/link';

const randomIndex = (arr) =>  Math.floor(Math.random() * arr.length);
const Product = ({ product: { name, price, slug, description, stock, images } }) => {

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <Image 
            src={urlFor(images && images[randomIndex(images)].asset._ref).url()} 
            alt='product image' width={200} height={200}
            className='product-image' />
            <p className='product-name'>{name}</p>
            <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product