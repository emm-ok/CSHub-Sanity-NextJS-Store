import React from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Image from 'next/image'
import { client, urlFor } from '../../../lib/client'

import { Product, ProductDetails } from '../../../components'

// 🟩 Generate all static slugs at build time
export async function generateStaticParams() {
  const query = `*[_type == "product"]{ "slug": slug.current }`;
  const products = await client.fetch(query);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

const Page = async ({ params }) => {

  const { slug } = await params;

  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query, { slug });
  const products = await client.fetch(productsQuery);


  return (
    <div>
      <ProductDetails product={product} products={products} />

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((product) => (
              <Product key={product._id} product={product}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
