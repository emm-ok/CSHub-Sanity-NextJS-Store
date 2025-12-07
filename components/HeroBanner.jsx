import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner: { smallText, midText, largeText1, buttonText, desc, image, product} }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Image src={urlFor(image).url()} alt="headphones" className='hero-banner-image' width={800} height={800} />
        <div>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroBanner