<template>
  <ion-app>
    <LoadingComponent />
    <router-view/>
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoadingComponent    from "@/components/loading.vue";
import { IonApp } from '@ionic/vue';

export default defineComponent({
  name: 'App',
  components: {
    LoadingComponent,
    IonApp,
  }
});
</script>