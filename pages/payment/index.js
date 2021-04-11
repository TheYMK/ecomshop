import React from 'react';
import Layout from '../../components/Layout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_KEY } from '../../config';
import StripeCheckout from '../../components/stripe/StripeCheckout';
import '../../styles/Stripe.module.css';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_KEY);

function PaymentPage() {
	return (
		<React.Fragment>
			<Layout>
				<div className="container p-5 text-center">
					<h4>Complete your purchase</h4>
					<Elements stripe={stripePromise}>
						<div className="col-md-8 offset-md-2">
							<StripeCheckout />
						</div>
					</Elements>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export default PaymentPage;
