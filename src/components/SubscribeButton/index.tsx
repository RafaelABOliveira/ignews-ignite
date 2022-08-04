import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";


export function SubscribeButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if(session?.activeSubscription){
      router.push('/posts')
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
