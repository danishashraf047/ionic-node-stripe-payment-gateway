<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Stripe Payment Gateway</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">Stripe Payment Gateway</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card>
                <img
                  src="https://www.digitaltrends.com/wp-content/uploads/2021/09/iphone-13-pro-review-dan-baker-35.jpg?resize=625%2C417&p=1"
                />
                <ion-card-header>
                  <ion-card-subtitle>Price: $999</ion-card-subtitle>
                  <ion-card-title>iPhone 13 Pro</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  The iPhone 13 Pro is Apple's smaller premium iPhone with a
                  6.1" screen size and for the first time in an iPhone, it comes
                  with a 120Hz ProMotion display for super smooth scrolling. The
                  list of innovations includes a more capable triple camera
                  setup, with a wide, ultra-wide and zoom cameras, as well as a
                  LiDAR scanner.
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                class="checkout-button"
                expand="block"
                fill="clear"
                @click="onCheckoutClicked"
                >Checkout</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { PUBLISHABLE_KEY } from "../constants";
declare var Stripe: any;

export default defineComponent({
  name: "CheckoutPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    onCheckoutClicked() {
      var stripe = Stripe(PUBLISHABLE_KEY);
      fetch("http://localhost:8080/payment", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          product: {
            name: "iPhone 13 Pro",
            image:
              "https://www.digitaltrends.com/wp-content/uploads/2021/09/iphone-13-pro-review-dan-baker-35.jpg?resize=625%2C417&p=1",
            amount: 999,
            quantity: 1,
          },
          routes: {
            success_url: "http://localhost:8100/success",
            cancel_url: "http://localhost:8100/cancel",
          },
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    },
  },
});
</script>

<style scoped>
.checkout-button,
ion-button {
  margin: 0 10px;
  --background: #ff730c;
  color: white;
}
</style>
