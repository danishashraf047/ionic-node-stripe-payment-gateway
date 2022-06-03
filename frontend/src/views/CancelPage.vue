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
              <ion-label class="cancel-label"
                >You have been cancelled the checkout process.</ion-label
              >
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                expand="block"
                class="cancel-go-to-checkout-page-button"
                fill="clear"
                @click="onGoToCheckoutPageClicked"
                >Go to the checkout page</ion-button
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
  useIonRouter,
  UseIonRouterResult,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CancelPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const ionRouter = useIonRouter();
    return { ionRouter };
  },
  methods: {
    onGoToCheckoutPageClicked() {
      (this.ionRouter as UseIonRouterResult).navigate({
        path: "/checkout",
      });
    },
  },
});
</script>

<style scoped>
.cancel-label {
  margin-top: 150px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.cancel-go-to-checkout-page-button,
ion-button {
  margin-top: 20px;
  --background: #ff730c;
  color: white;
}
</style>
