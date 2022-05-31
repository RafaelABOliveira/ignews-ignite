import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session, status } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    // criação da checkout session
    try {
      const response = await api.post('/subscribe');
        
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId: sessionId });

    } catch (err) {
        console.log(err);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => handleSubscribe()}
    >
      Subscribe Now
    </button>
  );
}
