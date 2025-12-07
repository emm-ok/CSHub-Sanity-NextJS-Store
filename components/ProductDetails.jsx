'use client'

import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import Image from 'next/image'
import { urlFor } from '../lib/client'

import { useStateContext } from '../context/StateContext'

const ProductDetails = ({ product}) => {
    const [index, setIndex] = useState(0);
    const { name, description, price, images } = product;
    const { decQty, incQty, qty, onAdd, onBuyNow } = useStateContext();


    return (
        <div className="product-detail-container">
            <div>
                <div className="product-detail-image">
                    {/* Example render (uncomment after confirming product.image): */}
                    <Image
                        src={urlFor(images && images[index]).url()}
                        width={300}
                        height={300}
                        alt={name}
                        className='product-detail-image'
                    />
                </div>
                <div className='small-images-container'>
                    {images?.map((item, i) => (
                        <Image
                            key={item._key}
                            src={urlFor(item).url()}
                            width={200}
                            height={200}
                            className={`small-image ${i === index && 'selected-image'}`}
                            onMouseEnter={() => setIndex(i)}
                            alt="" />
                    ))}
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details: </h4>
                <p>{description}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}>
                            <AiOutlineMinus />
                        </span>
                        <span className='num'>
                            {qty}
                        </span>
                        <span className='plus'onClick={incQty}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
                    <button type='button' className='buy-now' onClick={() => onBuyNow(product, qty)}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails