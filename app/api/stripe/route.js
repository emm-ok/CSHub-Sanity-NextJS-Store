// 'use server'

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    const line_items = items.map(item => {
      const img = item.images[0].asset._ref;
      const newImage = img.replace('image-', 'https://cdn.sanity.io/images/h68r87qb/production/').replace('-webp', '.webp');

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1
        },
        quantity: item.quantity
      };
    })

    const origin = req.headers.get('origin');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1SbKBDD713ieJEG72oqQza5d' },
        { shipping_rate: 'shr_1SbKCbD713ieJEG72D0QTVfV' },
      ],
      mode: 'payment',
      line_items,
      // success_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cart`,
    });
    
    // RETURN THE SESSION URL, NOT JUST THE ID
    return new Response(JSON.stringify({ url: session.url, selectedItems: items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}