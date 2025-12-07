import { client } from "../lib/client";
import React from "react";
import { HeroBanner, Product, FooterBanner } from "../components";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  description: string;
  stock: number;
  images: string[];
}

const Home = async () => {
  const query = '*[_type == "product"]';
  const products: ProductType[] = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export default Home;
