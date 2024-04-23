"use client";
import { useState } from "react";
import config from "@/config";
import makePayment from "@/utils/generic/client/payment";

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({ priceId, mode = "subscription", successUrl}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      makePayment({priceId, mode, successUrl});
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn btn-primary btn-block group"
      onClick={() => handlePayment()}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      Get {config?.appName}
    </button>
  );
};

export default ButtonCheckout;