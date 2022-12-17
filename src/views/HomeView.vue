<template>
    <!-- Container -->
    <section
      id="bg_dashboard"
      class="min-h-screen max-h-screen w-full bg-neutral-200 overflow-hidden">
        
        <!-- Container Max-Width -->
        <div class="min-h-screen max-h-screen w-full max-w-lg flex flex-col m-auto overflow-hidden">
        
            <router-view/>

            <!-- tabs bar -->
            <TabsBar />

        </div>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabsBar             from '@/components/HomeTabsBar.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    TabsBar
  }
});
</script>