'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { fetchClientSecret } from '../../actions/stripe'
import { useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
      <div>
        {!showCheckout ? (
        <button
          onClick={() => setShowCheckout(true)}
          className="btn"
        >
          Pay with Stripe
        </button>
      ) : (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
      </div>
  )
}



// // components/CheckoutButton.jsx
// 'use client'
// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
// import { createCheckoutSession } from '@/app/actions/stripe';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// export default function CheckoutButton() {
//   const [showCheckout, setShowCheckout] = useState(false);

//   const fetchClientSecret = async () => {
//     const { clientSecret } = await createCheckoutSession();
//     return clientSecret;
//   };

//   return (
//     <>
//       {!showCheckout ? (
//         <button
//           onClick={() => setShowCheckout(true)}
//           className="btn"
//         >
//           Pay with Stripe
//         </button>
//       ) : (
//         <EmbeddedCheckoutProvider
//           stripe={stripePromise}
//           options={{ fetchClientSecret }}
//         >
//           <EmbeddedCheckout />
//         </EmbeddedCheckoutProvider>
//       )}
//     </>
//   );
// }